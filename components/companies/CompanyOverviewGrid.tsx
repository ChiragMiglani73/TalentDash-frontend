"use client";

import Link from "next/link";
import {
  Lightbulb,
  Users,
  GraduationCap,
  Globe,
  Check,
  BarChart2,
  Clock,
  Leaf,
  LucideIcon,
} from "lucide-react";
import type { CompanyFullData } from "@/components/companies/Overview";

interface Props {
  company: CompanyFullData;
}

const CULTURE_ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  users: Users,
  graduationCap: GraduationCap,
  globe: Globe,
};

const NEWS_ICONS: Record<string, LucideIcon> = {
  barChart: BarChart2,
  clock: Clock,
  leaf: Leaf,
};

const NEWS_DATES: Record<string, string> = {
  barChart: "Jun 2026",
  clock: "May 2026",
  leaf: "Apr 2026",
};


const ROW_H = 44; 
const ROW_GAP = 6; 

function CultureSnapshot({ company }: Props) {
  const chips = [
    ...company.cultureValues.map((v) => ({ icon: v.icon, label: v.title })),
    { icon: "globe", label: "Global Impact" },
  ].slice(0, 4);

  return (
    <div className="bg-white px-6 py-6 flex flex-col">
      <h2 className="text-base font-bold text-gray-900 mb-4 leading-tight">
        Culture snapshot
      </h2>

      <div className="flex flex-col" style={{ gap: ROW_GAP }}>
        {chips.map(({ icon, label }) => {
          const Icon = CULTURE_ICONS[icon] ?? Lightbulb;
          return (
            <div
              key={label}
              className="flex items-center gap-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all cursor-default flex-shrink-0"
              style={{ height: ROW_H }}
            >
              <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Icon size={13} strokeWidth={1.8} className="text-[#e8294c]" />
              </div>
              <span className="text-sm font-medium text-gray-700 leading-none">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhyPeopleChoose({ company }: Props) {
  const items = company.whyChooseItems.slice(0, 4);

  return (
    <div className="bg-white px-6 py-6 flex flex-col">
      <h2 className="text-base font-bold text-gray-900 mb-4 leading-tight">
        Why Join {company.name}
      </h2>

      <div className="flex flex-col" style={{ gap: ROW_GAP }}>
        {items.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all cursor-default flex-shrink-0"
            style={{ height: ROW_H }}
          >
            <div className="w-4 h-4 rounded-full bg-green-50 border border-[#e8294c] flex items-center justify-center flex-shrink-0">
              <Check size={9} strokeWidth={3} className="text-[#e8294c]" />
            </div>
            <span className="text-sm font-medium text-gray-700 leading-none">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestUpdates({ company }: Props) {
  const items = company.newsItems.slice(0, 4);

  return (
    <div className="bg-white px-6 py-6 flex flex-col">
      <h2 className="text-base font-bold text-gray-900 mb-4 leading-tight">
        Latest updates
      </h2>

      <div className="flex flex-col" style={{ gap: ROW_GAP }}>
        {items.map((item) => {
          const Icon = NEWS_ICONS[item.icon] ?? BarChart2;

          return (
            <Link
              key={item.title}
              href={item.url ?? company.newsUrl}
              className="group flex items-center gap-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all flex-shrink-0"
              style={{ height: ROW_H }}
            >
              <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Icon size={13} strokeWidth={1.8} className="text-[#e8294c]" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 leading-none line-clamp-1">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function CompanyOverviewGrid({ company }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-gray-300 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <CultureSnapshot company={company} />
      <WhyPeopleChoose company={company} />
      <LatestUpdates company={company} />
    </div>
  );
}