import { Metadata } from "next";
import Link from "next/link";
import HeroSection, { CompanyFullData } from "@/components/companies/Overview";
import CompanyOverviewGrid from "@/components/companies/CompanyOverviewGrid";
import BenefitsBar from "@/components/companies/BenefitsBar";
import SalaryJobsGrid from "@/components/companies/SalaryJobsGrid";
import CompanyFooterSection from "@/components/companies/CompanyFooterSection";


export const COMPANIES: Record<string, CompanyFullData> = {
  google: {
    slug: "google",
    name: "Google",
    tagline: "Internet • Cloud • AI • Advertising",
    description:
      "Google's mission is to organize the world's information and make it universally accessible and useful.",
    isVerified: true,
    location: "Mountain View, California, USA",
    employeeCount: "180K+",
    logoImage:
      "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
    coverImage: "",

    founded: "1998",
    revenue: "$305.6B",
    revenueYear: "2023",
    industry: "Internet Software & Services",
    website: "google.com",
    glanceBlurb:
      "Google builds products and platforms that help billions of people learn, connect and grow.",
    overallRating: 4.4,
    totalReviews: 24800,
    products: [
      {
        name: "Search",
        logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      },
      {
        name: "YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
      },
      {
        name: "Android",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
      },
      {
        name: "Google Cloud",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      },
      {
        name: "Gmail",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
      },
      {
        name: "Maps",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg",
      },
      {
        name: "Workspace",
        logo: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
      },
      {
        name: "Chrome",
        logo: "https://www.gstatic.com/images/branding/product/1x/chrome_48dp.png",
      },
    ],

    cultureValues: [
      {
        icon: "lightbulb",
        title: "Innovation",
        description: "Solve big problems and challenge the status quo.",
      },
      {
        icon: "users",
        title: "Collaboration",
        description: "Work together across teams and borders.",
      },
      {
        icon: "graduationCap",
        title: "Learning",
        description: "Grow your skills and help others do the same.",
      },
    ],
    cultureCtaTitle: "Explore how we work",
    cultureCtaDescription:
      "Discover Google's culture, values and ways of working.",
    cultureCtaUrl: "/companies/google/culture",

    whyChooseItems: [
      { text: "Work on products used by billions" },
      { text: "Competitive compensation and benefits" },
      { text: "Opportunities to learn and grow" },
      { text: "Inclusive and supportive culture" },
      { text: "Flexibility to balance work and life" },
      { text: "Make a global impact" },
    ],

    newsItems: [
      {
        icon: "barChart",
        title: "Google Cloud Next 2026 highlights",
        description:
          "See how we're transforming the future of AI and the cloud.",
        url: "/companies/google/news/cloud-next-2026",
      },
      {
        icon: "clock",
        title: "Sundar Pichai on the future of AI",
        description:
          "CEO Sundar Pichai shares his thoughts on AI and innovation.",
        url: "/companies/google/news/sundar-pichai-ai",
      },
      {
        icon: "leaf",
        title: "Our commitment to sustainability",
        description:
          "How we're building a more sustainable future for everyone.",
        url: "/companies/google/news/sustainability",
      },
      {
        icon: "barChart",
        title: "Google's Q1 2026 earnings report",
        description:
          "A strong start to the year with growth across all segments.",
        url: "/companies/google/news/q1-2026-earnings",
      }
    ],
    newsUrl: "/companies/google/news",

    popularRoles: [
      { title: "Software Engineer",   salaryCount: 18432 },
      { title: "Product Manager",     salaryCount: 6842  },
      { title: "Data Scientist",      salaryCount: 4723  },
      { title: "UX Designer",         salaryCount: 2814  },
      { title: "Solutions Architect", salaryCount: 2103  },
    ],
    salaryInsights: [
      { role: "Software Engineer", medianLPA: 32 },
      { role: "Product Manager",   medianLPA: 45 },
      { role: "Data Scientist",    medianLPA: 38 },
      { role: "UX Designer",       medianLPA: 28 },
    ],
    jobsBlurb: "Explore open roles and build the future with us.",
    jobCategories: [
      { label: "Engineering", count: 523 },
      { label: "Product",     count: 42  },
      { label: "Design",      count: 16  },
      { label: "Data",        count: 91  },
      { label: "Marketing",   count: 38  },
    ],

    faqs: [
      { question: "What is it like to work at Google?" },
      { question: "What are the benefits at Google?" },
      { question: "Does Google offer remote work?" },
      { question: "How is the work-life balance at Google?" },
      { question: "What are the career growth opportunities?" },
      { question: "How does Google support learning and development?" },
    ],
    similarCompanies: [
      { name: "Microsoft", slug: "microsoft", rating: 4.3, logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/48px-Microsoft_logo.svg.png" },
      { name: "Amazon",    slug: "amazon",    rating: 4.1, logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/48px-Amazon_logo.svg.png" },
      { name: "Meta",      slug: "meta",      rating: 4.2, logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/48px-Meta_Platforms_Inc._logo.svg.png" },
      { name: "Apple",     slug: "apple",     rating: 4.2, logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/32px-Apple_logo_black.svg.png" },
      { name: "Netflix",   slug: "netflix",   rating: 4.4, logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/48px-Netflix_2015_logo.svg.png" },
    ],

    benefitsBlurb:
      "Our benefits are designed to support your health, well-being and financial future.",
    benefits: [
      { icon: "heart",            label: "Health & Wellness" },
      { icon: "bookOpen",         label: "Learning & Development" },
      { icon: "baby",             label: "Parental Support" },
      { icon: "laptop",           label: "Flexible Work" },
      { icon: "trendingUp",       label: "Stock Options" },
      { icon: "piggyBank",        label: "Retirement Plans" },
      { icon: "utensilsCrossed",  label: "Meals & Snacks" },
      { icon: "bus",              label: "Commuter Benefits" },
    ],
  },
};


async function resolveSlug(input: any): Promise<string> {
  if (!input) return "";
  if (typeof input === "string") return input.trim().toLowerCase();
  try {
    if (input && typeof input.then === "function") {
      const resolved = await input;
      if (!resolved) return "";
      if (typeof resolved === "string") return resolved.trim().toLowerCase();
      if (typeof resolved.slug === "string") return resolved.slug.trim().toLowerCase();
      return String(resolved).trim().toLowerCase();
    }
  } catch {}
  if (input?.slug) return String(input.slug).trim().toLowerCase();
  return String(input).trim().toLowerCase();
}

async function getCompany(slug: string): Promise<CompanyFullData | null> {
  return COMPANIES[slug.toLowerCase().trim()] ?? null;
}


export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const slug = await resolveSlug((await params)?.slug);
  const company = await getCompany(slug);
  if (!company) return { title: "Company Not Found | TalentDash" };
  return {
    title: `${company.name} — Reviews, Salaries & Jobs | TalentDash`,
    description: company.description,
  };
}


export default async function CompanyPage({ params }: { params: any }) {
  const slug = await resolveSlug((await params)?.slug);
  const company = await getCompany(slug);

  if (!company) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-6">
        <h1 className="text-2xl font-bold text-gray-900">Company not found</h1>
        <p className="text-gray-500">
          We couldn&apos;t find a company with that name.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Debug: slug: <code>{slug}</code>
        </p>
        <Link
          href="/companies"
          className="text-[#e8294c] font-semibold hover:underline"
        >
          Browse all companies →
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <HeroSection company={company} />
        <CompanyOverviewGrid company={company} />
        <BenefitsBar company={company} />
        <SalaryJobsGrid company={company} />
        <CompanyFooterSection company={company} />
      </div>
    </main>
  );
}