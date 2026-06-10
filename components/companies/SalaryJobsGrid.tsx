"use client";

import Link from "next/link";
import {
  ArrowRight, Code2, LayoutDashboard, Paintbrush, ChartScatter,
  Megaphone, Briefcase, Coins, TrendingUp, ArrowLeftRight,
  MapPin, Users, Building2, GraduationCap, Wifi, LucideIcon,
} from "lucide-react";
import type { CompanyFullData } from "@/components/companies/Overview";

interface Props {
  company: CompanyFullData;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-5">{children}</h2>
  );
}

function ColCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-auto pt-5 border-t border-gray-100">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e8294c] hover:underline"
      >
        {children} <ArrowRight size={13} strokeWidth={2.5} />
      </Link>
    </div>
  );
}

function Chip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
      <Icon size={13} strokeWidth={1.8} className="text-[#e8294c]" />
      {label}
    </span>
  );
}

function FeatureRow({ icon: Icon, label, sub }: { icon: LucideIcon; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0">
        <Icon size={16} strokeWidth={1.8} className="text-[#e8294c]" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5 leading-tight">{sub}</p>
      </div>
      <ArrowRight size={13} strokeWidth={2} className="text-[#e8294c] ml-auto flex-shrink-0" />
    </div>
  );
}

function ReviewBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-sm text-gray-600 mb-1.5">{label}</p>
      <div className="h-2 rounded-full bg-gray-100 relative">
        <div
          className="h-2 rounded-full absolute left-0"
          style={{ width: `${pct}%`, background: color, opacity: 0.75 }}
        />
      </div>
    </div>
  );
}


const ROLE_CHIPS: { icon: LucideIcon; label: string }[] = [
  { icon: Code2,           label: "Engineering" },
  { icon: LayoutDashboard, label: "Product" },
  { icon: Paintbrush,      label: "Design" },
  { icon: ChartScatter,    label: "Data & ML" },
  { icon: Megaphone,       label: "Marketing" },
  { icon: Briefcase,       label: "Business" },
];

function FindYourRole({ company }: { company: CompanyFullData }) {
  return (
    <div className="flex flex-col h-full">
      <Eyebrow>Careers</Eyebrow>
      <ColTitle>Find your role</ColTitle>

      <div className="flex flex-wrap gap-2 mb-6">
        {ROLE_CHIPS.map((c) => (
          <Chip key={c.label} icon={c.icon} label={c.label} />
        ))}
      </div>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-sm font-semibold text-gray-500 mb-4">What colleagues value most</p>
        <ReviewBar label="Growth & learning" pct={85} color="#e8294c" />
        <ReviewBar label="Compensation"      pct={78} color="#378ADD" />
        <ReviewBar label="Work-life balance" pct={70} color="#1D9E75" />
        <p className="text-xs text-gray-400 mt-3">Based on employee reviews on TalentDash</p>
      </div>

      <ColCta href={`/companies/${company.slug}/salaries`}>Browse all roles</ColCta>
    </div>
  );
}


const PAY_FEATURES: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Coins,          label: "Total comp breakdown",     sub: "Base · Bonus · Equity · Benefits" },
  { icon: TrendingUp,     label: "Pay by level",             sub: "IC3 through Fellow / Distinguished" },
  { icon: ArrowLeftRight, label: "Compare across companies", sub: "See how Google stacks up by role" },
  { icon: MapPin,         label: "Location adjustments",     sub: "Remote · Bangalore · Hyderabad" },
];

function UnderstandPay({ company }: { company: CompanyFullData }) {
  return (
    <div className="flex flex-col h-full">
      <Eyebrow>Compensation</Eyebrow>
      <ColTitle>Understand pay</ColTitle>

      <div className="flex flex-col gap-2.5 mb-5">
        {PAY_FEATURES.map((f) => (
          <FeatureRow key={f.label} icon={f.icon} label={f.label} sub={f.sub} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-auto mb-1">
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">Verified data</span>
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">Anonymous reports</span>
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">Equity included</span>
      </div>

      <ColCta href={`/companies/${company.slug}/salaries`}>Explore salary data</ColCta>
    </div>
  );
}


const JOB_FEATURES: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Users,        label: "Browse roles by team",            sub: "Engineering · Design · Product & more" },
  { icon: Building2,    label: "Explore company openings",        sub: "All active listings in one place" },
  { icon: GraduationCap, label: "Discover internship opportunities", sub: "Internships & early career programs" },
  { icon: Wifi,         label: "Find remote-friendly roles",      sub: "Work from anywhere positions" },
];

function StartApplying({ company }: { company: CompanyFullData }) {
  return (
    <div className="flex flex-col h-full">
      <Eyebrow>Jobs</Eyebrow>
      <ColTitle>Start applying</ColTitle>

      <div className="flex flex-col gap-2.5 mb-5">
        {JOB_FEATURES.map((f) => (
          <FeatureRow key={f.label} icon={f.icon} label={f.label} sub={f.sub} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-auto mb-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600 bg-white">Remote-friendly</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600 bg-white">Updated daily</span>
      </div>

      <ColCta href={`/companies/${company.slug}/jobs`}>Explore Jobs</ColCta>
    </div>
  );
}


export default function SalaryJobsGrid({ company }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-white px-7 py-7"><FindYourRole company={company} /></div>
      <div className="bg-white px-7 py-7"><UnderstandPay company={company} /></div>
      <div className="bg-white px-7 py-7"><StartApplying company={company} /></div>
    </div>
  );
}