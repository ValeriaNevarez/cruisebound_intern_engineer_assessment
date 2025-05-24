'use client';

interface ResetSortingProps {
  onReset: () => void;
}

const ResetSorting = ({ onReset }: ResetSortingProps) => {
  return (
    <button
      onClick={onReset}
      type="button"
      aria-label="Reset sorting"
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 text-sm font-medium transition-colors"
    >
      Reset sorting
    </button>
  );
};

export default ResetSorting; 