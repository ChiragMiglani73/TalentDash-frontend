"use client";

import { useState } from "react";

const BENEFIT_CATEGORIES = [
  {
    id: "health",
    icon: "🏥",
    label: "Health & Wellness",
    benefits: [
      { name: "Medical Insurance",  detail: "100% premium covered for employee + family",       highlight: true },
      { name: "Dental & Vision",    detail: "Full coverage including orthodontics" },
      { name: "Mental Health",      detail: "Free therapy sessions via licensed providers" },
      { name: "Gym Reimbursement",  detail: "Up to ₹15,000/year on fitness expenses" },
      { name: "Health Checkups",    detail: "Annual full-body checkup for employee & spouse" },
    ],
  },
  {
    id: "equity",
    icon: "📈",
    label: "Equity & Compensation",
    benefits: [
      { name: "RSU Grants",          detail: "4-year vesting, 1-year cliff, quarterly after",   highlight: true },
      { name: "Annual Bonus",        detail: "10–20% of base, performance-linked" },
      { name: "Equity Refresh",      detail: "Top performers receive annual refresh grants" },
      { name: "401k / NPS Match",    detail: "Up to 4% employer match" },
      { name: "Employee Stock Plan", detail: "ESPP at 15% discount on market price" },
    ],
  },
  {
    id: "time",
    icon: "🌴",
    label: "Time Off",
    benefits: [
      { name: "Annual Leave",     detail: "25 days paid leave per year",                        highlight: true },
      { name: "Sick Leave",       detail: "Unlimited sick days, no documentation required" },
      { name: "Parental Leave",   detail: "24 weeks primary / 12 weeks secondary caregiver" },
      { name: "Sabbatical",       detail: "4-week paid sabbatical after 5 years" },
      { name: "Public Holidays",  detail: "14 fixed + 3 floating holidays" },
    ],
  },
  {
    id: "learning",
    icon: "🎓",
    label: "Learning & Growth",
    benefits: [
      { name: "L&D Budget",          detail: "₹1,00,000/year for courses, books, conferences", highlight: true },
      { name: "Internal Mobility",   detail: "Apply to any team after 1 year in role" },
      { name: "Mentorship Program",  detail: "Matched with senior leader within 90 days" },
      { name: "Tuition Assistance",  detail: "Up to 50% reimbursement for grad programs" },
      { name: "Tech Talks",          detail: "Weekly internal talks from industry experts" },
    ],
  },
  {
    id: "perks",
    icon: "✨",
    label: "Perks & Lifestyle",
    benefits: [
      { name: "Free Meals",          detail: "Breakfast, lunch & dinner on campus",             highlight: true },
      { name: "Commute Allowance",   detail: "₹10,000/month cab or fuel reimbursement" },
      { name: "Home Office Budget",  detail: "₹50,000 one-time setup allowance" },
      { name: "Phone Plan",          detail: "Company-paid phone + data plan" },
      { name: "Relocation Bonus",    detail: "Up to ₹2L for new hires relocating" },
    ],
  },
  {
    id: "flexibility",
    icon: "🏠",
    label: "Flexibility & Remote",
    benefits: [
      { name: "Hybrid Work",         detail: "2 days office per week, rest remote",             highlight: true },
      { name: "Flexible Hours",      detail: "Core hours 11am–4pm, rest is yours" },
      { name: "Work from Anywhere",  detail: "Up to 30 days/year from any location" },
      { name: "No-Meeting Days",     detail: "Wednesdays are focus-time protected" },
      { name: "Async Culture",       detail: "Slack-first, meetings optional by default" },
    ],
  },
];
const SPOTLIGHT = {
  emoji: "🏆",
  label: "Most Mentioned Benefit",
  name: "Medical Insurance",
  detail: "100% premium covered for employee + family",
  category: "Health & Wellness",
};

const REVIEWS = [
  { author: "Senior SWE · L5",      location: "Bengaluru", date: "2 weeks ago",  text: "The health benefits are genuinely world-class. My parents are covered under my plan and the mental health sessions have been a lifesaver during crunch periods." },
  { author: "Product Manager · L4", location: "Hyderabad", date: "1 month ago",  text: "RSU vesting is excellent and the refresh grants are real — I've gotten one every year. Parental leave policy is also miles ahead of what I had at my previous company." },
  { author: "Data Scientist · L4",  location: "Bengaluru", date: "3 weeks ago",  text: "The L&D budget is no joke. Used it for two Coursera specialisations and a conference trip to Singapore. No approval drama, just submit and it's done." },
  { author: "UX Designer · L3",     location: "Pune",      date: "2 months ago", text: "Hybrid setup is genuinely flexible. I've worked from Goa for three weeks without any issues. The no-meeting Wednesdays are also something I didn't know I needed." },
];

