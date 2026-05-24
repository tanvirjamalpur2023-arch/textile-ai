"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";

const journals = [
  {
    name: "Journal of Cleaner Production",
    publisher: "Elsevier",
    if: 11.1,
    scope: "Sustainable processing, green chemistry, waste reduction",
    bscFit: "Moderate — needs strong novelty",
    reviewTime: "3-6 months",
    openAccess: false,
    safe: true,
  },
  {
    name: "Green Chemistry",
    publisher: "RSC",
    if: 10.2,
    scope: "Bio-based chemicals, green synthesis, sustainable reactions",
    bscFit: "Hard — prefers chemistry focus",
    reviewTime: "2-4 months",
    openAccess: false,
    safe: true,
  },
  {
    name: "Cellulose",
    publisher: "Springer",
    if: 4.9,
    scope: "Cellulose chemistry, fiber processing, nanocellulose",
    bscFit: "Yes — welcomes fiber dyeing studies",
    reviewTime: "2-4 months",
    openAccess: false,
    safe: true,
  },
  {
    name: "Dyes and Pigments",
    publisher: "Elsevier",
    if: 4.2,
    scope: "Dye chemistry, coloration, fastness, wastewater",
    bscFit: "Yes — good for dyeing studies",
    reviewTime: "2-3 months",
    openAccess: false,
    safe: true,
  },
  {
    name: "Molecules",
    publisher: "MDPI",
    if: 4.2,
    scope: "Bio-based auxiliaries, chemical characterization",
    bscFit: "Very Yes — fast review, BSc-friendly",
    reviewTime: "1-2 months",
    openAccess: true,
    safe: true,
  },
  {
    name: "Sustainability",
    publisher: "MDPI",
    if: 3.9,
    scope: "Sustainable processing, LCA, circular economy",
    bscFit: "Very Yes — high acceptance rate",
    reviewTime: "1-2 months",
    openAccess: true,
    safe: true,
  },
  {
    name: "Journal of Natural Fibers",
    publisher: "Taylor & Francis",
    if: 3.1,
    scope: "Natural dyes, bio-mordants, natural fiber processing",
    bscFit: "Very Yes — ideal for natural dye work",
    reviewTime: "2-4 months",
    openAccess: false,
    safe: true,
  },
  {
    name: "Textile Research Journal",
    publisher: "SAGE",
    if: 1.9,
    scope: "General textile science, wet processing, dyeing",
    bscFit: "Very Yes — broad scope, BSc accessible",
    reviewTime: "2-4 months",
    openAccess: false,
    safe: true,
  },
];

const predatoryWarning = [
  "Always check Beall's List before submitting",
  "Verify journal is indexed in Scopus/Web of Science",
  "Avoid journals with < 1.0 IF that charge high APC",
  "Check if journal appears in your university's approved list",
  "Legitimate journals NEVER guarantee acceptance before submission",
];

export default function PublicationGuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-500" />
          Publication Guide
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Journal selection, scope matching, and submission strategy
        </p>
      </div>

      {/* Predatory Journal Warning */}
      <Card className="border-0 shadow-sm bg-red-50 border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <h3 className="text-sm font-bold text-red-700 flex items-center gap-2 mb-2">
            <Shield size={16} />
            Avoid Predatory Journals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {predatoryWarning.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-red-700"
              >
                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
                {w}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journal Table */}
      <div className="space-y-3">
        {journals.map((j) => (
          <Card key={j.name} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-800">
                      {j.name}
                    </h3>
                    {j.safe && (
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />
                    )}
                    {j.openAccess && (
                      <Badge className="bg-blue-50 text-blue-700 text-[10px]">
                        Open Access
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{j.publisher}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Scope:</strong> {j.scope}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-500" />
                    <span className="text-lg font-bold text-slate-800">
                      {j.if}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Impact Factor</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <Badge
                  className={`text-[10px] ${
                    j.bscFit.includes("Very")
                      ? "bg-emerald-50 text-emerald-700"
                      : j.bscFit.includes("Yes")
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  BSc Fit: {j.bscFit}
                </Badge>
                <span className="text-xs text-slate-500">
                  Review: {j.reviewTime}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
