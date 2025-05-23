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
  const sailings = await getCruises();
  
  return (
    <div className="container mx-auto px-4 py-8">
        {sailings.map((sailing, index) => (
          <Card 
            key={index}
            name ={sailing.name}
            region={sailing.region}
            duration={sailing.duration}
            rating={sailing.ship.rating}
            reviews={sailing.ship.reviews}
            itinerary={sailing.itinerary}
            price={sailing.price}
            image={sailing.ship.image}
            departure_date={sailing.departureDate}
            return_date={sailing.returnDate}
            logo={sailing.ship.line.logo}
            ship_name ={sailing.ship.line.name}
          />
        ))}
    </div>
  );
}
