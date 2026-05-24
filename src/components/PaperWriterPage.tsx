"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Download,
} from "lucide-react";

const paperSteps = [
  { id: 1, name: "Title Generation", icon: <Sparkles size={16} /> },
  { id: 2, name: "Abstract", icon: <FileText size={16} /> },
  { id: 3, name: "Literature Review", icon: <FileText size={16} /> },
  { id: 4, name: "Methodology", icon: <FileText size={16} /> },
  { id: 5, name: "Results & Discussion", icon: <FileText size={16} /> },
  { id: 6, name: "Conclusion", icon: <FileText size={16} /> },
  { id: 7, name: "References", icon: <FileText size={16} /> },
];

const titleSuggestions = [
  "Low Liquor Ratio Salt-Free Reactive Dyeing of Cationized Cotton Using Bio-Mordants: A Sustainable Approach",
  "Sustainable Salt-Free Dyeing of Cotton at Reduced Liquor Ratios with Chitosan-Modified Bio-Mordant Systems",
  "Eco-Friendly Low Water Reactive Dyeing: Combining Cationization and Bio-Mordanting for Sustainable Cotton Processing",
  "Water-Efficient Salt-Free Dyeing of Bio-Mordant Modified Cotton: Process Optimization and Quality Assessment",
  "Green Chemistry Approach to Low Liquor Ratio Salt-Free Dyeing: Cationization with Agricultural Waste Bio-Mordants",
];

export default function PaperWriterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      if (type === "title" && !title) {
        setTitle(titleSuggestions[0]);
      }
      if (type === "abstract" && !abstract) {
        setAbstract(
          "This study investigates a novel sustainable approach combining low liquor ratio (LLR) dyeing with salt-free cationization and bio-mordanting for cotton fabric processing. Cotton fabric was cationized using chitosan and CHPTAC at various concentrations, then dyed with reactive dyes at liquor ratios of 1:3, 1:5, 1:8, and 1:10, utilizing pomegranate peel and myrobalan as bio-mordants. Results demonstrated that LLR salt-free dyeing at 1:5 ratio with chitosan cationization and pomegranate peel bio-mordant achieved comparable color strength (K/S = 12.4) to conventional 1:15 dyeing (K/S = 12.8), while reducing water consumption by 67% and eliminating salt usage entirely. Wash fastness ratings of 4-5 and rub fastness of 4 were maintained. Energy consumption was reduced by 58% at 1:5 liquor ratio compared to conventional processing. This combined approach represents a significant advancement toward truly sustainable textile wet processing, addressing multiple environmental concerns simultaneously."
        );
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PenTool size={20} className="text-purple-500" />
          Paper Writer
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Step-by-step AI-assisted research paper writing
        </p>
      </div>

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
      {currentStep === 1 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              Step 1: Title Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Your Research Focus
              </label>
              <Input placeholder="e.g., Salt-free dyeing, Low liquor ratio, Bio-mordants..." />
            </div>
            <Button
              onClick={() => handleGenerate("title")}
              disabled={isGenerating}
              className="gap-2"
            >
              <Sparkles size={14} />
              {isGenerating ? "Generating..." : "Generate AI Title Suggestions"}
            </Button>
            {title && (
              <div className="space-y-3 mt-4">
                <h4 className="text-sm font-bold text-slate-700">
                  AI-Generated Title:
                </h4>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-800">{title}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Copy size={12} /> Copy
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
                <h4 className="text-sm font-bold text-slate-700 mt-4">
                  More Suggestions:
                </h4>
                {titleSuggestions.slice(1).map((t, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-lg p-3 hover:bg-slate-100 cursor-pointer transition-colors"
                    onClick={() => setTitle(t)}
                  >
                    <p className="text-xs text-slate-700">{t}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText size={16} className="text-blue-500" />
              Step 2: Abstract Writing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                <strong>Your Title:</strong> {title || "Please generate a title first"}
              </p>
            </div>
            <Button
              onClick={() => handleGenerate("abstract")}
              disabled={isGenerating || !title}
              className="gap-2"
            >
              <Sparkles size={14} />
              {isGenerating ? "Generating..." : "Generate AI Abstract"}
            </Button>
            {abstract && (
              <div className="space-y-3">
                <Textarea
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  rows={10}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy size={12} /> Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next: Literature Review <ChevronRight size={12} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep >= 3 && currentStep <= 7 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Step {currentStep}: {paperSteps[currentStep - 1].name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600">
                {currentStep === 3 &&
                  "Write your literature review covering the key papers in your research area. Cover: (1) Sustainable dyeing approaches, (2) Cationization methods, (3) Bio-mordant applications, (4) Low liquor ratio innovations. Cite at least 30-40 recent papers (2019-2026)."}
                {currentStep === 4 &&
                  "Detail your experimental methods: Materials (cotton fabric, cationizing agents, reactive dyes, bio-mordants), Cationization procedure, Dyeing process at various liquor ratios, Testing methods (K/S, CIELab, wash/rub/light fastness, FTIR)."}
                {currentStep === 5 &&
                  "Present your results with tables and figures. Include K/S values at different LR, fastness ratings, CIELab coordinates, FTIR spectra analysis, and statistical analysis (ANOVA). Compare with conventional dyeing."}
                {currentStep === 6 &&
                  "Summarize key findings: optimal LLR for salt-free dyeing, bio-mordant effectiveness, water/energy savings. State practical implications for the textile industry. Suggest future research directions."}
                {currentStep === 7 &&
                  "Format references in the journal's required style (APA/GB-T 7714). Ensure all 30-50 citations are complete and verified. Use reference management tools like Zotero or Mendeley."}
              </p>
            </div>
            <Textarea
              placeholder={`Start writing your ${paperSteps[currentStep - 1].name} here...`}
              rows={12}
              className="text-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Sparkles size={12} /> AI Assist
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Copy size={12} /> Copy
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
