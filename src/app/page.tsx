import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card 
        title="5 Night Bahama Adventure"
        destination="Bahamas"
        nights={5}
        rating={4.87}
        reviews={254}
        route={["Miami", "Nassau", "Miami"]}
        price={610}
        imageUrl="/bahamas.jpg"
        date="Sept 20-25, 2021"
        logo="cruiselogo.jpg"
        line="Majesty of the Seas"
      />
    </div>
  );
}
