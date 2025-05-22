import Card from "@/components/Card";

interface Cruise {
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
  const res = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
    cache: 'no-store' // Equivalent to getServerSideProps behavior
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch cruises');
  }
  
  const data = await res.json();
  return data.results as Cruise[];
}

export default async function Home() {
  const cruises = await getCruises();
  
  return (
    <div className="container mx-auto px-4 py-8">
        {cruises.map((cruise, index) => (
          <Card 
            key={index}
            title={cruise.name}
            destination={cruise.region}
            nights={cruise.duration}
            rating={cruise.ship.rating}
            reviews={cruise.ship.reviews}
            route={cruise.itinerary}
            price={cruise.price}
            imageUrl={cruise.ship.image}
            date={`${new Date(cruise.departureDate).toLocaleDateString()} - ${new Date(cruise.returnDate).toLocaleDateString()}`}
            logo={cruise.ship.line.logo}
            line={cruise.ship.line.name}
          />
        ))}
    </div>
  );
}
