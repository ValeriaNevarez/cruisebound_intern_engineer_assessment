import { useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import type { Sailing } from "@/components/SailingsInterface";

interface SailingListProps {
  sailings: Sailing[];
}

export default function SailingList({ sailings }: SailingListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the current page's sailings
  const indexOfLastSailing = currentPage * itemsPerPage;
  const indexOfFirstSailing = indexOfLastSailing - itemsPerPage;
  const currentSailings = sailings.slice(indexOfFirstSailing, indexOfLastSailing);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Optionally scroll to top of list when page changes
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-4">
      {/* Display current page sailings */}
      <div className="space-y-4">
        {currentSailings.map((sailing, index) => (
          <Card
            key={`${sailing.name}-${sailing.departureDate}-${index}`}
            sailing={sailing}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={sailings.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 