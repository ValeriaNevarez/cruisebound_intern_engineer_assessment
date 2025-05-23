'use client';

import { useState, useEffect } from 'react';
import Card from "@/components/Card";
import SortingOptions from "@/components/SortingOptions";
import TotalResultCount from "@/components/TotalResultCount";
import { type Cruise } from '@/app/page';

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

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <SortingOptions onSortChange={handleSort} />
      <TotalResultCount count={sailings.length} />
      {sailings.map((sailing, index) => (
        <Card
          key={index}
          name={sailing.name}
          region={sailing.region}
          duration={sailing.duration}
          rating={sailing.ship.rating}
          reviews={sailing.ship.reviews}
          itinerary={sailing.itinerary}
          price={sailing.price}
          image={sailing.ship.image}
          departure_date={sailing.departureDate}
          return_date={sailing.returnDate}
          logo={sailing.ship.line.logo}
          ship_name={sailing.ship.line.name}
        />
      ))}
    </div>
  );
}
