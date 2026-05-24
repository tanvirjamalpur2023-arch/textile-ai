import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { focus, level } = await req.json();

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a Textile Research Topic Recommendation Engine. Generate 5 specific, novel research topics based on the user's focus area and level. For each topic provide: title, why it matters (2-3 sentences), current research status, target journals with IF, and key experimental methods. Focus on topics with high publication potential and low competition. The user level is: ${level || "BSc"}.`,
        },
        {
          role: "user",
          content: `Recommend research topics in: ${focus || "Sustainable textile wet processing"}`,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Unable to generate recommendations.";

    return NextResponse.json({ recommendations: reply });
  } catch (error: unknown) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { recommendations: "Error generating recommendations." },
      { status: 500 }
    );
  }
}
