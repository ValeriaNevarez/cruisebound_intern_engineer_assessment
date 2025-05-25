/**
 * Test suite for SailingsInterfaceUtils functions
 * Includes tests for:
 * - getUniqueSailings: Removes duplicate sailings from an array
 */

import { getUniqueSailings } from "./SailingsInterfaceUtils";
import type Sailing from "@/interfaces/SailingsInterface";

const EXAMPLE_SAILING_1: Sailing = {
  name: "Caribbean Adventure",
  price: 999,
  ship: {
    name: "Cruise Ship 1",
    rating: 4.5,
    reviews: 100,
    line: {
      name: "Royal Caribbean",
    },
  },
  itinerary: ["Miami", "Nassau", "CocoCay"],
  region: "Caribbean",
  departureDate: "2024-05-01",
  returnDate: "2024-05-08",
  duration: 7,
};

const EXAMPLE_SAILING_2: Sailing = {
  name: "Mediterranean Explorer",
  price: 1299,
  ship: {
    name: "Cruise Ship 2",
    rating: 4.8,
    reviews: 150,
    line: {
      name: "Norwegian Cruise Line",
    },
  },
  itinerary: ["Barcelona", "Rome", "Athens"],
  region: "Mediterranean",
  departureDate: "2024-06-01",
  returnDate: "2024-06-08",
  duration: 7,
};

describe("SailingsInterfaceUtils", () => {
  describe("getUniqueSailings", () => {
    it("should remove duplicate sailings from array", () => {
      const sailings: Sailing[] = [
        EXAMPLE_SAILING_1,
        EXAMPLE_SAILING_2,
        EXAMPLE_SAILING_1,
      ];
      const uniqueSailings = getUniqueSailings(sailings);

      expect(uniqueSailings).toHaveLength(2);
      expect(uniqueSailings).toEqual([EXAMPLE_SAILING_1, EXAMPLE_SAILING_2]);
    });

    it("should handle empty array", () => {
      const sailings: Sailing[] = [];
      const uniqueSailings = getUniqueSailings(sailings);

      expect(uniqueSailings).toHaveLength(0);
      expect(uniqueSailings).toEqual([]);
    });

    it("should handle array with no duplicates", () => {
      const sailings: Sailing[] = [EXAMPLE_SAILING_1, EXAMPLE_SAILING_2];
      const uniqueSailings = getUniqueSailings(sailings);

      expect(uniqueSailings).toHaveLength(2);
      expect(uniqueSailings).toEqual([EXAMPLE_SAILING_1, EXAMPLE_SAILING_2]);
    });

    it("should handle array with multiple duplicates", () => {
      const sailings: Sailing[] = [
        EXAMPLE_SAILING_1,
        EXAMPLE_SAILING_1,
        EXAMPLE_SAILING_1,
        EXAMPLE_SAILING_1,
      ];
      const uniqueSailings = getUniqueSailings(sailings);

      expect(uniqueSailings).toHaveLength(1);
      expect(uniqueSailings).toEqual([EXAMPLE_SAILING_1]);
    });
  });
});
