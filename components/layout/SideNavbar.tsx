"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  DollarSign,
  Star,
  MessageSquare,
  Briefcase,
  Users,
  Wrench,
  BarChart2,
  Heart,
  GitCompare,
  Settings,
  LogIn,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

// ─────────────────────────────────────────────────────────────────────────────
// Nav Data
// ─────────────────────────────────────────────────────────────────────────────

const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: <Home className="h-[18px] w-[18px]" /> },
  { label: "Companies", href: "/companies", icon: <Building2 className="h-[18px] w-[18px]" /> },
  { label: "Salaries", href: "/salaries", icon: <DollarSign className="h-[18px] w-[18px]" /> },
  { label: "Reviews", href: "/reviews", icon: <Star className="h-[18px] w-[18px]" /> },
  { label: "Interviews", href: "/interviews", icon: <MessageSquare className="h-[18px] w-[18px]" /> },
  { label: "Jobs", href: "/jobs", icon: <Briefcase className="h-[18px] w-[18px]" /> },
  { label: "Community", href: "/community", icon: <Users className="h-[18px] w-[18px]" /> },
  { label: "Tools", href: "/tools", icon: <Wrench className="h-[18px] w-[18px]" /> },
  { label: "Workplace Index", href: "/workplace-index", icon: <BarChart2 className="h-[18px] w-[18px]" /> },
];

const BOTTOM_NAV: NavItem[] = [
  { label: "Saved", href: "/saved", icon: <Heart className="h-[18px] w-[18px]" /> },
  { label: "Compare", href: "/compare", icon: <GitCompare className="h-[18px] w-[18px]" /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────────────────────────────────────

function SideNavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150"
      style={{
        color: active ? "var(--color-primary)" : "var(--color-text-secondary)",
        background: active ? "var(--color-primary-subtle, #fff0f0)" : "transparent",
        fontWeight: active ? "600" : "500",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "var(--color-hover)";
          e.currentTarget.style.color = "var(--color-text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--color-text-secondary)";
        }
      }}
    >
      {/* Active indicator bar */}
      <span
        className="absolute left-0 h-6 w-[3px] rounded-r-full transition-opacity duration-150"
        style={{
          background: "var(--color-primary)",
          opacity: active ? 1 : 0,
        }}
      />
      <span
        className="flex shrink-0 items-center justify-center"
        style={{ color: active ? "var(--color-primary)" : "var(--color-text-muted)" }}
      >
        {item.icon}
      </span>
      <span className="flex-1 truncate">{item.label}</span>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SideNavbar
// ─────────────────────────────────────────────────────────────────────────────

export function SideNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <aside
      className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col border-r lg:flex"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* ── Logo ── */}
      <div className="flex h-[60px] shrink-0 items-center gap-2.5 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-black text-white"
            style={{ background: "var(--color-primary)" }}
          >
            D
          </div>
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            TalentDash
          </span>
        </Link>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex flex-col gap-0.5">
          {MAIN_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <div key={item.href} className="relative">
                <SideNavLink item={item} active={active} />
              </div>
            );
          })}
        </div>
      </nav>

      {/* ── Divider ── */}
      <div
        className="mx-4 border-t"
        style={{ borderColor: "var(--color-border)" }}
      />

      {/* ── Bottom utility links ── */}
      <div className="px-2 py-3">
        <div className="flex flex-col gap-0.5">
          {BOTTOM_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <div key={item.href} className="relative">
                <SideNavLink item={item} active={active} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Go Pro CTA ── */}
      <div className="px-3 pb-3">
        <div
          className="rounded-xl p-3"
          style={{
            background: "var(--color-primary-subtle, #fff0f0)",
            border: "1px solid var(--color-primary-border, #ffd6d6)",
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Go Pro
          </p>
          <p
            className="mt-0.5 text-[11px] leading-snug"
            style={{ color: "var(--color-text-muted)" }}
          >
            Unlock full access to salaries, reviews & insights.
          </p>
          <Link
            href="/pro"
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-primary)" }}
          >
            View Plans
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Sign in / Settings ── */}
      <div
        className="flex items-center justify-between border-t px-4 py-3"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-150"
          style={{ color: "var(--color-text-secondary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-text-secondary)")
          }
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </Link>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--color-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}