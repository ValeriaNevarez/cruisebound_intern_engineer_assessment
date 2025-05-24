/** Default fallback image URL for ships when no image is provided */
export const DEFAULT_SHIP_IMAGE_URL = "/default_ship_image.jpg";
/** Default image URL for Seabourn Cruise Line */
export const DEFAULT_LOGO_SEABOURN_IMAGE_URL = "/seabourn_logo.jpg";
/** Default fallback image URL for cruise line logos when no logo is provided */
export const DEFAULT_LOGO_IMAGE_URL = "/default_logo_image.jpg";

/**
 * Formats a date range into a human-readable string
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Formatted date range string in one of these formats:
 * - Different years: "MMM DD, YYYY - MMM DD, YYYY"
 * - Different months: "MMM DD-MMM DD, YYYY"
 * - Same month: "MMM DD-DD, YYYY"
 */
export function formatDateRange(startDate: string, endDate: string): string {
  // Ensure correct date by appending time and using UTC methods
  const start = new Date(startDate + "T00:00:00Z");
  const end = new Date(endDate + "T00:00:00Z");

  const startMonth = start.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const endMonth = end.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  // If years are different
  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${String(
      endDay
    ).padStart(2, "0")}, ${endYear}`;
  }

  // If months are different
  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay}-${endMonth} ${String(endDay).padStart(
      2,
      "0"
    )}, ${startYear}`;
  }

  // If only days are different
  return `${startMonth} ${startDay}-${String(endDay).padStart(
    2,
    "0"
  )}, ${startYear}`;
}

/**
 * Returns the appropriate default logo image URL for a given cruise line
 * @param lineName - Name of the cruise line
 * @returns URL of the logo image, using a default if no specific logo is found
 */
export function getDefaultLogoByLine(lineName: string): string {
  if (lineName === "Seabourn Cruise Line") {
    return DEFAULT_LOGO_SEABOURN_IMAGE_URL;
  }
  return DEFAULT_LOGO_IMAGE_URL;
}

/**
 * Extracts and formats the city name from a location string
 * @param location - Full location string (e.g. "Fort Lauderdale (Port Everglades), Florida")
 * @returns Formatted city name with proper capitalization and abbreviations
 * - Removes parenthetical content
 * - Takes first part before comma
 * - Converts "Fort" to "Ft."
 * - Properly capitalizes each word
 */
export function getCityFromLocation(location: string): string {
  return location
    .replace(/\s*\([^)]*\)/g, "")
    .split(",")[0]
    .trim()
    .replace(/Fort\s+/g, "Ft. ")
    .split(" ")
    .map((word) => {
      // Skip words that are already properly formatted (like Ft.)
      if (word.endsWith(".")) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Converts a title string to proper Pascal Case format
 * @param title - Input title string
 * @returns Title with first letter of each word capitalized and rest in lowercase
 */
export function convertTitleToPascalCase(title: string): string {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
