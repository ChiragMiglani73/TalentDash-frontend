"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Search, MapPin, Building2, DollarSign, Star,
  MessageSquare, Briefcase, ChevronDown, type LucideIcon,
} from "lucide-react";

const TABS = [
  { key: "salaries",   label: "Salaries",   Icon: DollarSign,   queryLabel: "Search ", queryHint: "e.g. Software Engineer, Data Analyst", locationHint: "e.g. New York, India",      experienceHint: "e.g. 0–5 years"       },
  { key: "reviews",    label: "Reviews",    Icon: Star,         queryLabel: "Search company reviews",                queryHint: "e.g. Google, Amazon",                  locationHint: "e.g. India, Global",        experienceHint: "e.g. Engineering, Product" },
  { key: "interviews", label: "Interviews", Icon: MessageSquare,queryLabel: "Search interview questions",            queryHint: "e.g. System Design, Behavioural",      locationHint: "e.g. Meta, Microsoft",      experienceHint: "e.g. Senior, Entry level"  },
  { key: "companies",  label: "Companies",  Icon: Building2,    queryLabel: "Search companies",                      queryHint: "e.g. Google, Infosys, TCS",            locationHint: "e.g. Bangalore, Mumbai",    experienceHint: "e.g. Startup, MNC"         },
  { key: "jobs",       label: "Jobs",       Icon: Briefcase,    queryLabel: "Search jobs",                           queryHint: "e.g. Frontend Engineer, PM",           locationHint: "e.g. Remote, Hyderabad",    experienceHint: "e.g. 2–5 years"            },
] as const;

const TRENDING = ["Software Engineer","Data Scientist","Product Manager","Remote Jobs"];

function SearchField({ id, icon: Icon, label, hint, value, onChange, onEnter, showChevron }: {
  id: string; icon: LucideIcon; label: string; hint: string;
  value: string; onChange: (v: string) => void; onEnter?: () => void; showChevron?: boolean;
}) {
  return (
    <div className="flex flex-1 items-center gap-3 px-5 py-[18px]">
      <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--color-text-muted)" }} aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <label htmlFor={id} className="text-[13px] font-semibold leading-none" style={{ color: "var(--color-text-primary)" }}>
          {label}
        </label>
        <input
          id={id} type="text" value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") onEnter?.(); }}
          placeholder={hint}
          className="w-full bg-transparent text-[12px] leading-none outline-none placeholder:text-[var(--color-text-muted)]"
          style={{ color: "var(--color-text-secondary)" }}
        />
      </div>
      {showChevron && <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--color-text-muted)" }} />}
    </div>
  );
}

function VDivider() {
  return <div className="hidden h-8 w-px shrink-0 self-center lg:block" style={{ background: "var(--color-border)" }} />;
}

export function HeroSearch({ region }: { region?: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("salaries");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const tab = TABS.find((t) => t.key === activeTab)!;

  function handleSearch() {
    const prefix = region ? `/${region}` : "";
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    if (experience) params.set("experience", experience);
    router.push(`${prefix}/${activeTab}?${params.toString()}`);
  }

  return (
    <div className="mt-10 w-full">
      <div className="w-full overflow-hidden rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)" }}>
        {/* Tabs */}
        <div className="flex items-end gap-0 border-b px-4" style={{ borderColor: "var(--color-border)" }}>
          {TABS.map(({ key, label, Icon }) => {
            const active = activeTab === key;
            return (
              <button key={key} type="button" onClick={() => setActiveTab(key)}
                className="relative flex items-center gap-1.5 px-4 pb-3.5 pt-4 text-[13px] transition-colors"
                style={{ color: active ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: active ? 600 : 500 }}
              >
                <Icon className="h-[14px] w-[14px] shrink-0" />
                <span>{label}</span>
                {active && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full" style={{ background: "var(--color-primary)" }} />}
              </button>
            );
          })}
        </div>
        {/* Fields */}
        <div className="flex flex-col items-stretch lg:flex-row lg:items-stretch">
          <SearchField id="hero-query"      icon={Search}    label={tab.queryLabel} hint={tab.queryHint}       value={query}      onChange={setQuery}      onEnter={handleSearch} />
          <VDivider />
          <SearchField id="hero-location"   icon={MapPin}    label="Location"       hint={tab.locationHint}    value={location}   onChange={setLocation}   onEnter={handleSearch} />
          <VDivider />
          <SearchField id="hero-experience" icon={Building2} label="Experience"     hint={tab.experienceHint}  value={experience} onChange={setExperience} onEnter={handleSearch} showChevron />
          <div className="flex shrink-0 items-center border-t p-3 lg:border-l lg:border-t-0" style={{ borderColor: "var(--color-border)" }}>
            <button type="button" onClick={handleSearch}
              className="flex w-full items-center justify-center rounded-xl px-10 py-[15px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90 lg:w-auto"
              style={{ background: "var(--color-primary)" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>Trending searches</span>
        {TRENDING.map((term) => (
          <button key={term} type="button" onClick={() => { setQuery(term); setActiveTab("salaries"); }}
            className="rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}