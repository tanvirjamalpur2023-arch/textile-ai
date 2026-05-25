# TextileAI - AI Research Co-Pilot for Textile Engineering

An AI-powered research assistant built for BSc Textile Engineering students specializing in Wet Processing / Chemical Processing. Helps find research papers, identify research gaps, write papers step-by-step, and acts as an intelligent co-pilot throughout your research journey.

## Features

- **Research Monitor** — Search and discover world wet processing papers, sorted by citation count, with AI-powered analysis
- **Research Gap Finder** — AI-driven gap analysis that identifies specific, publishable research gaps in textile wet processing
- **Paper Writer** — Step-by-step research paper writing assistant (Title, Abstract, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion)
- **AI Co-Pilot** — Interactive co-pilot that assigns tasks, detects errors, provides step-by-step guidance, brainstorms ideas, reviews work, and improves writing
- **Publication Guide** — Journal recommendations, impact factors, and publication strategy for textile research
- **Trend Analysis** — Interactive charts showing research trends, country-wise activity, and emerging topics
- **My Research** — Personal notes and research management workspace

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: Zustand
- **AI**: OpenAI-compatible API (supports GPT, DeepSeek, etc.)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/textile-ai.git
cd textile-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required for AI features
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-3.5-turbo

# Or use any OpenAI-compatible API (DeepSeek, Together AI, etc.)
# OPENAI_API_KEY=your-api-key
# OPENAI_BASE_URL=https://api.deepseek.com/v1
# AI_MODEL=deepseek-chat
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy this app permanently:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "New Project" → Import your GitHub repo
4. Add environment variables in Vercel Dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL` (default: `https://api.openai.com/v1`)
   - `AI_MODEL` (default: `gpt-3.5-turbo`)
5. Click "Deploy" — your app will be live permanently!

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI Chat API
│   │   ├── search/route.ts        # Paper Search API
│   │   ├── recommend/route.ts     # Research Gap API
│   │   └── paper-writer/route.ts  # Paper Writing API
│   ├── layout.tsx
│   ├── page.tsx                   # Dashboard
│   └── globals.css
├── components/
│   ├── Sidebar.tsx
│   ├── DashboardPage.tsx
│   ├── ResearchMonitorPage.tsx
│   ├── TopicRecommenderPage.tsx   # Research Gap Finder
│   ├── PaperWriterPage.tsx
│   ├── AICopilotPage.tsx
│   ├── PublicationGuidePage.tsx
│   ├── TrendAnalysisPage.tsx
│   ├── MyResearchPage.tsx
│   ├── charts/                    # Recharts components
│   └── ui/                        # shadcn/ui components
└── lib/
    ├── ai.ts                      # AI helper (OpenAI-compatible)
    ├── store.ts                   # Zustand store
    └── utils.ts
```

## License

MIT
