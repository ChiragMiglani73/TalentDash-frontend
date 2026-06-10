"use client";

import { useState } from "react";


type RoleFilter =
  | "All"
  | "Software Engineer"
  | "Product Manager"
  | "Data Scientist"
  | "Designer"
  | "Marketing"
  | "Operations";

type SourceFilter =
  | "All"
  | "Applied Online"
  | "Referral"
  | "Recruiter Outreach"
  | "Campus";

type RoadmapStage = "resume" | "screen" | "technical" | "final" | "offer";

interface InterviewExperience {
  id: string;
  role: string;
  level: string;
  department: string;
  source: SourceFilter;
  date: string;
  stages: string[];
  outcome: "Offer" | "Rejected" | "Withdrawn" | "Pending";
  tips: string[];
  helpful: number;
}

interface Topic {
  id: string;
  name: string;
  count: number;
  roles: string[];
  color: string;
  bg: string;
  border: string;
  icon: string;
  description: string;
  trend: "up" | "stable" | "new";
}


const ROLE_CHIPS: { label: RoleFilter; icon: string }[] = [
  { label: "All", icon: "ti-layout-grid" },
  { label: "Software Engineer", icon: "ti-code" },
  { label: "Product Manager", icon: "ti-layout" },
  { label: "Data Scientist", icon: "ti-chart-dots" },
  { label: "Designer", icon: "ti-brush" },
  { label: "Marketing", icon: "ti-speakerphone" },
  { label: "Operations", icon: "ti-settings" },
];

const SOURCE_CHIPS: { label: SourceFilter; icon: string }[] = [
  { label: "All", icon: "ti-world" },
  { label: "Applied Online", icon: "ti-browser" },
  { label: "Referral", icon: "ti-user-plus" },
  { label: "Recruiter Outreach", icon: "ti-mail" },
  { label: "Campus", icon: "ti-school" },
];

const EXPERIENCES: InterviewExperience[] = [
  {
    id: "1",
    role: "Senior Software Engineer",
    level: "Senior",
    department: "Engineering",
    source: "Applied Online",
    date: "2d ago",
    stages: ["Recruiter Screen", "Technical", "System Design", "Behavioral", "Offer"],
    outcome: "Offer",
    tips: ["Study distributed systems", "Practice system design daily", "Prepare STAR stories"],
    helpful: 47,
  },
  {
    id: "2",
    role: "Product Manager",
    level: "Mid",
    department: "Product",
    source: "Referral",
    date: "5d ago",
    stages: ["Recruiter Screen", "Product Sense", "Execution", "Cross-functional", "Offer"],
    outcome: "Offer",
    tips: ["Bring a prioritization framework", "Have 2 product teardowns ready", "Know your metrics"],
    helpful: 31,
  },
  {
    id: "3",
    role: "Staff UX Designer",
    level: "Staff",
    department: "Design",
    source: "Recruiter Outreach",
    date: "1w ago",
    stages: ["Portfolio Review", "Design Challenge", "Presentation", "Culture Fit", "Offer"],
    outcome: "Offer",
    tips: ["Invest time in take-home", "Show iteration process", "Discuss failures openly"],
    helpful: 52,
  },
  {
    id: "4",
    role: "Data Scientist",
    level: "Mid",
    department: "Data",
    source: "Applied Online",
    date: "2w ago",
    stages: ["Recruiter Screen", "SQL Round", "Analytics Case", "Behavioral", "Rejected"],
    outcome: "Rejected",
    tips: ["Master window functions", "Practice A/B test design", "Communicate trade-offs"],
    helpful: 23,
  },
  {
    id: "5",
    role: "Marketing Manager",
    level: "Senior",
    department: "Marketing",
    source: "Campus",
    date: "3w ago",
    stages: ["Recruiter Screen", "Case Study", "Presentation", "Final Round", "Pending"],
    outcome: "Pending",
    tips: ["Bring campaign examples", "Know the company's brand voice", "Show data-driven creativity"],
    helpful: 18,
  },
];

