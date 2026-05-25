import { NextRequest, NextResponse } from "next/server";
import { getAICompletion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { focus, level, searchContext } = await req.json();

    let contextSection = "";
    if (searchContext) {
      contextSection = `\n\nBased on web search results, here are papers that already exist in this area:\n${searchContext}\n\nUse this information to identify what is ALREADY DONE and what GAPS remain.`;
    }

    const reply = await getAICompletion([
      {
        role: "system",
        content: `You are a Textile Research Gap Analysis Engine. Your job is to find REAL, SPECIFIC, and ACCURATE research gaps in textile wet processing engineering.

For each gap you identify, provide ALL of the following in this exact JSON format:
{
  "gaps": [
    {
      "title": "Specific gap title",
      "severity": "Critical|High|Medium|Low",
      "whatExists": "What research already exists on this topic",
      "whatsMissing": "What specifically is missing or unexplored",
      "untriedCombinations": "Specific combinations not yet tried",
      "existingPaperCount": "estimated number of papers on this exact topic",
      "opportunityScore": 1-10,
      "bscFeasible": true/false,
      "experimentalApproach": "Step-by-step approach to fill this gap",
      "targetJournals": [{"name": "journal name", "if": impact_factor}],
      "keyMethods": ["method1", "method2"]
    }
  ]
}

IMPORTANT RULES:
- Be SPECIFIC - not "sustainable dyeing" but "salt-free reactive dyeing of cotton using chitosan-CHPTAC dual cationization at LLR 1:3"
- Be ACCURATE - only identify gaps that genuinely exist
- Be HONEST about what exists - don't claim something is unexplored if it isn't
- Focus on BSc-feasible gaps that can be done in a university lab
- Consider combinations that haven't been tried (method A + material B + condition C)
- The user level is: ${level || "BSc Textile Engineering"}`,
      },
      {
        role: "user",
        content: `Find research gaps in: ${focus || "Sustainable textile wet processing, dyeing, finishing"}${contextSection}`,
      },
    ]);

    return NextResponse.json({ recommendations: reply || "Unable to generate gap analysis." });
  } catch (error: unknown) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { recommendations: "Error generating gap analysis." },
      { status: 500 }
    );
  }
}
