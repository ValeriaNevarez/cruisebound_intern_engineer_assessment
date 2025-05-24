"use client";

interface ResetSortingProps {
  /** Callback function to handle the reset action */
  onReset: () => void;
}

/**
 * A button component that allows users to reset the current sorting state
 */
const ResetSorting = ({ onReset }: ResetSortingProps) => {
  return (
    <button
      onClick={onReset}
      type="button"
      aria-label="Reset sorting"
      className="px-3 py-1 bg-white hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors border border-gray-300 shadow-md hover:shadow-md cursor-pointer"
    >
      Reset sorting
    </button>
  );
};

export default ResetSorting;
