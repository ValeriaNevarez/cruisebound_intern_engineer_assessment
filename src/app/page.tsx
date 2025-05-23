import HomePage from "@/components/HomePage";
import type Sailing from "@/components/SailingsInterface";
import { Suspense } from "react";

async function getSailings(): Promise<Sailing[]> {
  try {
    const res = await fetch("https://sandbox.cruisebound-qa.com/sailings", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch sailings: ${res.status}`);
      return [];
    }

    const data = await res.json();
    // TODO: Add type guard to ensure data.results is an array of Sailing.
    return data.results as Sailing[];
  } catch (error) {
    console.error("Error fetching sailings:", error);
    return [];
  }
}

export default async function Home() {
  const sailings = await getSailings();
  
  // Remove duplicate sailings because the API returns the same sailing multiple times.
  const uniqueSailings = Array.from(
    new Map(
      sailings.map(sailing => [
        JSON.stringify(sailing),
        sailing
      ])
    ).values()
  );

  return (
    <main>
      <Suspense fallback={<div>Loading sailings...</div>}>
        <HomePage initialSailings={uniqueSailings} />
      </Suspense>
    </main>
  );
}
