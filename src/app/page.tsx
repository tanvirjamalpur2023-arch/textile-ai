"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/DashboardPage";
import ResearchMonitorPage from "@/components/ResearchMonitorPage";
import TopicRecommenderPage from "@/components/TopicRecommenderPage";
import PaperWriterPage from "@/components/PaperWriterPage";
import PublicationGuidePage from "@/components/PublicationGuidePage";
import AICopilotPage from "@/components/AICopilotPage";
import TrendAnalysisPage from "@/components/TrendAnalysisPage";
import MyResearchPage from "@/components/MyResearchPage";
import { useAppStore } from "@/lib/store";

const pageComponents: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  "research-monitor": ResearchMonitorPage,
  "topic-recommender": TopicRecommenderPage,
  "paper-writer": PaperWriterPage,
  "publication-guide": PublicationGuidePage,
  "ai-copilot": AICopilotPage,
  "trend-analysis": TrendAnalysisPage,
  "my-research": MyResearchPage,
};

export default function Home() {
  const { currentPage, sidebarOpen } = useAppStore();
  const PageComponent = pageComponents[currentPage] || DashboardPage;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="p-6 max-w-7xl mx-auto">
            <PageComponent />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
