"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Star, ChevronRight } from "lucide-react";
import type { CompanyFullData } from "@/components/companies/Overview";


interface Props {
  company: CompanyFullData;
}


function FAQSection({ company }: { company: CompanyFullData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const left = company.faqs.filter((_, i) => i % 2 === 0);
  const right = company.faqs.filter((_, i) => i % 2 !== 0);

  const toggle = (idx: number) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  const FAQItem = ({ faq, idx }: { faq: CompanyFullData["faqs"][0]; idx: number }) => {
    const isOpen = openIdx === idx;
    return (
      <button
        onClick={() => toggle(idx)}
        className="w-full flex items-center justify-between gap-4 py-3.5 border-b border-gray-300 text-left group"
      >
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-snug">
          {faq.question}
        </span>
        <span className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
          {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-8 py-7">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Frequently asked questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div>
          {left.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} idx={i * 2} />
          ))}
        </div>
        <div>
          {right.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} idx={i * 2 + 1} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Link
          href={`/companies/${company.slug}/qa`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e8294c] hover:underline"
        >
          View all FAQs
          <span className="text-base leading-none">→</span>
        </Link>
      </div>
    </div>
  );
}


function SimilarCompanies({ company }: { company: CompanyFullData }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-8 py-7">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Explore similar companies
      </h2>

      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
        {company.similarCompanies.map((c) => (
          <div
            key={c.name}
            className="flex-shrink-0 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-w-[180px] hover:border-gray-300 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
              <Image
                src={c.logoImage}
                alt={c.name}
                width={28}
                height={28}
                className="object-contain w-7 h-7"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 leading-snug truncate">
                {c.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={11} strokeWidth={0} fill="#f59e0b" className="text-amber-400" />
                <span className="text-xs text-gray-500">{c.rating}</span>
              </div>
            </div>
            <Link
              href={`/companies/${c.slug}`}
              className="text-xs font-semibold text-[#e8294c] hover:underline flex-shrink-0"
            >
              View
            </Link>
          </div>
        ))}

        {/* Arrow hint */}
        <div className="flex-shrink-0 flex items-center justify-center w-8">
          <ChevronRight size={18} className="text-gray-300" />
        </div>
      </div>
    </div>
  );
}


function CTABanner({ company }: { company: CompanyFullData }) {
  return (
    <div className="bg-red-50/70 border border-red-100 rounded-2xl px-8 py-5 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {/* Icon box */}
        <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8294c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Share your experience</p>
          <p className="text-sm text-gray-500">Help others make better career decisions</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="h-10 px-6 rounded-lg text-white text-sm font-semibold transition-all hover:-translate-y-px"
          style={{ background: "#e8294c", boxShadow: "0 2px 12px rgba(232,41,76,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d0203e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#e8294c")}
        >
          Write a Review
        </button>
        <button className="h-10 px-6 rounded-lg bg-white border border-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-50 hover:-translate-y-px transition-all">
          Add Salary
        </button>
      </div>
    </div>
  );
}


export default function CompanyFooterSection({ company }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FAQSection company={company} />
      <SimilarCompanies company={company} />
      <CTABanner company={company} />
    </div>
  );
}