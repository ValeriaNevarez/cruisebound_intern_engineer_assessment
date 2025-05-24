import Image from "next/image";
import type Sailing from "@/interfaces/SailingsInterface";
import { StarIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  formatDateRange,
  getCityFromLocation,
  convertTitleToPascalCase,
  DEFAULT_SHIP_IMAGE_URL,
  getDefaultLogoByLine,
} from "@/utils/FormatUtils";

interface CardProps {
  /** The sailing information to display in the card */
  sailing: Sailing;
}

/**
 * Card component displays detailed information about a cruise sailing.
 * It shows the ship's image, sailing dates, cruise line details, itinerary,
 * ratings, and pricing in a responsive card layout.
 */
export default function Card({ sailing }: CardProps) {
  return (
    sailing && (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="relative w-full md:w-72 h-48 md:h-auto">
          {/* Fallback to default ship image if the sailing's ship image is not available
              This ensures we always display an image even if the API returns null or undefined */}
          <Image
            src={sailing.ship.image || DEFAULT_SHIP_IMAGE_URL}
            alt={sailing.name}
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            className="object-cover"
            priority
          />
          <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded z-10 text-sm md:text-base">
            {formatDateRange(sailing.departureDate, sailing.returnDate)}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          {/* Main content */}
          <div className="p-4 md:p-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
              <h3 className="text-xl md:text-xl lg:text-2xl font-semibold leading-tight">
                {convertTitleToPascalCase(sailing.name)}
              </h3>

              <div className="flex flex-row md:flex-col items-center md:items-end text-right gap-2 md:gap-1">
                <div className="relative h-7 w-28 self-start md:self-auto">
                  {/* Fallback to a default logo based on the cruise line name if the line's logo is not available
                      This ensures brand consistency even when the API doesn't provide a custom logo */}
                  <Image
                    src={
                      sailing.ship.line.logo ||
                      getDefaultLogoByLine(sailing.ship.line.name)
                    }
                    alt="Cruise Line Logo"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                {sailing.ship.line.name && (
                  <span className="text-gray-600 text-sm ml-auto md:ml-0">
                    {sailing.ship.line.name}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className="text-gray-700 flex flex-wrap items-center gap-2 text-base md:text-lg">
                <span>{sailing.region}</span>
                <span className="ml-2">{sailing.duration} nights</span>
                {sailing.ship.rating && sailing.ship.rating > 0 && (
                  <div className="flex items-center gap-1 ml-0 md:ml-4">
                    <StarIcon
                      className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 my-auto"
                      aria-hidden="true"
                    />
                    <div className="text-gray-600">
                      <span className="text-sm md:text-base font-bold">
                        {sailing.ship.rating}
                      </span>{" "}
                      <span className="text-xs md:text-sm">
                        {sailing.ship.reviews} reviews
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {sailing.itinerary.length > 0 && (
              <div className="flex flex-wrap items-center gap-y-2 text-black mb-4 text-sm md:text-base">
                {sailing.itinerary.map((stop, index) => (
                  <span key={`${stop}-${index}`} className="flex items-center">
                    {getCityFromLocation(stop)}
                    {index < sailing.itinerary.length - 1 && (
                      <ArrowRightIcon
                        className="w-4 h-4 mx-1 text-blue-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Gray footer */}
          <div className="bg-gray-50 px-4 py-3 md:px-6 md:py-4 border-t border-gray-100 flex flex-col md:flex-row items-center md:justify-end gap-4 md:gap-8">
            {sailing.price && (
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600">Interior from</p>
                <p className="text-lg md:text-2xl font-bold">
                  <span className="align-top text-sm">$</span>
                  {sailing.price}
                </p>
              </div>
            )}
            <button className="w-full md:w-auto bg-blue-500 text-lg text-white px-3.5 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">
              See sailings
            </button>
          </div>
        </div>
      </div>
    )
  );
}