function BenefitsOverview() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 mb-4">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
            Benefits Overview
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            {BENEFIT_CATEGORIES.length} key benefit categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {BENEFIT_CATEGORIES.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-background)] border border-[var(--color-border)] rounded-full px-3 py-1"
              >
                <span className="text-sm leading-none">{c.icon}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2 pt-1">
          <button className="px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors">
            + Add a benefit
          </button>
          <span className="metadata">Help keep this up to date</span>
        </div>
      </div>
    </div>
  );
}
function SpotlightCard() {
  return (
    <div className="bg-[var(--color-primary-muted)] border border-[var(--color-primary-subtle)] rounded-xl px-5 py-4 mb-4 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-white border border-[var(--color-primary-subtle)] flex items-center justify-center text-xl shrink-0">
        {SPOTLIGHT.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-0.5">
          {SPOTLIGHT.label}
        </p>
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-0.5">
          {SPOTLIGHT.name}
        </p>
        <p className="metadata text-[var(--color-text-secondary)] truncate">
          {SPOTLIGHT.detail}
        </p>
      </div>
      <span className="text-xs font-medium text-[var(--color-primary)] bg-white border border-[var(--color-primary-subtle)] rounded-full px-3 py-1 shrink-0 hidden sm:block">
        {SPOTLIGHT.category}
      </span>
    </div>
  );
}

function CategoryCard({ cat, isOpen, onClick }) {
  const PREVIEW_MAX = 3;
  const previewNames = cat.benefits.slice(0, PREVIEW_MAX).map((b) => b.name);
  const remaining = cat.benefits.length - PREVIEW_MAX;

  return (
    <div
      onClick={onClick}
      className={`bg-[var(--color-surface)] rounded-xl mb-2 cursor-pointer overflow-hidden transition-all border ${
        isOpen
          ? "border-[var(--color-primary)]"
          : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
      }`}
    >
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-lg shrink-0">
          {cat.icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            {cat.label}
          </p>
          {!isOpen && (
            <p className="text-xs text-[var(--color-text-muted)] truncate">
              {previewNames.join(" · ")}
              {remaining > 0 && (
                <span className="ml-1 font-medium text-[var(--color-text-secondary)]">
                  +{remaining}
                </span>
              )}
            </p>
          )}
          {!isOpen && (
            <p className="metadata mt-0.5">{cat.benefits.length} benefits included</p>
          )}
        </div>

        <span
          className={`text-xs text-[var(--color-text-muted)] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
          <div className="flex flex-col gap-2">
            {cat.benefits.map((b) => (
              <div
                key={b.name}
                className={`flex items-start gap-3 bg-[var(--color-surface)] rounded-lg px-4 py-3 border ${
                  b.highlight
                    ? "border-[var(--color-primary-subtle)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                    b.highlight ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {b.name}
                    </span>
                    {b.highlight && (
                      <span className="text-[10px] font-semibold tracking-wide text-[var(--color-primary)] bg-[var(--color-primary-muted)] border border-[var(--color-primary-subtle)] px-1.5 py-px rounded-full">
                        TOP BENEFIT
                      </span>
                    )}
                  </div>
                  <p className="metadata text-[var(--color-text-secondary)] leading-snug">
                    {b.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ r }) {
  const [liked, setLiked] = useState(false);

  const initials = r.author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-5 py-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-xs font-semibold text-[var(--color-text-muted)] shrink-0">
          {initials}
        </div>
        <div>
          <p className="label-sm text-[var(--color-text-primary)]">{r.author}</p>
          <p className="metadata">{r.location} · {r.date}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{r.text}</p>

      <div className="flex items-center gap-2">
        <span className="metadata">Helpful?</span>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-3 py-1 cursor-pointer border transition-colors ${
            liked
              ? "bg-[var(--color-primary-muted)] border-[var(--color-primary-subtle)] text-[var(--color-primary)]"
              : "bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]"
          }`}
        >
          👍 {liked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-3">

      <div className="rounded-xl p-5 bg-[var(--color-text-primary)]">
        <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">
          TalentDash Pro
        </p>
        <p className="text-base font-bold text-white leading-snug mb-4">
          See full benefits data &amp; compare companies
        </p>
        {["Side-by-side company compare", "Benefits score over time", "Export to PDF"].map((f) => (
          <div key={f} className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
            <span className="text-white/90 font-semibold">✓</span>
            {f}
          </div>
        ))}
        <button className="mt-4 w-full py-2.5 bg-white text-[var(--color-text-primary)] text-sm font-bold rounded-lg cursor-pointer hover:bg-[var(--color-background)] transition-colors">
          Upgrade · ₹499/mo
        </button>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--color-background)] border-b border-[var(--color-border)]">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
            Sponsored · Hiring
          </span>
          <span className="metadata">Ad</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#0052cc] flex items-center justify-center text-white text-sm font-black shrink-0">
              At
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Atlassian</p>
              <p className="metadata">Remote · Bengaluru</p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-3">
            Top-rated benefits package. Unlimited PTO, full medical, and strong equity.
          </p>
          <button className="w-full py-2 bg-[#0052cc] text-white text-xs font-semibold rounded-lg cursor-pointer">
            View open roles →
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-background)] border border-dashed border-[var(--color-border)] rounded-xl p-5 text-center">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
          Advertisement
        </p>
        <div className="w-12 h-12 rounded-xl bg-[var(--color-border)] mx-auto mb-2 flex items-center justify-center text-xl">
          🏢
        </div>
        <p className="metadata">300 × 250</p>
      </div>

      <div className="bg-[var(--color-primary-muted)] border border-[var(--color-primary-subtle)] rounded-xl p-4">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
          🔔 Track benefits changes
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-3">
          Get notified when Google updates its benefits package.
        </p>
        <button className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
          Follow Google
        </button>
      </div>
    </div>
  );
}

export default function BenefitsPage() {
  const [expanded, setExpanded] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const visibleReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 2);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen">

      <BenefitsOverview />

      <div className="grid grid-cols-[1fr_280px] gap-4 items-start">

        <div>
          <SpotlightCard />

          <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-3">
            {BENEFIT_CATEGORIES.length} benefit categories · click to expand
          </p>

          {BENEFIT_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              isOpen={expanded === cat.id}
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
            />
          ))}

          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
              What employees say
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <div className="flex flex-col gap-2.5">
            {visibleReviews.map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </div>

          {!showAllReviews && (
            <button
              onClick={() => setShowAllReviews(true)}
              className="mt-2.5 w-full py-3 bg-transparent border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-secondary)] cursor-pointer hover:bg-[var(--color-hover)] transition-colors"
            >
              Show {REVIEWS.length - 2} more reviews
            </button>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
