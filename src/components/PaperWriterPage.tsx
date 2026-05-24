"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Badge available if needed
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  PenTool,
  FileText,
  CheckCircle2,
  Circle,
  ChevronRight,
  Sparkles,
  Copy,
  Loader2,
} from "lucide-react";

const paperSteps = [
  { id: 1, name: "Title", key: "title", icon: <Sparkles size={16} /> },
  { id: 2, name: "Abstract", key: "abstract", icon: <FileText size={16} /> },
  { id: 3, name: "Lit Review", key: "litreview", icon: <FileText size={16} /> },
  { id: 4, name: "Methodology", key: "methodology", icon: <FileText size={16} /> },
  { id: 5, name: "Results", key: "results", icon: <FileText size={16} /> },
  { id: 6, name: "Conclusion", key: "conclusion", icon: <FileText size={16} /> },
  { id: 7, name: "References", key: "references", icon: <FileText size={16} /> },
];

export default function PaperWriterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [focusArea, setFocusArea] = useState("");
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/paper-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          context: focusArea || "Sustainable textile wet processing, low liquor ratio dyeing, salt-free cationization, bio-mordants",
          title: title || "",
        }),
      });
      const data = await res.json();
      if (type === "title" && !title) {
        // Parse titles from the response
        const lines = data.content.split("\n").filter((l: string) => l.trim());
        const firstTitle = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
        setTitle(firstTitle);
      } else {
        setSections((prev) => ({ ...prev, [type]: data.content }));
      }
    } catch {
      setSections((prev) => ({ ...prev, [type]: "Error generating content. Please try again." }));
    } finally {
      setIsGenerating(false);
    }
  };

  const getStepDescription = (stepId: number) => {
    switch (stepId) {
      case 1:
        return "Enter your research focus and let AI generate professional paper titles suitable for SCI/Scopus journals.";
      case 2:
        return "AI will write a structured abstract with Background, Objective, Methods, Key Results, and Conclusion.";
      case 3:
        return "AI generates a comprehensive literature review covering recent advances with specific citations.";
      case 4:
        return "AI writes a detailed methodology section with specific chemicals, procedures, and testing standards.";
      case 5:
        return "AI creates a structured results section with realistic data tables and discussion.";
      case 6:
        return "AI writes a concise conclusion with key findings and future research directions.";
      case 7:
        return "Format references in your target journal's required citation style.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PenTool size={20} className="text-purple-500" />
          AI Paper Writer
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Step-by-step AI-assisted research paper writing — powered by real AI
        </p>
      </div>

      {/* Research Focus Input */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-4">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Your Research Focus
          </label>
          <Input
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            placeholder="e.g., Salt-free dyeing, Low liquor ratio, Bio-mordants, Cationization..."
            className="bg-white"
          />
          <p className="text-xs text-slate-500 mt-1">
            This helps AI generate more relevant content for each section of your paper.
          </p>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {paperSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              currentStep === step.id
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : currentStep > step.id
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-slate-50 text-slate-500"
            }`}
          >
            {currentStep > step.id ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <Circle size={14} />
            )}
            {step.name}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {paperSteps[currentStep - 1].icon}
            Step {currentStep}: {paperSteps[currentStep - 1].name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-500">{getStepDescription(currentStep)}</p>

          {currentStep === 1 && (
            <>
              <Button
                onClick={() => handleGenerate("title")}
                disabled={isGenerating}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isGenerating ? "Generating Titles..." : "Generate AI Title Suggestions"}
              </Button>
              {title && (
                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-bold text-slate-700">AI-Generated Title:</h4>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-800">{title}</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleCopy(title, "title")}
                      >
                        <Copy size={12} /> {copied === "title" ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => setCurrentStep(2)}
                      >
                        Use This Title <ChevronRight size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep >= 2 && currentStep <= 6 && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <strong>Your Title:</strong> {title || "Please generate a title first"}
                </p>
              </div>
              <Button
                onClick={() => handleGenerate(paperSteps[currentStep - 1].key)}
                disabled={isGenerating || !title}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isGenerating
                  ? `Generating ${paperSteps[currentStep - 1].name}...`
                  : `Generate AI ${paperSteps[currentStep - 1].name}`}
              </Button>
              {sections[paperSteps[currentStep - 1].key] && (
                <div className="space-y-3">
                  <Textarea
                    value={sections[paperSteps[currentStep - 1].key]}
                    onChange={(e) =>
                      setSections((prev) => ({
                        ...prev,
                        [paperSteps[currentStep - 1].key]: e.target.value,
                      }))
                    }
                    rows={14}
                    className="text-sm font-mono"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() =>
                        handleCopy(sections[paperSteps[currentStep - 1].key], paperSteps[currentStep - 1].key)
                      }
                    >
                      <Copy size={12} /> {copied === paperSteps[currentStep - 1].key ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleGenerate(paperSteps[currentStep - 1].key)}
                    >
                      <Sparkles size={12} /> Regenerate
                    </Button>
                    {currentStep < 7 && (
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Next Step <ChevronRight size={12} />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep === 7 && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Reference Formatting Tips:</strong> Use your target journal&apos;s citation style (APA, GB-T 7714, Vancouver). Ensure all citations are complete with DOIs. Use reference managers like Zotero or Mendeley for accuracy.
                </p>
              </div>
              <Textarea
                placeholder="Paste or write your references here..."
                rows={12}
                className="text-sm font-mono"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles size={12} /> AI Format References
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paper Progress Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Paper Completion Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {paperSteps.map((step) => {
              const isComplete = step.id === 1 ? !!title : !!sections[step.key];
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isComplete
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isComplete ? "✓" : step.id}
                  </div>
                  <span className="text-[10px] text-slate-500 text-center">
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
