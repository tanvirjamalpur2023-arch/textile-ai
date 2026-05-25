import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, context, title } = await req.json();

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "title") {
      systemPrompt = `You are a Textile Research Paper Title Generator. Generate 5 specific, academic research paper titles based on the user's focus area. Titles should be suitable for SCI/Scopus indexed journals. Each title should be specific, novel, and include key methodology or approach. Format as a numbered list.`;
      userPrompt = `Generate 5 research paper titles for the topic: ${context}. The user is a BSc Textile Engineering student. Focus on wet processing, sustainable dyeing, and practical experimental approaches.`;
    } else if (type === "abstract") {
      systemPrompt = `You are an expert academic paper abstract writer for textile engineering research. Write a structured abstract (200-250 words) with: Background, Objective, Methods, Key Results, and Conclusion. Be specific with data, measurements, and percentages where possible. Write in formal academic English.`;
      userPrompt = `Write a research abstract for the paper titled: "${title}". Research context: ${context}. Include specific experimental methods, expected results with K/S values, fastness ratings, and sustainability metrics like water/energy savings.`;
    } else if (type === "litreview") {
      systemPrompt = `You are an expert academic literature review writer for textile engineering research. Write a comprehensive literature review section covering recent advances. Cite specific authors and years. Organize by sub-topics. Use formal academic English with proper transitions.`;
      userPrompt = `Write a literature review section for the paper titled: "${title}". Context: ${context}. Cover key papers from 2019-2026 on sustainable dyeing, cationization methods, bio-mordants, and low liquor ratio processing.`;
    } else if (type === "methodology") {
      systemPrompt = `You are an expert experimental methodology writer for textile engineering research. Write a detailed methodology section with specific chemicals, concentrations, equipment, and procedures. Be precise and reproducible.`;
      userPrompt = `Write a detailed methodology section for the paper titled: "${title}". Context: ${context}. Include specific chemicals (CHPTAC, chitosan, reactive dyes, bio-mordants), concentrations, liquor ratios (1:3, 1:5, 1:8, 1:10), temperature profiles, and testing standards.`;
    } else if (type === "results") {
      systemPrompt = `You are an expert results and discussion writer for textile engineering research. Write a structured results section with realistic data tables, discussion of trends, and comparison with literature. Use formal academic English.`;
      userPrompt = `Write a results and discussion section for the paper titled: "${title}". Context: ${context}. Include realistic data for K/S values at different liquor ratios, fastness ratings, and sustainability metrics.`;
    } else if (type === "conclusion") {
      systemPrompt = `You are an expert conclusion writer for textile engineering research papers. Write a concise conclusion summarizing key findings, practical implications, and future research directions.`;
      userPrompt = `Write a conclusion for the paper titled: "${title}". Context: ${context}. Summarize optimal conditions, key improvements, and future research directions.`;
    } else {
      systemPrompt = `You are TextileAI, an expert AI Research Assistant specialized in Textile Engineering.`;
      userPrompt = context;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Unable to generate content. Please try again.";

    return NextResponse.json({ content: reply });
  } catch (error: unknown) {
    console.error("Paper writing API error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { content: `Error generating content: ${errMsg}` },
      { status: 500 }
    );
  }
}
