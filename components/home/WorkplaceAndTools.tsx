import {
  Award,
  ShoppingCart,
  Calculator,
  FileText,
  GitCompare,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

// ── Star rating ───────────────────────────────────────────────────────────────
function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z"
            fill={i <= Math.floor(rating) ? color : i - 0.5 <= rating ? color : "#e5e7eb"}
            opacity={i - 0.5 <= rating && i > Math.floor(rating) ? 0.45 : 1}
          />
        </svg>
      ))}
    </div>
  );
}

// ── Company logo pill ─────────────────────────────────────────────────────────
function CompanyLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
      <img src={src} alt={name} width={16} height={16} className="object-contain" />
      <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{name}</span>
    </div>
  );
}

const G = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

const COMPANIES = [
  { name: "Microsoft", src: G("microsoft.com") },
  { name: "Google",    src: G("google.com") },
  { name: "Deloitte",  src: G("deloitte.com") },
  { name: "Adobe",     src: G("adobe.com") },
  { name: "Airbnb",    src: G("airbnb.com") },
  { name: "Flipkart",  src: G("flipkart.com") },
  { name: "Swiggy",    src: G("swiggy.com") },
  { name: "Razorpay",  src: G("razorpay.com") },
  { name: "Zomato",    src: G("zomato.com") },
  { name: "Uber",      src: G("uber.com") },
];

const TOOLS = [
  { icon: <Calculator style={{ width: 22, height: 22 }} />, label: "Salary Calculator",       href: "/tools/salary",   color: "#ff5a5f", bg: "rgba(255,90,95,0.1)" },
  { icon: <FileText    style={{ width: 22, height: 22 }} />, label: "Resume Review",           href: "/tools/resume",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { icon: <GitCompare  style={{ width: 22, height: 22 }} />, label: "Offer Letter Comparison", href: "/tools/offer",    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  { icon: <TrendingUp  style={{ width: 22, height: 22 }} />, label: "Hike Calculator",         href: "/tools/hike",     color: "#10b981", bg: "rgba(16,185,129,0.1)" },
];

export function WorkplaceAndTools() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">

      {/* ── LEFT: Workplace Index ─────────────────────────────────────────── */}
      <div
        className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(255,90,95,0.1)", color: "var(--color-primary)" }}
          >
            <Award style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Workplace Index</h3>
            <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
              Measure and improve workplace experience.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div>
            <p className="text-[26px] font-black text-[var(--color-text-primary)] leading-none">4.1</p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Workplace Score</p>
            <Stars rating={4.1} color="#ff5a5f" />
          </div>
          <div>
            <p className="text-[26px] font-black text-[var(--color-text-primary)] leading-none">73%</p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Positive Reviews</p>
          </div>
          <div>
            <p className="text-[26px] font-black text-[var(--color-text-primary)] leading-none">85%</p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Recommend to a friend</p>
          </div>
        </div>

        {/* Based on */}
        <p className="text-[11px] text-[var(--color-text-muted)] mb-4">Based on 2.1M reviews</p>

        {/* Top rated workplaces */}
        <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] mb-3">
          Top rated workplaces
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {COMPANIES.map((c) => (
            <CompanyLogo key={c.name} {...c} />
          ))}
        </div>

        {/* CTA */}
        <a
          href="/workplace-index"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--color-primary)", borderTop: "1px solid var(--color-border)" }}
        >
          Explore Workplace Index
          <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

      {/* ── RIGHT: Tools & Resources ──────────────────────────────────────── */}
      <div
        className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(255,90,95,0.1)", color: "var(--color-primary)" }}
          >
            <ShoppingCart style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Tools & Resources</h3>
            <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
              Free tools to help you plan your career.
            </p>
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {TOOLS.map(({ icon, label, href, color, bg }) => (
            <a
              key={label}
              href={href}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-center transition-all hover:border-current hover:shadow-sm"
              style={{ "--hover-color": color } as React.CSSProperties}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{ background: bg, color }}
              >
                {icon}
              </div>
              <span className="text-[12px] font-semibold leading-tight text-[var(--color-text-primary)]">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/tools"
          className="mt-5 inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--color-primary)", borderTop: "1px solid var(--color-border)" }}
        >
          Explore all tools
          <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

    </div>
  );
}