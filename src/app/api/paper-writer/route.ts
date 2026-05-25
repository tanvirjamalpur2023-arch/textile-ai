import { NextRequest, NextResponse } from "next/server";
import { getAICompletion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { type, context, title, currentText } = await req.json();

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "title") {
      systemPrompt = `You are a Textile Research Paper Title Generator. Generate 5 specific, academic research paper titles based on the user's focus area. Titles should be suitable for SCI/Scopus indexed journals. Each title should be specific, novel, and include key methodology or approach. Format as a numbered list. Make titles that are publishable and realistic for a BSc Textile Engineering student.`;
      userPrompt = `Generate 5 research paper titles for the topic: ${context}. The user is a BSc Textile Engineering student specializing in Wet Processing. Focus on practical experimental approaches that can be done in a university lab.`;
    } else if (type === "introduction") {
      systemPrompt = `You are an expert academic paper introduction writer for textile engineering research. Write a compelling introduction that: (1) Establishes the broader context and importance of the research area, (2) Narrows down to the specific problem, (3) Reviews key prior work with citations, (4) Identifies the gap, (5) States the research objectives clearly. Use formal academic English. Include in-text citations like (Author, Year).`;
      userPrompt = `Write an introduction section for the paper titled: "${title}". Research context: ${context}. Start broad about textile wet processing sustainability, then narrow to the specific area, identify the gap, and state objectives.`;
    } else if (type === "abstract") {
      systemPrompt = `You are an expert academic paper abstract writer for textile engineering research. Write a structured abstract (200-250 words) with: Background, Objective, Methods, Key Results, and Conclusion. Be specific with data, measurements, and percentages where possible. Write in formal academic English.`;
      userPrompt = `Write a research abstract for the paper titled: "${title}". Research context: ${context}. Include specific experimental methods, expected results with K/S values, fastness ratings, and sustainability metrics like water/energy savings.`;
    } else if (type === "litreview") {
      systemPrompt = `You are an expert academic literature review writer for textile engineering research. Write a comprehensive literature review section covering recent advances. Cite specific authors and years. Organize by sub-topics with clear headings. Use formal academic English with proper transitions between paragraphs.`;
      userPrompt = `Write a literature review section for the paper titled: "${title}". Context: ${context}. Cover key papers from 2019-2026 on sustainable dyeing, cationization methods, bio-mordants, and low liquor ratio processing. Organize by theme with sub-headings.`;
    } else if (type === "methodology") {
      systemPrompt = `You are an expert experimental methodology writer for textile engineering research. Write a detailed methodology section with specific chemicals, concentrations, equipment, and procedures. Be precise and reproducible. Include: Materials (with specifications), Methods (step-by-step), Testing standards, and Data analysis approach.`;
      userPrompt = `Write a detailed methodology section for the paper titled: "${title}". Context: ${context}. Include specific chemicals (CHPTAC, chitosan, reactive dyes, bio-mordants), concentrations (% owf), liquor ratios (1:3, 1:5, 1:8, 1:10), temperature profiles, times, and testing standards (ISO/AATCC).`;
    } else if (type === "results") {
      systemPrompt = `You are an expert results and discussion writer for textile engineering research. Write a structured results section with realistic data tables, discussion of trends, and comparison with literature. Use formal academic English.`;
      userPrompt = `Write a results and discussion section for the paper titled: "${title}". Context: ${context}. Include realistic data for K/S values at different conditions, fastness ratings (wash, rub, light), and sustainability metrics.`;
    } else if (type === "discussion") {
      systemPrompt = `You are an expert discussion writer for textile engineering research. Write a thorough discussion that: interprets results, compares with literature, explains mechanisms, discusses practical implications, and acknowledges limitations.`;
      userPrompt = `Write a discussion section for the paper titled: "${title}". Context: ${context}. Interpret the results, explain the underlying mechanisms, compare with existing literature, and discuss practical implications for the textile industry.`;
    } else if (type === "conclusion") {
      systemPrompt = `You are an expert conclusion writer for textile engineering research papers. Write a concise conclusion summarizing key findings with specific data, practical implications for industry, and clear future research directions.`;
      userPrompt = `Write a conclusion for the paper titled: "${title}". Context: ${context}. Summarize optimal conditions with specific data, key improvements, practical significance, and future research directions.`;
    } else if (type === "improve") {
      systemPrompt = `You are an expert academic writing improver for textile engineering research. Improve the given text by: (1) Making language more formal and academic, (2) Improving clarity and flow, (3) Adding specific technical details where vague, (4) Strengthening argumentation, (5) Fixing any grammatical errors. Return ONLY the improved text, no explanations.`;
      userPrompt = `Improve this text for an academic research paper:\n\n${currentText}\n\nContext: This is for a paper titled "${title}" about ${context}.`;
    } else if (type === "check") {
      systemPrompt = `You are an expert academic writing reviewer for textile engineering research. Review the given text and identify: (1) Grammar/language errors, (2) Scientific inaccuracies, (3) Logical inconsistencies, (4) Missing citations, (5) Weak argumentation, (6) Methodology issues. Format your response as a numbered list of issues with specific corrections.`;
      userPrompt = `Review this text for errors and issues:\n\n${currentText}\n\nContext: This is for a paper titled "${title}" about ${context}.`;
    } else {
      systemPrompt = `You are TextileAI, an expert AI Research Assistant specialized in Textile Engineering.`;
      userPrompt = context;
    }

    const reply = await getAICompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    return NextResponse.json({
      content: reply || "Unable to generate content. Please try again.",
    });
  } catch (error: unknown) {
    console.error("Paper writing API error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { content: `Error generating content: ${errMsg}` },
      { status: 500 }
    );
  }
}
