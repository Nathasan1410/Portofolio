import { NextResponse } from "next/server";

type CounterPayload = {
  count?: number;
  value?: number;
};

const ENDPOINTS = [
  "https://api.countapi.xyz/hit/tempegoreng-myid/portfolio-made-with-love",
  "https://countapi.xyz/hit/tempegoreng-myid/portfolio-made-with-love",
  "https://api.counterapi.dev/v1/tempegoreng-myid/portfolio-made-with-love/up",
];

async function tryEndpoint(url: string): Promise<number | null> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as CounterPayload;
  const candidate = typeof data.value === "number" ? data.value : data.count;
  return typeof candidate === "number" ? candidate : null;
}

export async function POST() {
  for (const url of ENDPOINTS) {
    try {
      const count = await tryEndpoint(url);
      if (count !== null) {
        return NextResponse.json({ count, source: "global" }, { status: 200 });
      }
    } catch {
      // Try next provider.
    }
  }

  return NextResponse.json(
    { error: "counter_unavailable" },
    { status: 503 }
  );
}
