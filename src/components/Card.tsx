interface CardProps {
  name?: string;
  region?: string;
}

export default function Card({ name, region }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 `}>
      {name && <h3 className="text-xl font-semibold mb-4">{name}</h3>}
      {region && <p className="text-gray-600">{region}</p>}
    </div>
  );
} 