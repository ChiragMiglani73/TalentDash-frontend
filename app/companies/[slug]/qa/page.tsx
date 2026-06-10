"use client";

import { useState } from "react";


type TopicFilter =
  | "All Topics"
  | "Interviews"
  | "Salaries"
  | "Benefits"
  | "Culture"
  | "Work-Life Balance"
  | "Career Growth"
  | "Hiring Process"
  | "Remote Work";

interface Question {
  id: string;
  title: string;
  topic: TopicFilter;
  preview: string;
  answerPreview: string;
  author: string;
  authorRole: string;
  date: string;
  answers: { author: string; role: string; body: string; date: string }[];
  saved: boolean;
}


const TOPIC_CHIPS: { label: TopicFilter; icon: string }[] = [
  { label: "All Topics", icon: "ti-layout-grid" },
  { label: "Interviews", icon: "ti-message-circle" },
  { label: "Salaries", icon: "ti-currency-dollar" },
  { label: "Benefits", icon: "ti-heart" },
  { label: "Culture", icon: "ti-users" },
  { label: "Work-Life Balance", icon: "ti-sun" },
  { label: "Career Growth", icon: "ti-trending-up" },
  { label: "Hiring Process", icon: "ti-briefcase" },
  { label: "Remote Work", icon: "ti-world" },
];

const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Interviews: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Salaries: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Benefits: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  Culture: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Work-Life Balance": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Career Growth": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Hiring Process": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "Remote Work": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
};

