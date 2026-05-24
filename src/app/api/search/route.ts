import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const searchResult = await zai.functions.invoke("web_search", {
      query: `${query} textile research 2024 2025 2026`,
      num: 10,
    });

    return NextResponse.json({ results: searchResult });
  } catch (error: unknown) {
    console.error("Search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