const TOPICS: Topic[] = [
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    count: 34,
    roles: ["SWE"],
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "ti-code",
    description: "Arrays, trees, graphs, dynamic programming",
    trend: "up",
  },
  {
    id: "system",
    name: "System Design",
    count: 28,
    roles: ["SWE"],
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: "ti-server",
    description: "Scalability, databases, distributed systems",
    trend: "up",
  },
  {
    id: "behavioral",
    name: "Behavioral",
    count: 56,
    roles: ["All"],
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "ti-users",
    description: "STAR stories, leadership, conflict resolution",
    trend: "stable",
  },
  {
    id: "product",
    name: "Product Sense",
    count: 22,
    roles: ["PM"],
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "ti-bulb",
    description: "Prioritization, roadmap, metrics-driven decisions",
    trend: "up",
  },
  {
    id: "sql",
    name: "SQL & Databases",
    count: 19,
    roles: ["DS"],
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    icon: "ti-database",
    description: "Window functions, joins, query optimization",
    trend: "stable",
  },
  {
    id: "analytics",
    name: "Analytics & Metrics",
    count: 15,
    roles: ["DS", "PM"],
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "ti-chart-bar",
    description: "A/B testing, funnel analysis, experimentation",
    trend: "new",
  },
];

const ROADMAP = [
  { id: "resume", label: "Resume", icon: "ti-file-text", tip: "Highlight impact with metrics" },
  { id: "screen", label: "Recruiter Screen", icon: "ti-phone", tip: "Research the role deeply" },
  { id: "technical", label: "Technical Round", icon: "ti-code", tip: "Practice under time pressure" },
  { id: "final", label: "Final Round", icon: "ti-users", tip: "Prepare culture-fit stories" },
  { id: "offer", label: "Offer Negotiation", icon: "ti-currency-dollar", tip: "Know your market value" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#717171] mb-3">
      {children}
    </p>
  );
}

function Chip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border cursor-pointer transition-all whitespace-nowrap",
        active
          ? "bg-[#fff0f0] border-[#ffe3e4] text-[#ff5a5f] font-semibold"
          : "bg-white border-[#ebebeb] text-[#484848] hover:border-[#bbb] hover:bg-[#f2f2f2]",
      ].join(" ")}
    >
      <i className={`ti ${icon} text-[13px]`} aria-hidden="true" />
      {children}
    </button>
  );
}

function OutcomeBadge({ outcome }: { outcome: InterviewExperience["outcome"] }) {
  const styles = {
    Offer: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
    Withdrawn: "bg-gray-50 text-gray-600 border-gray-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const icons = { Offer: "✓", Rejected: "✕", Withdrawn: "—", Pending: "⏳" };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${styles[outcome]}`}>
      <span className="text-[10px]">{icons[outcome]}</span>
      {outcome}
    </span>
  );
}

