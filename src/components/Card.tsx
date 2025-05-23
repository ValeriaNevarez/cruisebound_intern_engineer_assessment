import Image from "next/image";

const DEFAULT_IMAGE_URL = "/default_ship_image.jpg";
const SEABOURN_DEFAULT_IMAGE = "/seabourn_logo.jpg";
const DEFAULT_LOGO_IMAGE = "/default_logo_image.jpg";

function getLogoByLine(line_name: string): string {
  if (line_name === "Seabourn Cruise Line") {
    return SEABOURN_DEFAULT_IMAGE;
  }
  return DEFAULT_LOGO_IMAGE;
}

function getCityFromLocation(location: string): string {
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

function convertTitleToPascalCase(title: string): string {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

interface CardProps {
  title: string;
  destination: string;
  nights: number;
  rating?: number;
  reviews?: number;
  route?: string[];
  price?: number;
  imageUrl: string;
  date: string;
  logo?: string;
  line: string;
}

export default function Card({
  title,
  destination,
  nights,
  rating = 0,
  reviews = 0,
  route = [],
  price,
  imageUrl,
  date,
  logo,
  line,
}: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
      {/* Left side - Image */}
      <div className="relative w-72 h-[300px]">
        <Image
          src={imageUrl ? imageUrl : DEFAULT_IMAGE_URL}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className="object-cover"
          priority
        />
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded z-10">
          {date}
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 flex flex-col">
        {/* Main content */}
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{convertTitleToPascalCase(title)}</h3>

            <div className="flex flex-col items-end gap-1">
              <div className="relative h-6 w-24">
                <Image
                  src={logo ? logo : getLogoByLine(line)}
                  alt="Cruise Line Logo"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
              {line && <span className="text-gray-600 text-sm">{line}</span>}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-gray-700 flex items-center gap-2">
              <span>{destination}</span><span className="ml-2">{nights} nights</span>
              {rating > 0 && (
                <div className="flex items-center gap-1 ml-4">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    <span className="font-bold">{rating}</span> {reviews}{" "}
                    reviews
                  </span>
                </div>
              )}
            </div>
          </div>

          {route.length > 0 && (
            <div className="flex flex-wrap items-center gap-y-2 text-gray-600 mb-4 max-h-[4.5rem]">
              {route.map((stop, index) => (
                <span key={`${stop}-${index}`} className="flex items-center text-sm">
                  {getCityFromLocation(stop)}
                  {index < route.length - 1 && (
                    <svg
                      className="w-3 h-3 mx-1 text-blue-400 flex items-center"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7-7l7 7-7 7"
                      />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Gray footer */}

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end">
          {price && (
            <div className="text-right mr-8">
              <p className="text-sm text-gray-600">Interior from</p>
              <p className="text-lg font-bold">${price}</p>
            </div>
          )}
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            See sailings
          </button>
        </div>
      </div>
    </div>
  );
}
