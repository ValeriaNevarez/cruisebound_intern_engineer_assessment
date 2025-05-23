interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at a time

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('start-ellipsis'); // Represents starting ellipsis
      }
    }

    // Add the main sequence of pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add the last page with ellipsis if needed
    const lastVisiblePage = pages[pages.length - 1];
    if (typeof lastVisiblePage === 'number') {
      if (totalPages - lastVisiblePage > 1) {
        pages.push('end-ellipsis'); // Represents ending ellipsis
        pages.push(totalPages);
      } else if (totalPages - lastVisiblePage === 1) {
        // If there's just one page gap, show it directly without ellipsis
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center space-x-1 mt-4 bg-gray-100 px-2 py-1 sm:px-2 sm:py-1 px-1 py-0.5 rounded-lg inline-flex">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
          disabled={typeof pageNum === 'string'}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-full text-sm sm:text-base font-bold ${
            typeof pageNum === 'string'
              ? "cursor-default"
              : currentPage === pageNum
              ? "bg-white text-blue-600 hover:cursor-pointer"
              : "text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
          }`}
        >
          {typeof pageNum === 'string' ? "..." : pageNum}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
} 