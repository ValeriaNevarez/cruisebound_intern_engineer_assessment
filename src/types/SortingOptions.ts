export type SortOption = "price" | "departureDate" | "duration";
export type SortDirection = "asc" | "desc";

export const SORT_OPTIONS = [
  { id: "price", label: "Price" },
  { id: "departureDate", label: "Departure" },
  { id: "duration", label: "Duration" },
] as const;

export const SORT_DIRECTIONS = [
  { value: "asc", label: "Lowest first" },
  { value: "desc", label: "Highest first" },
] as const; 