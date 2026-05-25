import { NextRequest, NextResponse } from "next/server";
import { webSearch } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { query, mode } = await req.json();

    const queries = [];
    if (mode === "citation") {
      queries.push(`${query} textile wet processing research paper highly cited 2024 2025 2026`);
      queries.push(`${query} dyeing finishing sustainable textile SCI Scopus journal paper`);
    } else if (mode === "latest") {
      queries.push(`${query} textile wet processing 2025 2026 new paper`);
      queries.push(`${query} textile dyeing finishing recent research 2025`);
    } else {
      queries.push(`${query} textile research paper 2024 2025 2026`);
    }

    const searchPromises = queries.map((q) => webSearch(q, 10));
    const results = await Promise.all(searchPromises);

    const allResults = results.flat();
    const seen = new Set<string>();
    const deduplicated = allResults.filter((r: { url: string }) => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });

    return NextResponse.json({ results: deduplicated });
  } catch (error: unknown) {
    console.error("Search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
