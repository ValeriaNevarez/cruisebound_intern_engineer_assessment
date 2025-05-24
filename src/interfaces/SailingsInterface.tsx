/**
 * Represents a cruise line company
 */
interface CruiseLine {
  /** URL to the cruise line's logo image */
  readonly logo?: string;
  /** Name of the cruise line */
  readonly name: string;
}

/**
 * Represents a cruise ship
 */
interface Ship {
  /** Name of the ship */
  readonly name: string;
  /** Customer rating out of 5 */
  readonly rating: number;
  /** Number of customer reviews */
  readonly reviews: number;
  /** URL to the ship's image */
  readonly image?: string;
  /** Cruise line information */
  readonly line: CruiseLine;
}

/**
 * Represents a complete sailing/cruise itinerary
 */
export default interface Sailing {
  /** Price of the sailing in USD */
  readonly price: number;
  /** Name of the sailing/cruise package */
  readonly name: string;
  /** Ship information */
  readonly ship: Ship;
  /** Array of ports/locations in the itinerary */
  readonly itinerary: readonly string[];
  /** Geographic region of the cruise */
  readonly region: string;
  /** Departure date in ISO 8601 format (YYYY-MM-DD) */
  readonly departureDate: string;
  /** Return date in ISO 8601 format (YYYY-MM-DD) */
  readonly returnDate: string;
  /** Duration of the cruise in nights */
  readonly duration: number;
} 