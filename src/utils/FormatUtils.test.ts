import { describe, expect, it } from "@jest/globals";
import {
  formatDateRange,
  getDefaultLogoByLine,
  getCityFromLocation,
  convertTitleToPascalCase,
  DEFAULT_LOGO_SEABOURN_IMAGE_URL,
  DEFAULT_LOGO_IMAGE_URL,
} from "./FormatUtils";

/**
 * Test suite for FormatUtils functions
 * Tests various utility functions for formatting dates, locations, cruise line logos,
 * and text transformations. Includes tests for:
 * - formatDateRange: Formats date ranges in a human-readable format
 * - getDefaultLogoByLine: Returns appropriate logo URLs for cruise lines
 * - getCityFromLocation: Extracts and formats city names from location strings
 * - convertTitleToPascalCase: Converts text to proper Pascal case formatting
 */

describe("FormatUtils", () => {
  describe("formatDateRange", () => {
    it("formats dates in different years correctly", () => {
      expect(formatDateRange("2023-12-25", "2024-01-05")).toBe(
        "Dec 25, 2023 - Jan 5, 2024"
      );
    });

    it("formats dates in different months correctly", () => {
      expect(formatDateRange("2023-11-28", "2023-12-05")).toBe(
        "Nov 28 - Dec 5, 2023"
      );
    });

    it("formats dates in same month correctly", () => {
      expect(formatDateRange("2023-12-01", "2023-12-15")).toBe(
        "Dec 1-15, 2023"
      );
    });

    it("handles single digit days correctly", () => {
      expect(formatDateRange("2023-12-05", "2023-12-08")).toBe("Dec 5-8, 2023");
    });
  });

  describe("getDefaultLogoByLine", () => {
    it("returns Seabourn logo for Seabourn Cruise Line", () => {
      expect(getDefaultLogoByLine("Seabourn Cruise Line")).toBe(
        DEFAULT_LOGO_SEABOURN_IMAGE_URL
      );
    });

    it("returns default logo for other cruise lines", () => {
      expect(getDefaultLogoByLine("Royal Caribbean")).toBe(
        DEFAULT_LOGO_IMAGE_URL
      );
      expect(getDefaultLogoByLine("Norwegian Cruise Line")).toBe(
        DEFAULT_LOGO_IMAGE_URL
      );
    });
  });

  describe("getCityFromLocation", () => {
    it("removes parenthetical content", () => {
      expect(
        getCityFromLocation("Fort Lauderdale (Port Everglades), Florida")
      ).toBe("Ft. Lauderdale");
    });

    it("takes only the city part before comma", () => {
      expect(getCityFromLocation("Miami, Florida")).toBe("Miami");
    });

    it("converts Fort to Ft.", () => {
      expect(getCityFromLocation("Fort Myers, Florida")).toBe("Ft. Myers");
    });

    it("properly capitalizes each word", () => {
      expect(getCityFromLocation("NEW YORK CITY, New York")).toBe(
        "New York City"
      );
    });

    it("handles complex cases", () => {
      expect(getCityFromLocation("FORT LAUDERDALE (Port Everglades), FL")).toBe(
        "Ft. Lauderdale"
      );
      expect(getCityFromLocation("SAN JUAN (Old Port), Puerto Rico")).toBe(
        "San Juan"
      );
    });

    it("handles commas inside parentheses", () => {
      expect(getCityFromLocation("Safaga (Luxor, Karnak), Egypt")).toBe(
        "Safaga"
      );
    });
  });

  describe("convertTitleToPascalCase", () => {
    it("converts all caps to pascal case", () => {
      expect(convertTitleToPascalCase("HELLO WORLD")).toBe("Hello World");
    });

    it("converts all lowercase to pascal case", () => {
      expect(convertTitleToPascalCase("hello world")).toBe("Hello World");
    });

    it("handles mixed case input", () => {
      expect(convertTitleToPascalCase("hELLo WoRLD")).toBe("Hello World");
    });

    it("handles multiple words", () => {
      expect(convertTitleToPascalCase("THE QUICK BROWN FOX")).toBe(
        "The Quick Brown Fox"
      );
    });
  });
});
