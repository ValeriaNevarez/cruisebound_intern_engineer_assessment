'use client';

import { useState } from 'react';
import SortingOptions from "@/components/SortingOptions";
import TotalResultCount from "@/components/TotalResultCount";
import { type Cruise } from '@/app/page';
import SailingList from "@/components/SailingList";

interface HomePageProps {
  initialSailings: Cruise[];
}

export default function HomePage({ initialSailings }: HomePageProps) {
  const [sailings, setSailings] = useState<Cruise[]>(initialSailings);

  const handleSort = (option: 'price' | 'departureDate' | 'duration', direction: 'asc' | 'desc') => {
    const sortedSailings = [...sailings].sort((a, b) => {
      let comparison = 0;
      
      switch (option) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'departureDate':
          comparison = new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    setSailings(sortedSailings);
  };

  // Transform Cruise type to Sailing type
  const transformedSailings = sailings.map(sailing => ({
    name: sailing.name,
    region: sailing.region,
    duration: sailing.duration,
    rating: sailing.ship.rating,
    reviews: sailing.ship.reviews,
    itinerary: sailing.itinerary,
    price: sailing.price,
    image: sailing.ship.image,
    departure_date: sailing.departureDate,
    return_date: sailing.returnDate,
    logo: sailing.ship.line.logo,
    ship_name: sailing.ship.line.name
  }));

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <SortingOptions onSortChange={handleSort} />
      <TotalResultCount count={sailings.length} />
      <SailingList sailings={transformedSailings} />
    </div>
  );
}