const QUESTIONS: Question[] = [
  {
    id: "1",
    title: "What does the final round interview typically cover?",
    topic: "Interviews",
    preview: "I'm preparing for the final round and want to understand what to expect in terms of format, duration, and who I'll be meeting with.",
    answerPreview: "The final round is usually a 3-hour panel with 4–5 interviewers across different functions. Expect a mix of behavioral, culture-fit, and a deep dive into your domain expertise.",
    author: "Current Employee",
    authorRole: "Engineering",
    date: "2d ago",
    answers: [
      {
        author: "Senior Engineer",
        role: "Engineering",
        body: "The final round is usually a 3-hour panel with 4–5 interviewers across different functions. Expect a mix of behavioral, culture-fit, and a deep dive into your domain expertise. My panel included the hiring manager, a peer engineer, a PM, and a director. Each session was 45 minutes with a 15-minute break in between.",
        date: "2d ago",
      },
      {
        author: "Former Candidate",
        role: "Product",
        body: "I had a similar structure for the PM role. The culture-fit portion was surprisingly thorough — they asked about values alignment and how I handle disagreements with leadership.",
        date: "1d ago",
      },
    ],
    saved: false,
  },
  {
    id: "2",
    title: "How are salary bands determined for senior IC roles?",
    topic: "Salaries",
    preview: "Curious about the compensation structure for Staff+ engineers and how it compares to market rates in the Bay Area.",
    answerPreview: "Bands are set by level and location, with a 15% premium for senior ICs. Total comp includes base, equity refreshers, and a performance bonus.",
    author: "Current Employee",
    authorRole: "People Ops",
    date: "5d ago",
    answers: [
      {
        author: "People Ops Lead",
        role: "People Ops",
        body: "Bands are set by level and location, with a 15% premium for senior ICs. Total comp includes base, equity refreshers, and a performance bonus. We benchmark against Radford and Option Impact data quarterly.",
        date: "5d ago",
      },
    ],
    saved: false,
  },
  {
    id: "3",
    title: "What's the parental leave policy like in practice?",
    topic: "Benefits",
    preview: "I've seen the policy on paper but want to hear from people who've actually taken leave. Is it truly supportive?",
    answerPreview: "16 weeks fully paid for all parents, plus a gradual return-to-work program. The team covers your workload without making you feel guilty.",
    author: "Current Employee",
    authorRole: "Design",
    date: "1w ago",
    answers: [
      {
        author: "Designer",
        role: "Design",
        body: "16 weeks fully paid for all parents, plus a gradual return-to-work program. The team covers your workload without making you feel guilty. I took 14 weeks and my manager encouraged me to take the full time.",
        date: "1w ago",
      },
    ],
    saved: false,
  },
  {
    id: "4",
    title: "How does the company handle internal mobility?",
    topic: "Career Growth",
    preview: "I'm interested in potentially moving from Engineering to Product. Is there a formal process or is it relationship-driven?",
    answerPreview: "There's a formal 'Talent Marketplace' program where you can express interest in other teams. Most successful transitions happen through a 3-month rotation first.",
    author: "Current Employee",
    authorRole: "Product",
    date: "3d ago",
    answers: [
      {
        author: "Product Manager",
        role: "Product",
        body: "There's a formal 'Talent Marketplace' program where you can express interest in other teams. Most successful transitions happen through a 3-month rotation first. I moved from Engineering to Product this way — the process took about 6 months total but felt very supported.",
        date: "3d ago",
      },
    ],
    saved: false,
  },
  {
    id: "5",
    title: "Is the remote work policy flexible or strictly enforced?",
    topic: "Remote Work",
    preview: "I see 'hybrid' on the job description but want to know how much flexibility there actually is day-to-day.",
    answerPreview: "Most teams are 2–3 days in office, but it's team-dependent. The policy is 'outcome-based' rather than prescriptive.",
    author: "Current Employee",
    authorRole: "Engineering",
    date: "4d ago",
    answers: [
      {
        author: "Engineering Manager",
        role: "Engineering",
        body: "Most teams are 2–3 days in office, but it's team-dependent. Some fully distributed teams exist. The policy is 'outcome-based' rather than prescriptive. My team does Tuesdays and Thursdays in-office, but flexibility is the norm.",
        date: "4d ago",
      },
    ],
    saved: false,
  },
  {
    id: "6",
    title: "What is the promotion cycle and how are decisions made?",
    topic: "Career Growth",
    preview: "Trying to understand the review process, calibration, and what actually drives promotion decisions here.",
    answerPreview: "Twice-yearly review cycles with a calibration committee. Promotions are based on demonstrated impact, not tenure.",
    author: "Current Employee",
    authorRole: "Engineering",
    date: "1w ago",
    answers: [
      {
        author: "Staff Engineer",
        role: "Engineering",
        body: "Twice-yearly review cycles with a calibration committee. Promotions are based on demonstrated impact, not tenure. You need a sponsor and a strong packet documenting specific projects, metrics, and peer feedback.",
        date: "1w ago",
      },
    ],
    saved: false,
  },
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

function TopicBadge({ topic }: { topic: TopicFilter }) {
  const style = TOPIC_COLORS[topic] ?? { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
      {topic}
    </span>
  );
}


function HeroSection() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-[22px] font-bold text-[#222] mb-1">Company Q&A</h2>
          <p className="text-[13px] text-[#717171] mb-4">
            Ask questions, share experiences, and get honest answers from employees and candidates.
          </p>
          <div className="flex gap-2">
            <button type="button" className="px-4 py-2 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-medium rounded-lg cursor-pointer transition-colors">
              <i className="ti ti-plus mr-1.5" aria-hidden="true" />
              Ask a question
            </button>
            <button type="button" className="px-4 py-2 bg-transparent border border-[#ebebeb] hover:border-[#bbb] text-[#484848] text-[13px] font-medium rounded-lg cursor-pointer transition-colors">
              <i className="ti ti-search mr-1.5" aria-hidden="true" />
              Browse topics
            </button>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {[
            { icon: "ti-question-mark", label: "Questions", value: "—" },
            { icon: "ti-message", label: "Discussions", value: "—" },
            { icon: "ti-users", label: "Contributors", value: "—" },
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


function AskCommunitySection() {
  return (
    <div className="bg-white border border-[#ebebeb] border-l-[3px] border-l-[#ff5a5f] rounded-xl p-5 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-[#111] mb-1">Ask the community</h3>
          <p className="text-[13px] text-[#717171] leading-relaxed">
            Have a question about interviews, culture, or career growth? Ask anonymously and get honest answers from real employees and candidates.
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 px-4 py-2 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-semibold rounded-lg cursor-pointer transition-colors"
        >
          <i className="ti ti-pencil mr-1.5" aria-hidden="true" />
          Ask anonymously
        </button>
      </div>
      <div className="flex gap-5 mt-4 pt-3 border-t border-[#f0f0f0]">
        {["Anonymous by default", "Answered by real employees", "Help future candidates"].map((text) => (
          <span key={text} className="flex items-center gap-1.5 text-[12px] text-[#717171]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a5f] flex-shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}


function QuestionCard({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(question.saved);

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4 mb-2.5 hover:border-[#d0d0d0] transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#f2f2f2] flex items-center justify-center text-[12px] font-bold text-[#717171] flex-shrink-0">
          {question.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TopicBadge topic={question.topic} />
            <span className="text-[11px] text-[#717171]">{question.date}</span>
          </div>
          <h3 className="text-[14px] font-semibold text-[#222] leading-snug mb-1">{question.title}</h3>
          <p className="text-[13px] text-[#484848] leading-relaxed mb-2">{question.preview}</p>

          {!expanded && question.answerPreview && (
            <div className="bg-[#f7f7f7] rounded-lg p-3 mb-2">
              <div className="flex items-center gap-1.5 mb-1">
                <i className="ti ti-message text-[12px] text-[#ff5a5f]" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-[#ff5a5f]">Answer from {question.authorRole}</span>
              </div>
              <p className="text-[12px] text-[#484848] leading-relaxed">{question.answerPreview}</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          className="flex-shrink-0 text-[#717171] hover:text-[#ff5a5f] transition-colors cursor-pointer"
        >
          <i className={`ti ${saved ? "ti-bookmark-filled text-[#ff5a5f]" : "ti-bookmark"} text-[16px]`} aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-[12px] font-medium text-[#ff5a5f] hover:text-[#e84a4f] cursor-pointer transition-colors"
        >
          {expanded ? "Collapse discussion" : "View full discussion"}
          <i className={`ti ${expanded ? "ti-chevron-up" : "ti-chevron-down"} ml-1 text-[11px]`} aria-hidden="true" />
        </button>
        <span className="text-[#ebebeb]">|</span>
        <button
          type="button"
          className="text-[12px] text-[#717171] hover:text-[#222] transition-colors cursor-pointer"
        >
          <i className="ti ti-message-plus text-[12px] mr-1" aria-hidden="true" />
          Add answer
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#ebebeb] space-y-3">
          {question.answers.map((answer, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f2f2f2] flex items-center justify-center text-[11px] font-bold text-[#717171] flex-shrink-0">
                {answer.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[12px] font-semibold text-[#222]">{answer.author}</span>
                  <span className="text-[10px] text-[#717171] bg-[#f2f2f2] px-1.5 py-0.5 rounded">{answer.role}</span>
                  <span className="text-[11px] text-[#717171]">{answer.date}</span>
                </div>
                <p className="text-[13px] text-[#484848] leading-relaxed">{answer.body}</p>
              </div>
            </div>
          ))}
          <div className="bg-[#f7f7f7] rounded-lg p-3">
            <button
              type="button"
              className="text-[12px] font-medium text-[#ff5a5f] hover:text-[#e84a4f] cursor-pointer transition-colors"
            >
              <i className="ti ti-pencil mr-1" aria-hidden="true" />
              Write your answer…
            </button>
          </div>
        </div>
      )}
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
        Unlock deeper insights and connect directly with the community.
      </p>
      {[
        "Ask questions to verified employees",
        "Access private salary discussions",
        "Get notified when your questions are answered",
        "Bookmark unlimited Q&A threads",
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
    { label: "Q&A guidelines" },
    { label: "Anonymous posting" },
    { label: "Report concerns" },
    { label: "Community rules" },
  ];

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-tool text-[14px] text-[#ff5a5f]" aria-hidden="true" />
        Community Toolkit
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Resources to help you participate effectively.
      </p>
      <div className="space-y-0">
        {tools.map((tool, i) => (
          <div key={tool.label} className={`flex items-center gap-2 text-[12px] text-[#484848] py-2 cursor-pointer hover:text-[#ff5a5f] transition-colors ${i < 3 ? "border-b border-[#f5f5f5]" : ""}`}>
            <span className="flex-1 font-medium">{tool.label}</span>
            <i className="ti ti-chevron-right text-[11px] text-[#ccc]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarFollowCard() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-bell text-[14px] text-[#ff5a5f]" aria-hidden="true" />
        Follow Company
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Get notified when new questions are asked or answered.
      </p>
      <button
        type="button"
        className="w-full py-2 bg-[#222] hover:bg-[#333] text-white text-[12px] font-semibold rounded-lg cursor-pointer transition-colors mb-2"
      >
        <i className="ti ti-plus mr-1.5" aria-hidden="true" />
        Follow TalentDash
      </button>
      <p className="text-[11px] text-[#717171] text-center">
        You'll receive weekly digests of new Q&A activity.
      </p>
    </div>
  );
}

function SidebarAlertCard() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("all");

  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-semibold text-[#222] mb-1 flex items-center gap-1.5">
        <i className="ti ti-bell-ringing text-[14px] text-[#ff5a5f]" aria-hidden="true" />
        Q&A Alerts
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">
        Get notified when questions are answered in topics you care about.
      </p>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-2.5 py-1.5 border border-[#ebebeb] rounded-md text-[12px] text-[#222] bg-white outline-none mb-2"
      />
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full px-2 py-1.5 border border-[#ebebeb] rounded-md text-[12px] text-[#222] bg-white outline-none mb-2"
      >
        <option value="all">All topics</option>
        <option value="interviews">Interviews</option>
        <option value="salaries">Salaries</option>
        <option value="culture">Culture</option>
        <option value="remote">Remote Work</option>
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


export default function QAPage() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("All Topics");
  const [search, setSearch] = useState("");

  const filtered = QUESTIONS.filter((q) => {
    const matchesTopic = activeTopic === "All Topics" || q.topic === activeTopic;
    const matchesSearch = !search.trim() || q.title.toLowerCase().includes(search.toLowerCase()) || q.preview.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-[1fr_260px] gap-5 max-w-[1100px]">
        <main>
          <HeroSection />
          <AskCommunitySection />

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Search questions, topics, or keywords…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3.5 py-2.5 border border-[#ebebeb] rounded-lg text-[13px] text-[#222] bg-white outline-none focus:border-[#ccc]"
            />
            <button type="button" className="flex items-center gap-1.5 px-4 py-2.5 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-medium rounded-lg cursor-pointer transition-colors whitespace-nowrap">
              <i className="ti ti-search" aria-hidden="true" />
              Search
            </button>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-5">
            {TOPIC_CHIPS.map((c) => (
              <Chip key={c.label} active={activeTopic === c.label} onClick={() => setActiveTopic(c.label)} icon={c.icon}>
                {c.label}
              </Chip>
            ))}
          </div>

          <SectionLabel>Recent questions</SectionLabel>
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#717171] bg-white border border-[#ebebeb] rounded-xl p-8 mb-2.5">
              <i className="ti ti-search-off text-[18px]" aria-hidden="true" />
              No questions match your filters.
            </div>
          ) : (
            filtered.map((q) => <QuestionCard key={q.id} question={q} />)
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-[#717171] bg-[#f2f2f2] border border-dashed border-[#d0d0d0] rounded-md px-2.5 py-2 mt-2 mb-5">
            <i className="ti ti-info-circle text-[14px]" aria-hidden="true" />
            Questions and answers will be populated from community submissions. Be the first to ask or contribute.
          </div>
        </main>

        <aside className="flex flex-col gap-3.5">
          <SidebarProCard />
          <SidebarToolkitCard />
          <SidebarFollowCard />
          <SidebarAlertCard />
          <AdPlaceholder />
        </aside>
      </div>
    </div>
  );
}