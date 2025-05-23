interface TotalResultCountProps {
  count: number;
}

export default function TotalResultCount({ count }: TotalResultCountProps) {
  return (
    <div className="text-lg font-medium text-gray-900">
      {count} trips found
    </div>
  );
}
