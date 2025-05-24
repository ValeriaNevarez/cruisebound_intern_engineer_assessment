interface TotalResultCountProps {
  /** The total number of results to display */
  count: number;
}

/**
 * A component that displays the total number of results found.
 */
export default function TotalResultCount({ count }: TotalResultCountProps) {
  return (
    <div className="text-lg font-medium text-gray-900">{count} trips found</div>
  );
}
