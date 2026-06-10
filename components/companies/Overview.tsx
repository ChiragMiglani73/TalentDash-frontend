"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Briefcase,
  Globe,
  ExternalLink,
  ArrowRight,
} from "lucide-react";


interface Product {
  name: string;
  logo: string;
}

interface CultureValue {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseItem {
  text: string;
}

interface NewsItem {
  icon: string;
  title: string;
  description: string;
  url?: string;
}

interface Benefit {
  icon: string;
  label: string;
}

interface PopularRole {
  title: string;
  salaryCount: number;
}

interface SalaryInsight {
  role: string;
  medianLPA: number;
}

interface JobCategory {
  label: string;
  count: number;
}

interface FAQ {
  question: string;
  answer?: string;
}

interface SimilarCompany {
  name: string;
  slug: string;
  logoImage: string;
  rating: number;
}

export interface CompanyFullData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  isVerified: boolean;
  location: string;
  employeeCount: string;
  logoImage: string;
  coverImage: string;
  founded: string;
  revenue: string;
  revenueYear?: string;
  industry: string;
  website: string;
  glanceBlurb: string;
  overallRating?: number;
  totalReviews?: number;
  products: Product[];
  cultureValues: CultureValue[];
  cultureCtaTitle: string;
  cultureCtaDescription: string;
  cultureCtaUrl: string;
  whyChooseItems: WhyChooseItem[];
  newsItems: NewsItem[];
  newsUrl: string;
  benefitsBlurb: string;
  benefits: Benefit[];
  popularRoles: PopularRole[];
  salaryInsights: SalaryInsight[];
  jobsBlurb: string;
  jobCategories: JobCategory[];
  faqs: FAQ[];
  similarCompanies: SimilarCompany[];
}

interface Props {
  company: CompanyFullData;
}


function AtAGlance({ company }: { company: CompanyFullData }) {
  const stats = [
    { Icon: Calendar, label: "Founded", value: company.founded },
    { Icon: Users, label: "Employees", value: company.employeeCount },
    {
      Icon: DollarSign,
      label: "Revenue",
      value: company.revenue,
      sub: company.revenueYear ? `(${company.revenueYear})` : undefined,
    },
    { Icon: Briefcase, label: "Industry", value: company.industry },
    {
      Icon: MapPin,
      label: "Headquarters",
      value: company.location.split(",").slice(0, 2).join(", ").trim(),
    },
    { Icon: Globe, label: "Website", value: company.website, isLink: true },
  ];

  return (
    <section className="bg-white border border-gray-300 rounded-2xl px-7 pt-6 pb-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">At a glance</h2>
      <div className="flex items-stretch">
        <div className="flex-shrink-0 w-56 pr-6 border-r border-gray-300 flex flex-col justify-between">
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {company.glanceBlurb}
          </p>
          <Link
            href={`/companies/${company.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#e8294c] hover:underline"
          >
            View full profile <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex-1 flex items-center">
          {stats.map(({ Icon, label, value, sub, isLink }, idx) => (
            <div key={label} className="flex items-stretch flex-1">
              <div className="flex flex-col items-center justify-center gap-1.5 flex-1 px-4 text-center">
                <Icon size={22} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-xs text-gray-500">{label}</span>
                {isLink ? (
                  <a
                    href={`https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-sm font-bold text-[#e8294c] hover:underline"
                  >
                    {value}
                    <ExternalLink size={11} strokeWidth={2} />
                  </a>
                ) : (
                  <div className="text-sm font-bold text-gray-900 leading-snug">
                    {value}
                    {sub && (
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">
                        {sub}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {idx < stats.length - 1 && (
                <div className="w-px bg-gray-300 self-stretch my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WhatCompanyDoes({ company }: { company: CompanyFullData }) {
  return (
    <section className="bg-white border border-gray-300 rounded-2xl px-7 py-6 shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-56 pr-6 border-r border-gray-300 self-stretch flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
            What {company.name} does
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            From Search to YouTube, Android to Cloud — {company.name}&apos;s
            products and platforms power billions of interactions every day.
          </p>
        </div>
        <div className="flex-1 pl-6 flex items-center">
          <div className="flex flex-wrap gap-x-7 gap-y-4 items-center">
            {company.products.map((product) => (
              <div
                key={product.name}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={42}
                    height={42}
                    className="object-contain w-10 h-10 group-hover:-translate-y-0.5 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors text-center leading-tight">
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Exported Component ─────────────────

export default function HeroSection({ company }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <AtAGlance company={company} />
      <WhatCompanyDoes company={company} />
    </div>
  );
}