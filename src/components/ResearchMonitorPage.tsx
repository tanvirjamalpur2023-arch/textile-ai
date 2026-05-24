"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ExternalLink,
  Filter,
  Bookmark,
  Calendar,
  BookOpen,
} from "lucide-react";

const mockPapers = [
  {
    title:
      "Salt-Free Dyeing of Cotton via Graft Polymerization with Chitosan Using Dimethyl Itaconate",
    authors: "Majeed A., Carmenini R., Comes M. et al.",
    journal: "RSC Advances",
    year: 2025,
    tags: ["Salt-Free", "Cationization", "Chitosan"],
    abstract:
      "A renewable cross-linker (dimethyl itaconate) combined with chitosan graft for cationization enables salt-free reactive dyeing of cotton with excellent color strength and fastness properties.",
    citations: 23,
    bscFeasible: true,
  },
  {
    title:
      "Cleaner Cationization of Cotton Fabrics by Reusing Modification Bath",
    authors: "Liu X. et al.",
    journal: "Journal of Cleaner Production",
    year: 2024,
    tags: ["Sustainable", "Bath Reuse", "Cationization"],
    abstract:
      "Reusing the CHPTAC modification bath cuts chemical consumption by 97.98% and dyeing chemical use by 71.02%, representing a major advance in sustainable textile processing.",
    citations: 41,
    bscFeasible: true,
  },
  {
    title:
      "Reducing Water and Energy in Sustainable Cotton Dyeing Using Low Liquor Ratio Process",
    authors: "Elahi A., Islam M.I. et al.",
    journal: "Discover Chemistry (Springer)",
    year: 2026,
    tags: ["LLR Dyeing", "Energy Saving", "Water Reduction"],
    abstract:
      "First systematic study of LLR cotton dyeing at ratios as low as 1:3; demonstrated that 1:3 ratio consumed only 2.5-3.7 KJ energy while maintaining dyeing quality across all dye classes.",
    citations: 8,
    bscFeasible: true,
  },
  {
    title:
      "New Combination of Bio-Mordant from Agriculture Waste for Eco-Dyeing of Wool Yarns",
    authors: "Hosseinnezhad M., Gharanjig K. et al.",
    journal: "Research Journal of Textile and Apparel",
    year: 2024,
    tags: ["Bio-Mordant", "Natural Dyes", "Agricultural Waste"],
    abstract:
      "First study combining walnut husk and pomegranate peel bio-mordants from agricultural waste for wool dyeing with Reseda and Madder natural dyes.",
    citations: 15,
    bscFeasible: true,
  },
  {
    title:
      "A Review of Deep Learning and Artificial Intelligence in Dyeing, Printing and Finishing",
    authors: "Various",
    journal: "Textile Research Journal",
    year: 2024,
    tags: ["AI/ML", "Dyeing", "Review"],
    abstract:
      "First comprehensive review specifically targeting AI applications in wet processing — color prediction, recipe optimization, defect detection, and process control.",
    citations: 67,
    bscFeasible: false,
  },
  {
    title:
      "Eco-Friendly Antimicrobial and UV Protection Finishing Using Tulsi (Ocimum sanctum)",
    authors: "Rohit J.K., Shah J.N.",
    journal: "Int. J. Scientific Research",
    year: 2024,
    tags: ["Functional Finishing", "Plant Extract", "Antimicrobial"],
    abstract:
      "Simple plant-extract-based finishing using Tulsi on cotton and bamboo fabric achieves both antimicrobial and UV protection without nanoparticles.",
    citations: 12,
    bscFeasible: true,
  },
  {
    title: "Foam Dyeing: A Review of Its Potential to Reshape Sustainable Textile Processing",
    authors: "Various",
    journal: "Textile Research Journal",
    year: 2025,
    tags: ["Foam Dyeing", "Waterless", "Sustainable"],
    abstract:
      "Replaces water with air as dye transfer medium; 80-95% water reduction; called the most practical sustainable dyeing alternative for industrial adoption.",
    citations: 19,
    bscFeasible: false,
  },
  {
    title:
      "Self-Powered Smart Textiles: A Comprehensive Review of TENG and PENG Technologies",
    authors: "Various",
    journal: "Journal of Energy Storage",
    year: 2025,
    tags: ["Smart Textile", "TENG", "Wearable"],
    abstract:
      "Reviews triboelectric and piezoelectric nanogenerators integrated into textiles for self-powering wearable electronics and health monitoring.",
    citations: 34,
    bscFeasible: false,
  },
];

export default function ResearchMonitorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(mockPapers.flatMap((p) => p.tags))
  ).sort();

  const filteredPapers = mockPapers.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Search size={20} className="text-emerald-500" />
          Research Monitor
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Search and track the latest textile research papers worldwide
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            placeholder="Search papers by title, keyword, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={14} />
          Filter
        </Button>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedTag === null ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setSelectedTag(null)}
        >
          All Papers
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "secondary"}
            className="cursor-pointer hover:bg-emerald-50"
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Papers List */}
      <div className="space-y-3">
        {filteredPapers.map((paper, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {paper.authors}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <BookOpen size={12} className="text-slate-400" />
                    <span className="text-xs font-medium text-blue-600">
                      {paper.journal}
                    </span>
                    <Calendar size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{paper.year}</span>
                    <span className="text-xs text-slate-400">
                      Cited: {paper.citations}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {paper.abstract}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {paper.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 bg-slate-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {paper.bscFeasible && (
                      <Badge className="text-[10px] px-1.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                        BSc Feasible
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 text-slate-400"
                >
                  <Bookmark size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
