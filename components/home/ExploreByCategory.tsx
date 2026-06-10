import {
  DollarSign,
  Star,
  MessageSquare,
  Briefcase,
  Gift,
  Users,
  ArrowRight,
} from "lucide-react";

type Category = {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

const CATEGORIES: Category[] = [
  {
    icon: <DollarSign style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(16,185,129,0.12)",
    iconColor: "#10b981",
    title: "Salaries",
    description: "Discover pay by role, location and experience.",
    linkLabel: "Explore salaries",
    href: "/salaries",
  },
  {
    icon: <Star style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(249,115,22,0.12)",
    iconColor: "#f97316",
    title: "Reviews",
    description: "Discover what employees say about companies.",
    linkLabel: "Explore reviews",
    href: "/reviews",
  },
  {
    icon: <MessageSquare style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(139,92,246,0.12)",
    iconColor: "#8b5cf6",
    title: "Interviews",
    description: "Practice real questions and ace your interviews.",
    linkLabel: "Explore interviews",
    href: "/interviews",
  },
  {
    icon: <Briefcase style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(236,72,153,0.12)",
    iconColor: "#ec4899",
    title: "Jobs",
    description: "Find the right opportunities for your career.",
    linkLabel: "Explore jobs",
    href: "/jobs",
  },
  {
    icon: <Gift style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(255,90,95,0.12)",
    iconColor: "#ff5a5f",
    title: "Offers",
    description: "Compare offers, understand compensation.",
    linkLabel: "Compare offers",
    href: "/offers",
  },
  {
    icon: <Users style={{ width: 18, height: 18 }} />,
    iconBg: "rgba(20,184,166,0.12)",
    iconColor: "#14b8a6",
    title: "Community",
    description: "Be a part of conversations that matter.",
    linkLabel: "Explore community",
    href: "/forum",
  },
];

export function ExploreByCategory() {
  return (
    <section
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <h2 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-5">
        Explore by what matters to you
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map(({ icon, iconBg, iconColor, title, description, linkLabel, href }) => (
          <div
            key={title}
            className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-md"
          >
            {/* Icon + title row */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: iconBg, color: iconColor }}
              >
                {icon}
              </div>
              <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">
                {title}
              </span>
            </div>

            {/* Description */}
            <p className="flex-1 text-[12px] leading-[1.55] text-[var(--color-text-secondary)] mb-4">
              {description}
            </p>

            {/* CTA */}
            <a
              href={href}
              className="inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--color-primary)" }}
            >
              {linkLabel}
              <ArrowRight style={{ width: 12, height: 12 }} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}