export interface Sailing {
    price: number;
    name: string;
    ship: {
      name: string;
      rating: number;
      reviews: number;
      image?: string;
      line: {
        logo?: string;
        name: string;
      };
    };
    itinerary: string[];
    region: string;
    departureDate: string;
    returnDate: string;
    duration: number;
  }
  