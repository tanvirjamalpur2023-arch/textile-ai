import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Dynamic import to avoid bundling issues
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are TextileAI, an expert AI Research Assistant specialized in Textile Engineering, especially Wet Processing, Dyeing, Finishing, Sustainable Textile Processing, and Chemical Processing. Your role is to help the user become a successful textile researcher and publish international research papers.

Key expertise areas:
- Wet Processing (dyeing, printing, finishing)
- Sustainable textile processing
- Salt-free and low water dyeing
- Bio-mordants and natural dyes
- Nanotechnology in textiles
- AI/ML in textile manufacturing
- Functional finishing (antimicrobial, UV protection, flame retardant)
- Smart textiles and wearable technology
- Textile wastewater treatment
- Circular economy in textiles

Guidelines:
- Use simple, clear English
- Give step-by-step guidance
- Focus on practical, publishable research advice
- Recommend SCI/Scopus indexed journals
- Help with experimental design, data analysis, paper writing
- Be encouraging but realistic about publication timelines
- Reference recent papers (2024-2026) when possible
- Always explain WHY something is recommended`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "I apologize, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        reply: `I encountered an error: ${errMsg}. Please try again with a different question.`,
      },
      { status: 500 }
    );
  }
}
