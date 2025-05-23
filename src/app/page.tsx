import HomePage from "@/components/HomePage"; 

export interface Cruise {
  price: number;
  name: string;
  ship: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    line: {
      logo: string;
      name: string;
    };
  };
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
}

async function getCruises() {
  const res = await fetch("https://sandbox.cruisebound-qa.com/sailings", {
    cache: "no-store", // Equivalent to getServerSideProps behavior
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cruises");
  }

  const data = await res.json();
  return data.results as Cruise[];
}

export default async function Home() {
  const sailings = await getCruises();
  return <HomePage initialSailings={sailings} />;
}
