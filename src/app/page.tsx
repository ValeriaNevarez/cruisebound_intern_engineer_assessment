import HomePage from "@/components/HomePage";
import type Sailing from "@/interfaces/SailingsInterface";
import { Suspense } from "react";
import { getUniqueSailings } from "@/utils/SailingsInterfaceUtils";

async function getSailings(): Promise<Sailing[]> {
  try {
    // This will be executed at build time.
    const res = await fetch("https://sandbox.cruisebound-qa.com/sailings", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch sailings: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data.results as Sailing[];
  } catch (error) {
    console.error("Error fetching sailings:", error);
    return [];
  }
}

export default async function Home() {
  const sailings = await getSailings();
  // Remove duplicate sailings because the API returns the same sailing multiple times.
  const uniqueSailings = getUniqueSailings(sailings);

  return (
    <main>
      <Suspense fallback={<div>Loading sailings...</div>}>
        <HomePage initialSailings={uniqueSailings} />
      </Suspense>
    </main>
  );
}
