"use client";

import { useState, useEffect, useRef } from "react";
import { SortOption, SortDirection, SORT_OPTIONS, SORT_DIRECTIONS } from "../types/SortingOptions";

interface SortingOptionsProps {
  /** The callback function to handle the sort change action */
  onSortChangeAction: (option: SortOption, direction: SortDirection) => void;
}

/**
 * A component that allows users to sort a list of items by price, departure date, or duration.
 */
export default function SortingOptions({ onSortChangeAction }: SortingOptionsProps) {
  const [activeOption, setActiveOption] = useState<SortOption>("departureDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDirectionLabel = () => {
    return SORT_DIRECTIONS.find(dir => dir.value === sortDirection)?.label || "";
  };

  const getExpandedOptions = () => {
    return SORT_OPTIONS.flatMap((option) =>
      SORT_DIRECTIONS.map((direction) => ({
        id: option.id,
        label: `${option.label} (${direction.label})`,
        direction: direction.value as SortDirection,
      }))
    );
  };

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-black-600 text-lg font-medium">Sort by</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-white px-3 py-1.5 rounded border border-gray-300 text-sm shadow-md cursor-pointer"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium text-base">
              {SORT_OPTIONS.find((opt) => opt.id === activeOption)?.label}
            </span>
            <span className="text-sm text-gray-500">{getDirectionLabel()}</span>
          </div>
          <span className="ml-2 text-gray-300">▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
          {getExpandedOptions().map((option) => (
            <button
              key={`${option.id}-${option.direction}`}
              onClick={() => {
                setActiveOption(option.id as SortOption);
                setSortDirection(option.direction);
                onSortChangeAction(option.id as SortOption, option.direction);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-base hover:bg-gray-100 cursor-pointer
                ${
                  activeOption === option.id && sortDirection === option.direction
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
