"use client";

import { useState } from "react";
import SortingOptions from "@/components/SortingOptions";
import TotalResultCount from "@/components/TotalResultCount";
import type Sailing from "@/interfaces/SailingsInterface";
import SailingList from "@/components/SailingList";
import ResetSorting from "@/components/ResetSorting";

interface HomePageProps {
  /** Initial array of sailings to display */
  initialSailings: Sailing[];
}

/**
 * Homepage component that displays and manages a sortable list of sailings.
 * Provides functionality to sort sailings by price, departure date, and duration,
 * with the ability to reset to the default date-sorted view.
 */
export default function HomePage({ initialSailings }: HomePageProps) {
  const compareDates = (a: Sailing, b: Sailing) => {
    return (
      new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
    );
  };

  const sortByDate = (sailings: Sailing[]) => {
    return [...sailings].sort(compareDates);
  };

  /* Default sort is by departure date (nearest first) to show the most immediately available
   * cruises to potential clients, improving conversion by highlighting trips they can book soon */
  const [sailings, setSailings] = useState<Sailing[]>(() => {
    return sortByDate(initialSailings);
  });
  const [sortingOptionsResetKey, setSortingOptionsResetKey] = useState(0);
  const [sailingsResetKey, setSailingsResetKey] = useState(0);

  const handleReset = () => {
    setSailings(sortByDate(initialSailings));
    setSortingOptionsResetKey((prev) => prev + 1);
    setSailingsResetKey((prev) => prev + 1);
  };

  const handleSort = (
    option: "price" | "departureDate" | "duration",
    direction: "asc" | "desc"
  ) => {
    const sortedSailings = [...sailings].sort((a, b) => {
      let comparison = 0;

      switch (option) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "departureDate":
          comparison = compareDates(a, b);
          break;
        case "duration":
          comparison = a.duration - b.duration;
          break;
      }

      return direction === "asc" ? comparison : -comparison;
    });

    setSailings(sortedSailings);
    setSailingsResetKey((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 lg:px-30 py-8 flex flex-col gap-6">
      <SortingOptions
        onSortChangeAction={handleSort}
        key={sortingOptionsResetKey + "sorting"}
      />
      <div className="flex items-center gap-4">
        <TotalResultCount count={sailings.length} />
        <ResetSorting onReset={handleReset} />
      </div>
      <SailingList sailings={sailings} key={sailingsResetKey + "sailings"} />
    </div>
  );
}
