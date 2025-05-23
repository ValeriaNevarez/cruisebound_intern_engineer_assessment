'use client';

import { useState } from 'react';

type SortOption = 'price' | 'departureDate' | 'duration';
type SortDirection = 'asc' | 'desc';

interface SortingOptionsProps {
  onSortChange: (option: SortOption, direction: SortDirection) => void;
}

export default function SortingOptions({ onSortChange }: SortingOptionsProps) {
  const [activeOption, setActiveOption] = useState<SortOption>('price');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (option: SortOption) => {
    if (option === activeOption) {
      // If selecting the same option, toggle direction
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      onSortChange(option, newDirection);
    } else {
      // If selecting a new option, set it as active with ascending direction
      setActiveOption(option);
      setSortDirection('asc');
      onSortChange(option, 'asc');
    }
    setIsOpen(false);
  };

  const getDirectionLabel = () => {
    return sortDirection === 'asc' ? 'Lowest first' : 'Highest first';
  };

  const options = [
    { id: 'price', label: 'Price' },
    { id: 'departureDate', label: 'Departure Date' },
    { id: 'duration', label: 'Duration' },
  ];

  return (
    <div className="relative ml-auto">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Sort by</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-white px-3 py-1.5 rounded border border-gray-300 text-sm"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium">{options.find(opt => opt.id === activeOption)?.label}</span>
            <span className="text-xs text-gray-500">{getDirectionLabel()}</span>
          </div>
          <span className="ml-2">▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSortChange(option.id as SortOption)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                ${activeOption === option.id ? 'text-blue-600' : 'text-gray-700'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 