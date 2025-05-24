"use client";

import { useState } from "react";
import SortingOptions from "@/components/SortingOptions";
import TotalResultCount from "@/components/TotalResultCount";
import type Sailing from "@/components/SailingsInterface";
import SailingList from "@/components/SailingList";
import ResetSorting from "@/components/ResetSorting";

interface HomePageProps {
  initialSailings: Sailing[];
}

export default function HomePage({ initialSailings }: HomePageProps) {
  const [sailings, setSailings] = useState<Sailing[]>(initialSailings);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    const sortedByDate = [...initialSailings].sort((a, b) => 
      new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
    );
    setSailings(sortedByDate);
    setResetKey(prev => prev + 1);
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
          comparison =
            new Date(a.departureDate).getTime() -
            new Date(b.departureDate).getTime();
          break;
        case "duration":
          comparison = a.duration - b.duration;
          break;
      }

      return direction === "asc" ? comparison : -comparison;
    });

    setSailings(sortedSailings);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <SortingOptions onSortChange={handleSort} key={resetKey} />
      <div className="flex items-center gap-4">
        <TotalResultCount count={sailings.length} />
        <ResetSorting onReset={handleReset} />
      </div>
      <SailingList sailings={sailings} />
    </div>
  );
}
