"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const AVATAR_COLORS = ["#ff5a5f", "#f97316", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899", "#f59e0b"];

const TAG_COLORS: Record<string, { color: string; bg: string }> = {
  "Salary":   { color: "#ff5a5f", bg: "rgba(255,90,95,0.1)" },
  "AI/ML":    { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  "Career":   { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  "Reviews":  { color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  "Offers":   { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  "Jobs":     { color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
  "Growth":   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

type Insight = {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  href: string;
  tag: string;
};

const INSIGHTS: Insight[] = [
  { id: "1", title: "How much can a Product Manager make in 2026?",       author: "Aarav Sharma",  timeAgo: "2h ago",  href: "/forum/1", tag: "Salary"  },
  { id: "2", title: "Top skills to learn in AI/ML in 2026",               author: "Neha Patil",    timeAgo: "5h ago",  href: "/forum/2", tag: "AI/ML"   },
  { id: "3", title: "SDE vs Data Scientist: Which pays more?",            author: "Rahul Verma",   timeAgo: "9h ago",  href: "/forum/3", tag: "Career"  },
  { id: "4", title: "Best companies for work-life balance in India",      author: "Priya Nair",    timeAgo: "12h ago", href: "/forum/4", tag: "Reviews" },
  { id: "5", title: "Is ₹30 LPA a good salary for 3 years experience?",  author: "Vikram Joshi",  timeAgo: "1d ago",  href: "/forum/5", tag: "Salary"  },
  { id: "6", title: "How to negotiate a 40% hike during job switch?",     author: "Sneha Menon",   timeAgo: "1d ago",  href: "/forum/6", tag: "Offers"  },
  { id: "7", title: "Startup vs MNC: Which is better for early career?",  author: "Arjun Kapoor",  timeAgo: "2d ago",  href: "/forum/7", tag: "Growth"  },
];

const VISIBLE = 4; // cards visible at once

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name[0].toUpperCase();
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
      style={{ background: color, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
    >
      {initials}
    </div>
  );
}

type Props = { insights?: Insight[] };

export function CommunityInsights({ insights = INSIGHTS }: Props) {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < insights.length;

  const visible = insights.slice(start, start + VISIBLE);

  return (
    <section
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-bold text-[var(--color-text-primary)]">
          Latest insights from the community
        </h2>
        <a
          href="/forum"
          className="inline-flex items-center gap-1 text-[13px] font-semibold transition-opacity hover:opacity-75 flex-shrink-0"
          style={{ color: "var(--color-primary)" }}
        >
          View all
          <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

      {/* Cards + nav */}
      <div className="relative flex items-center gap-2">

        {/* Left chevron */}
        <button
          onClick={() => setStart((s) => Math.max(0, s - 1))}
          disabled={!canPrev}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all hover:shadow-md disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous"
        >
          <ChevronLeft style={{ width: 14, height: 14, color: "var(--color-text-secondary)" }} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 flex-1 lg:grid-cols-4">
          {visible.map((item, i) => {
            const globalIdx = start + i;
            const color = AVATAR_COLORS[globalIdx % AVATAR_COLORS.length];
            return (
              <a
                key={item.id}
                href={item.href}
                className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 transition-all hover:shadow-sm"
                style={{ minHeight: 160 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                {/* Avatar */}
                <div className="flex justify-center">
                  <Avatar name={item.author} color={color} />
                </div>

                {/* Tag */}
                {(() => {
                  const tc = TAG_COLORS[item.tag] ?? { color: "var(--color-primary)", bg: "rgba(255,90,95,0.1)" };
                  return (
                    <div className="flex justify-center mt-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                        style={{ color: tc.color, background: tc.bg }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  );
                })()}

                {/* Title */}
                <p className="mt-3 text-[13px] font-semibold leading-snug text-[var(--color-text-primary)] line-clamp-3 flex-1">
                  {item.title}
                </p>

                {/* Author + time */}
                <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                  <p className="text-[12px] font-medium text-[var(--color-text-secondary)]">{item.author}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{item.timeAgo}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Right chevron */}
        <button
          onClick={() => setStart((s) => Math.min(insights.length - VISIBLE, s + 1))}
          disabled={!canNext}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all hover:shadow-md disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next"
        >
          <ChevronRight style={{ width: 14, height: 14, color: "var(--color-text-secondary)" }} />
        </button>

      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: insights.length - VISIBLE + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className="rounded-full transition-all"
            style={{
              width: i === start ? 18 : 6,
              height: 6,
              background: i === start ? "var(--color-primary)" : "var(--color-border)",
            }}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}