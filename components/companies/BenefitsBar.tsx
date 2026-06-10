"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon, Heart, BookOpen, Baby, Laptop, TrendingUp, PiggyBank, UtensilsCrossed, Bus } from "lucide-react";
import type { CompanyFullData } from "@/components/companies/Overview";

interface Props {
  company: CompanyFullData;
}

const ICONS: Record<string, LucideIcon> = {
  heart: Heart,
  bookOpen: BookOpen,
  baby: Baby,
  laptop: Laptop,
  trendingUp: TrendingUp,
  piggyBank: PiggyBank,
  utensilsCrossed: UtensilsCrossed,
  bus: Bus,
};

export default function BenefitsBar({ company }: Props) {
  const row1 = company.benefits.slice(0, 4);
  const row2 = company.benefits.slice(4, 8);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
      <div className="flex items-center gap-6">

        {/* Left: blurb */}
        <div className="flex-shrink-0 w-44">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">
            Benefits &amp; perks
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {company.benefitsBlurb}
          </p>
          <Link
            href={`/companies/${company.slug}/benefits`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#e8294c] hover:underline"
          >
            View all benefits
            <ArrowRight size={11} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-300 self-stretch flex-shrink-0" />

        {/* 2 rows × 4 icons */}
        <div className="flex-1 flex flex-col gap-4">
          {[row1, row2].map((row, ri) => (
            <div key={ri} className="grid grid-cols-4 gap-3">
              {row.map((benefit) => {
                const Icon = ICONS[benefit.icon] ?? Heart;
                return (
                  <div
                    key={benefit.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0">
                      <Icon size={17} strokeWidth={1.5} className="text-[#e8294c] group-hover:text-gray-800 transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 leading-tight group-hover:text-gray-800 transition-colors">
                      {benefit.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}