function HeroSection() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-[22px] font-bold text-[#222] mb-1">Interview Preparation Hub</h2>
          <p className="text-[13px] text-[#717171] mb-4">
            Real experiences, curated resources, and structured tracks to help you land your next role.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-medium rounded-lg cursor-pointer transition-colors"
            >
              <i className="ti ti-pencil mr-1.5" aria-hidden="true" />
              Share your experience
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-transparent border border-[#ebebeb] hover:border-[#bbb] text-[#484848] text-[13px] font-medium rounded-lg cursor-pointer transition-colors"
            >
              <i className="ti ti-book mr-1.5" aria-hidden="true" />
              Browse prep tracks
            </button>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          {[
            { icon: "ti-message-circle", label: "Experiences", value: "124" },
            { icon: "ti-question-mark", label: "Questions", value: "340" },
            { icon: "ti-users", label: "Contributors", value: "89" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-3">
              <i className={`ti ${stat.icon} text-[20px] text-[#ff5a5f] mb-1 block`} aria-hidden="true" />
              <span className="text-[16px] font-bold text-[#222] block">{stat.value}</span>
              <span className="text-[10px] text-[#717171] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InterviewCard({ exp }: { exp: InterviewExperience }) {
  const [expanded, setExpanded] = useState(false);

  const deptColors: Record<string, string> = {
    Engineering: "bg-blue-100 text-blue-800",
    Product: "bg-emerald-100 text-emerald-800",
    Design: "bg-violet-100 text-violet-800",
    Data: "bg-amber-100 text-amber-800",
    Marketing: "bg-pink-100 text-pink-800",
    Operations: "bg-slate-100 text-slate-700",
  };

  const avatarColors: Record<string, string> = {
    Engineering: "bg-blue-100 text-blue-700",
    Product: "bg-emerald-100 text-emerald-700",
    Design: "bg-violet-100 text-violet-700",
    Data: "bg-amber-100 text-amber-700",
    Marketing: "bg-pink-100 text-pink-700",
    Operations: "bg-slate-100 text-slate-600",
  };

  const avatarColor = avatarColors[exp.department] || "bg-[#f2f2f2] text-[#717171]";

  return (
    <div className={`bg-white border rounded-2xl mb-3 overflow-hidden transition-all duration-200 ${
      expanded ? "border-[#d8d8d8] shadow-lg" : "border-[#e8e8e8] hover:border-[#cccccc] hover:shadow-md"
    }`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${avatarColor}`}>
            {exp.role.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="text-[16px] font-bold text-[#111]">{exp.role}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${deptColors[exp.department] || "bg-gray-100 text-gray-700"}`}>
                {exp.level}
              </span>
              <OutcomeBadge outcome={exp.outcome} />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#717171]">
                <i className="ti ti-world text-[13px]" aria-hidden="true" />
                {exp.source}
              </span>
              <span className="text-[#d0d0d0]">·</span>
              <span className="text-[12px] text-[#717171]">{exp.date}</span>
              <span className="text-[#d0d0d0]">·</span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#717171]">
                <i className="ti ti-checklist text-[13px]" aria-hidden="true" />
                {exp.stages.length} stages
              </span>
            </div>

            {!expanded && (
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {exp.stages.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#555] bg-[#f4f4f4] border border-[#e8e8e8] px-2.5 py-1 rounded-full">
                      {stage}
                    </span>
                    {i < exp.stages.length - 1 && (
                      <span className="text-[10px] text-[#ccc]">→</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-[13px] font-semibold text-[#ff5a5f] hover:text-[#e84a4f] cursor-pointer transition-colors flex-shrink-0 mt-0.5"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Hide" : "Details"}
            <i className={`ti ${expanded ? "ti-chevron-up" : "ti-chevron-down"} text-[12px]`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-[#f0f0f0]">
          <div className="mt-4 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#aaa] mb-2.5">Interview stages</p>
            <div className="flex items-center gap-2 flex-wrap">
              {exp.stages.map((stage, i) => (
                <span key={stage} className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#333] bg-[#f7f7f7] border border-[#e8e8e8] px-3 py-1.5 rounded-full">
                    <span className="w-4 h-4 rounded-full bg-[#e0e0e0] text-[9px] font-bold text-[#666] flex items-center justify-center">{i + 1}</span>
                    {stage}
                  </span>
                  {i < exp.stages.length - 1 && (
                    <i className="ti ti-arrow-right text-[11px] text-[#ccc]" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#fffbf0] border border-[#f0e8c8] rounded-xl p-4 mb-3">
            <p className="text-[11px] font-semibold text-[#8a7540] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <i className="ti ti-bulb text-[#ffb400] text-[13px]" aria-hidden="true" />
              Key tips from this candidate
            </p>
            <div className="flex flex-col gap-2">
              {exp.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-2 text-[13px] text-[#555]">
                  <span className="text-[#ffb400] text-[10px] mt-1 flex-shrink-0">●</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#717171] hover:text-[#ff5a5f] transition-colors cursor-pointer bg-[#f7f7f7] hover:bg-[#fff0f0] border border-[#ebebeb] hover:border-[#ffe3e4] px-3 py-1.5 rounded-lg"
            >
              <i className="ti ti-thumb-up text-[13px]" aria-hidden="true" />
              Helpful ({exp.helpful})
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#717171] hover:text-[#222] transition-colors cursor-pointer bg-[#f7f7f7] hover:bg-[#efefef] border border-[#ebebeb] px-3 py-1.5 rounded-lg"
            >
              <i className="ti ti-bookmark text-[13px]" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const TOPIC_EXTRAS: Record<string, { what: string; tip: string }> = {
  dsa: {
    what: "Arrays, trees, graphs, dynamic programming, recursion",
    tip: "Practice timed problems on LeetCode — consistency beats cramming",
  },
  system: {
    what: "Scalability, load balancing, databases, caching, microservices",
    tip: "Draw every design out loud — interviewers care about your reasoning",
  },
  behavioral: {
    what: "Leadership, conflict, cross-functional collaboration, growth mindset",
    tip: "Prepare 5 core STAR stories that flex across multiple question types",
  },
  product: {
    what: "Roadmap prioritization, user empathy, trade-off decisions, metrics",
    tip: "Lead with the user problem, not the solution — every time",
  },
  sql: {
    what: "Window functions, CTEs, query optimization, joins, aggregations",
    tip: "Master window functions — they appear in nearly every DS interview",
  },
  analytics: {
    what: "A/B testing, funnel analysis, cohort analysis, experimentation design",
    tip: "Always define success metrics before diving into the analysis",
  },
};

function TopicsSection() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const trendLabel: Record<string, { label: string; cls: string }> = {
    up: { label: "↑ Trending", cls: "text-green-600 bg-green-50 border-green-200" },
    stable: { label: "→ Consistent", cls: "text-slate-500 bg-slate-50 border-slate-200" },
    new: { label: "✦ Rising", cls: "text-violet-600 bg-violet-50 border-violet-200" },
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4">
      <SectionLabel>Most discussed topics</SectionLabel>

      <div className="flex flex-col gap-2">
        {TOPICS.map((topic, idx) => {
          const isActive = activeTopic === topic.id;
          const trend = trendLabel[topic.trend];
          const extra = TOPIC_EXTRAS[topic.id];

          return (
            <div
              key={topic.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTopic(isActive ? null : topic.id)}
              onKeyDown={(e) => e.key === "Enter" && setActiveTopic(isActive ? null : topic.id)}
              className={[
                "text-left w-full rounded-xl border transition-all duration-200 cursor-pointer group",
                isActive
                  ? `${topic.bg} ${topic.border} shadow-sm`
                  : "border-[#ebebeb] bg-white hover:border-[#d8d8d8] hover:bg-[#fafafa]",
              ].join(" ")}
            >
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-[#ccc] w-5 flex-shrink-0 text-right tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[14px] font-bold ${isActive ? topic.color : "text-[#222] group-hover:text-[#111]"} transition-colors`}>
                        {topic.name}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${trend.cls}`}>
                        {trend.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#999] truncate">{topic.description}</p>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    {topic.roles.map(r => (
                      <span key={r} className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${isActive ? `${topic.color} ${topic.border} ${topic.bg}` : "text-[#717171] bg-[#f0f0f0] border-[#e5e5e5]"}`}>
                        {r}
                      </span>
                    ))}
                  </div>

                  <i className={`ti ${isActive ? "ti-chevron-up" : "ti-chevron-down"} text-[11px] text-[#bbb] flex-shrink-0 transition-transform`} aria-hidden="true" />
                </div>

                {isActive && extra && (
                  <div className="mt-3 ml-8 space-y-2.5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#aaa] mb-1">What's covered</p>
                      <p className="text-[12px] text-[#555] leading-relaxed">{extra.what}</p>
                    </div>
                    <div className={`flex items-start gap-2 ${topic.bg} border ${topic.border} rounded-lg px-3 py-2.5`}>
                      <span className="text-[#ffb400] text-[11px] mt-0.5 flex-shrink-0">💡</span>
                      <p className={`text-[12px] font-medium ${topic.color} leading-snug`}>{extra.tip}</p>
                    </div>
                    <span className={`text-[11px] font-semibold ${topic.color} hover:underline underline-offset-2 cursor-pointer transition-all`}>
                      Explore related experiences →
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function RoadmapSection() {
  const [activeStage, setActiveStage] = useState<RoadmapStage>("resume");

  const stageContent: Record<RoadmapStage, { title: string; items: string[] }> = {
    resume: {
      title: "Build a standout resume",
      items: [
        "Quantify impact with metrics (e.g., 'increased conversion by 24%')",
        "Tailor to the role — highlight relevant skills first",
        "Keep to 1 page for junior roles, 2 pages max for senior",
        "Use action verbs: built, designed, led, shipped",
      ],
    },
    screen: {
      title: "Ace the recruiter screen",
      items: [
        "Research the company, product, and recent news",
        "Prepare a 2-minute pitch about your background",
        "Have 3–5 thoughtful questions ready",
        "Clarify role expectations and timeline",
      ],
    },
    technical: {
      title: "Crush the technical round",
      items: [
        "Practice under timed conditions (LeetCode, mock interviews)",
        "Think out loud — interviewers care about your process",
        "Test edge cases before declaring your solution done",
        "Ask for hints if stuck — collaboration is valued",
      ],
    },
    final: {
      title: "Close strong in the final round",
      items: [
        "Prepare 3–5 STAR-format stories for behavioral questions",
        "Align your values with the company's mission",
        "Ask about team culture and growth opportunities",
        "Send a thoughtful thank-you note within 24 hours",
      ],
    },
    offer: {
      title: "Negotiate with confidence",
      items: [
        "Know your market value using TalentDash salary data",
        "Consider total comp: base, equity, bonus, benefits",
        "Get the offer in writing before making decisions",
        "Be prepared to walk away if the fit isn't right",
      ],
    },
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4">
      <SectionLabel>Preparation roadmap</SectionLabel>
      <div className="flex gap-1.5 mb-4">
        {ROADMAP.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveStage(stage.id as RoadmapStage)}
            className={[
              "flex-1 text-center py-2.5 px-2 rounded-lg border cursor-pointer transition-all",
              activeStage === stage.id
                ? "bg-[#fff0f0] border-[#ffe3e4] text-[#ff5a5f]"
                : "bg-white border-[#ebebeb] text-[#484848] hover:border-[#d0d0d0]",
            ].join(" ")}
          >
            <i className={`ti ${stage.icon} text-[16px] mb-1 block`} aria-hidden="true" />
            <span className="text-[11px] font-semibold block">{stage.label}</span>
            <span className="text-[10px] text-[#717171] block mt-0.5">{stage.tip}</span>
          </button>
        ))}
      </div>
      <div className="bg-[#f7f7f7] rounded-lg p-4">
        <h4 className="text-[14px] font-semibold text-[#222] mb-2">
          {stageContent[activeStage].title}
        </h4>
        <ul className="space-y-1.5">
          {stageContent[activeStage].items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-[#484848]">
              <i className="ti ti-check text-[#008a05] text-[13px] mt-0.5 flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function SidebarProCard() {
  return (
    <div className="bg-white border border-[#ebebeb] border-l-[3px] border-l-[#ff5a5f] rounded-xl p-4">
      <div className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider bg-[#ff5a5f] text-white px-2.5 py-0.5 rounded-full mb-2">
        <i className="ti ti-crown text-[10px]" aria-hidden="true" />
        PRO
      </div>
      <h4 className="text-[13px] font-semibold text-[#222] mb-1">TalentDash Pro</h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Unlock salary bands, recruiter contacts, and application tracking.
      </p>
      {[
        "Full salary data by level & location",
        "Direct recruiter messaging",
        "Application status tracker",
        "AI resume & cover letter tailoring",
      ].map((f, i) => (
        <div key={f} className={`flex items-center gap-1.5 text-[12px] text-[#484848] py-1 ${i < 3 ? "border-b border-[#ebebeb]" : ""}`}>
          <i className="ti ti-check text-[13px] text-green-600" aria-hidden="true" />
          {f}
        </div>
      ))}
      <button type="button" className="w-full mt-3 py-2 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[12px] font-semibold rounded-lg cursor-pointer transition-colors">
        Upgrade to Pro
      </button>
    </div>
  );
}

function SidebarToolkitCard() {
  const tools = [
    { icon: "ti-file-text", label: "STAR worksheet", color: "text-blue-600" },
    { icon: "ti-server", label: "System design primer", color: "text-indigo-600" },
    { icon: "ti-question-mark", label: "Behavioral bank", color: "text-amber-600" },
    { icon: "ti-currency-dollar", label: "Negotiation script", color: "text-green-600" },
  ];

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-tool text-[14px] text-[#0369a1]" aria-hidden="true" />
        Interview Toolkit
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Downloadable resources to accelerate your prep.
      </p>
      <div className="space-y-1">
        {tools.map((tool, i) => (
          <div key={tool.label} className={`flex items-center gap-2 text-[12px] text-[#484848] py-1.5 cursor-pointer hover:bg-[#f7f7f7] rounded px-1 transition-colors ${i < 3 ? "border-b border-[#ebebeb]" : ""}`}>
            <i className={`ti ${tool.icon} text-[14px] ${tool.color}`} aria-hidden="true" />
            <span className="flex-1">{tool.label}</span>
            <i className="ti ti-download text-[12px] text-[#717171]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarPrepCard() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-book text-[14px] text-[#0369a1]" aria-hidden="true" />
        Prep Resources
      </h4>
      <div className="space-y-2 mt-2">
        {[
          { title: "Resume best practices", desc: "Impact-driven formatting tips", icon: "ti-file-text", color: "bg-blue-50 text-blue-600" },
          { title: "Interview prep guides", desc: "Role-specific frameworks", icon: "ti-book", color: "bg-green-50 text-green-600" },
          { title: "Candidate playbook", desc: "Follow-up & negotiation tactics", icon: "ti-star", color: "bg-amber-50 text-amber-600" },
        ].map((r) => (
          <div key={r.title} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#f7f7f7] cursor-pointer transition-colors">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${r.color}`}>
              <i className={`ti ${r.icon} text-[13px]`} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#222] leading-snug">{r.title}</p>
              <p className="text-[11px] text-[#717171]">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarAlertCard() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("all");

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-bell text-[14px] text-[#ff5a5f]" aria-hidden="true" />
        Interview Alerts
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Get notified when new experiences are shared.
      </p>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-2.5 py-1.5 border border-[#ebebeb] rounded-md text-[12px] text-[#222] bg-white outline-none mb-2"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-2 py-1.5 border border-[#ebebeb] rounded-md text-[12px] text-[#222] bg-white outline-none mb-2"
      >
        <option value="all">All roles</option>
        <option value="swe">Software Engineer</option>
        <option value="pm">Product Manager</option>
        <option value="ds">Data Scientist</option>
        <option value="design">Designer</option>
      </select>
      <button type="button" className="w-full py-2 bg-[#222] hover:bg-[#333] text-white text-[12px] font-semibold rounded-lg cursor-pointer transition-colors">
        Set alert
      </button>
    </div>
  );
}

function AdPlaceholder() {
  return (
    <div className="bg-[#f2f2f2] border border-dashed border-[#d0d0d0] rounded-lg p-6 text-center text-[#717171] text-[11px]">
      <i className="ti ti-ad-2 text-[22px] block mb-1.5 opacity-40" aria-hidden="true" />
      Advertisement
    </div>
  );
}


export default function InterviewsPage() {
  const [activeRole, setActiveRole] = useState<RoleFilter>("All");
  const [activeSource, setActiveSource] = useState<SourceFilter>("All");
  const [search, setSearch] = useState("");

  const filtered = EXPERIENCES.filter((exp) => {
    const matchesRole = activeRole === "All" || exp.role.includes(activeRole.split(" ")[0]);
    const matchesSource = activeSource === "All" || exp.source === activeSource;
    const matchesSearch = !search.trim() || exp.role.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSource && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-[1fr_260px] gap-5 max-w-[1100px]">
        <main>
          <HeroSection />

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Search experiences, roles, or topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3.5 py-2.5 border border-[#ebebeb] rounded-lg text-[13px] text-[#222] bg-white outline-none focus:border-[#ccc]"
            />
            <button type="button" className="flex items-center gap-1.5 px-4 py-2.5 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-medium rounded-lg cursor-pointer transition-colors whitespace-nowrap">
              <i className="ti ti-search" aria-hidden="true" />
              Search
            </button>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-2">
            {ROLE_CHIPS.map((c) => (
              <Chip key={c.label} active={activeRole === c.label} onClick={() => setActiveRole(c.label)} icon={c.icon}>
                {c.label}
              </Chip>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap mb-5">
            {SOURCE_CHIPS.map((c) => (
              <Chip key={c.label} active={activeSource === c.label} onClick={() => setActiveSource(c.label)} icon={c.icon}>
                {c.label}
              </Chip>
            ))}
          </div>

          <SectionLabel>Interview experiences</SectionLabel>
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#717171] bg-white border border-[#ebebeb] rounded-xl p-8 mb-2.5">
              <i className="ti ti-search-off text-[18px]" aria-hidden="true" />
              No experiences match your filters.
            </div>
          ) : (
            filtered.map((exp) => <InterviewCard key={exp.id} exp={exp} />)
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-[#717171] bg-[#f2f2f2] border border-dashed border-[#d0d0d0] rounded-md px-2.5 py-2 mt-2 mb-5">
            <i className="ti ti-info-circle text-[14px]" aria-hidden="true" />
            More experiences will appear as candidates share their stories. Submit yours to help the community.
          </div>

          <TopicsSection />
          <RoadmapSection />
        </main>

        {/* ── Sidebar ── */}
        <aside className="flex flex-col gap-3.5">
          <SidebarProCard />
          <SidebarToolkitCard />
          <SidebarPrepCard />
          <SidebarAlertCard />
          <AdPlaceholder />
        </aside>
      </div>
    </div>
  );
}