import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  /** The currently active page number (1-based indexing) */
  currentPage: number;
  /** Total number of items to paginate */
  totalItems: number;
  /** Number of items to display per page (defaults to 10) */
  itemsPerPage?: number;
  /** Callback function triggered when page changes, receives the new page number */
  onPageChange: (page: number) => void;
}

/**
 * A responsive pagination component that displays page numbers and navigation controls.
 * Features:
 * - Shows up to 5 page numbers at a time
 * - Displays first and last page numbers with ellipsis when needed
 * - Includes previous/next navigation buttons
 * - Fully responsive with different styles for mobile and desktop
 * - Disables navigation when at first/last page
 */
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display.
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at a time.

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end.
    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed.
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("start-ellipsis"); // Represents starting ellipsis.
      }
    }

    // Add the main sequence of pages.
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add the last page with ellipsis if needed.
    const lastVisiblePage = pages[pages.length - 1];
    if (typeof lastVisiblePage === "number") {
      if (totalPages - lastVisiblePage > 1) {
        pages.push("end-ellipsis"); // Represents ending ellipsis.
        pages.push(totalPages);
      } else if (totalPages - lastVisiblePage === 1) {
        // If there's just one page gap, show it directly without ellipsis.
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
        <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
          disabled={typeof pageNum === "string"}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm sm:text-base font-bold ${
            typeof pageNum === "string"
              ? "cursor-default"
              : currentPage === pageNum
              ? "bg-white text-blue-600 hover:cursor-pointer"
              : "text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
          }`}
        >
          {typeof pageNum === "string" ? "..." : pageNum}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      </button>
    </nav>
  );
}
