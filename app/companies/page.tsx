import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Compass,
  MapPin,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Puzzle,
  Shield,
  Award,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { CompanyLogo } from "./company-logo";
import { CompanySearch } from "./company-search";
import { companies } from "@/lib/mock-data";

export const metadata: Metadata = buildMetadata({
  title: "Browse Companies — Reviews, Salaries & Interviews | TalentDash",
  description:
    "Discover employers across technology, fintech, and IT services. Structured ratings and compensation data.",
  path: "/companies",
});


const popularSlugs = [
  "google", "amazon", "apple", "microsoft", "meta",
  "netflix", "tesla", "adobe", "salesforce", "infosys",
  "tcs", "ibm", "oracle", "sap", "hcltech",
] as const;

const fundingStages = [
  { label: "Pre-Seed",  color: "#9B59B6" },
  { label: "Seed",      color: "#E67E22" },
  { label: "Series A",  color: "#27AE60" },
  { label: "Series B",  color: "#2ECC71" },
  { label: "Series C",  color: "#3498DB" },
  { label: "Series D",  color: "#9B59B6" },
  { label: "Series E+", color: "#E74C3C" },
  { label: "Post IPO",  color: "#C0392B" },
] as const;

const aiCompanies = [
  { name: "OpenAI",          slug: "openai"      },
  { name: "NVIDIA",          slug: "nvidia"      },
  { name: "Anthropic",       slug: "anthropic"   },
  { name: "Google DeepMind", slug: "deepmind"    },
  { name: "Microsoft AI",    slug: "microsoft"   },
  { name: "Perplexity AI",   slug: "perplexity"  },
  { name: "Databricks",      slug: "databricks"  },
  { name: "Cohere",          slug: "cohere"      },
  { name: "Hugging Face",    slug: "huggingface" },
  { name: "Stability AI",    slug: "stabilityai" },
  { name: "Mistral AI",      slug: "mistral"     },
  { name: "Midjourney",      slug: "midjourney"  },
] as const;

const comparePairs = [
  { a: "google",   b: "meta",      aName: "Google",   bName: "Meta",       tag: "Compensation & Benefits" },
  { a: "amazon",   b: "microsoft", aName: "Amazon",   bName: "Microsoft",  tag: "Career Growth"           },
  { a: "openai",   b: "anthropic", aName: "OpenAI",   bName: "Anthropic",  tag: "Culture & Work-Life"     },
  { a: "stripe",   b: "paypal",    aName: "Stripe",   bName: "PayPal",     tag: "Growth & Stability"      },
  { a: "tcs",      b: "infosys",   aName: "TCS",      bName: "Infosys",    tag: "Salaries & Benefits"     },
  { a: "apple",    b: "tesla",     aName: "Apple",    bName: "Tesla",      tag: "Culture & Work-Life"     },
  { a: "deloitte", b: "pwc",       aName: "Deloitte", bName: "PwC",        tag: "Work-Life Balance"       },
  { a: "nvidia",   b: "amd",       aName: "NVIDIA",   bName: "AMD",        tag: "Career Growth"           },
] as const;

const exploreCategories = [
  { title: "Top paying companies",      count: "8,240", href: "/companies/top-rated"           },
  { title: "Remote friendly companies", count: "2,980", href: "/companies?tag=remote"          },
  { title: "Highly rated companies",    count: "6,511", href: "/companies/top-rated"           },
  { title: "Fast growing companies",    count: "4,120", href: "/companies?tag=growth"          },
  { title: "Product based companies",   count: "5,882", href: "/companies?tag=product"         },
  { title: "AI & tech companies",       count: "1,420", href: "/companies?industry=technology" },
] as const;

const quickWays = [
  { label: "By experience",    sub: "Internship to Leadership",         href: "/companies?experience=mid",      Icon: Clock      },
  { label: "By location",      sub: "Top cities & remote",              href: "/companies?location=Bengaluru",  Icon: MapPin     },
  { label: "By company size",  sub: "Startups to Enterprises",          href: "/companies?size=large",          Icon: Building2  },
  { label: "By industry",      sub: "Tech, Finance, Healthcare & more", href: "/companies?industry=technology", Icon: Puzzle     },
  { label: "By rating",        sub: "4★ & above companies",             href: "/companies/top-rated",           Icon: Star       },
  { label: "By funding stage", sub: "Pre-seed to Unicorns",             href: "/companies?stage=series-c",      Icon: TrendingUp },
  { label: "By known for",     sub: "Benefits, Culture & more",         href: "/companies?known-for=benefits",  Icon: Award      },
  { label: "By badges",        sub: "Verified & featured companies",    href: "/companies?badges=verified",     Icon: Shield     },
] as const;


function getCompanyBySlug(slug: string) {
  return companies.find((c) => c.slug === slug) ?? null;
}


function PopularCompanyChip({ slug }: { slug: string }) {
  const company = getCompanyBySlug(slug);
  const name    = company?.name         ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  const sub     = company?.headquarters ?? company?.industry ?? "";

  return (
    <Link
      href={`/companies/${slug}`}
      className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
    >
      <CompanyLogo slug={slug} name={name} size={32} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{name}</p>
        {sub && (
          <p className="truncate text-xs text-[var(--color-text-muted)]">{sub}</p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-primary)]" />
    </Link>
  );
}

function AICompanyChip({ name, slug }: { name: string; slug: string }) {
  return (
    <Link
      href={`/companies/${slug}`}
      className="group flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
    >
      <CompanyLogo slug={slug} name={name} size={24} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text-primary)]">
        {name}
      </span>
      <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-primary)]" />
    </Link>
  );
}

function CompareCard({
  a, b, aName, bName, tag,
}: {
  a: string; b: string; aName: string; bName: string; tag: string;
}) {
  return (
    <Link
      href={`/compare?c1=${a}&c2=${b}`}
      className="group flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 transition hover:border-[var(--color-primary)]"
    >
      <div className="flex items-center gap-2">
        <CompanyLogo slug={a} name={aName} size={28} />
        <span className="text-xs text-[var(--color-text-muted)]">vs</span>
        <CompanyLogo slug={b} name={bName} size={28} />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {aName} <span className="text-[var(--color-text-muted)]">vs</span> {bName}
        </p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{tag}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)]">
        View <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}


export default function CompaniesPage() {
  return (
    <main className="bg-[var(--color-background)] pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Hero Search ── */}
       <div className="relative z-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10">
  
  {/* Background Design */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
    
    {/* Grid Pattern */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    />

    {/* Top Left Gradient Blob */}
    <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-primary-muted)] opacity-50 blur-3xl" />

    {/* Top Right Gradient Blob */}
    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-primary-subtle)] opacity-40 blur-3xl" />

    {/* Center Glow */}
    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[140px]" />

    {/* Radial Highlight */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
      }}
    />

    {/* Dotted Noise Pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />

    {/* Decorative Ring */}
    <div className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-[var(--color-border)] opacity-20" />

    {/* Decorative Ring */}
    <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full border border-[var(--color-border)] opacity-20" />
  </div>

  {/* Existing Content */}
  <div className="relative text-center">
    <p className="inline-flex items-center rounded-full border border-[var(--color-primary)] bg-[rgba(239,68,68,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
  Companies
</p>

    <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
      Search for{" "}
      <span className="text-[var(--color-primary)]">
        Company
      </span>
    </h1>

    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
      Search companies to explore salaries, benefits, and more.
    </p>

    <CompanySearch companies={companies} />
  </div>
</div>

        {/* ── Popular Companies ── */}
        <section className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Popular Companies</h2>
            <Link href="/companies/all" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
              View all companies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {popularSlugs.map((slug) => (
              <PopularCompanyChip key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* ── Startups by Funding Stage ── */}
        <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
            Startups by Funding Stage
          </h2>
          <div className="flex flex-wrap gap-2">
            {fundingStages.map((stage) => (
              <Link
                key={stage.label}
                href={`/companies?stage=${stage.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-1.5 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                {stage.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top AI Companies ── */}
        <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Top AI Companies</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {aiCompanies.map((c) => (
              <AICompanyChip key={c.slug} name={c.name} slug={c.slug} />
            ))}
          </div>
        </section>

        {/* ── Promo Banner ── */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
          <Sparkles className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            Not sure where to start?{" "}
            <Link href="/companies/top-rated" className="font-semibold text-[var(--color-primary)]">
              Check out our Top 50 highest paying companies in India.
            </Link>
          </p>
          <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
        </div>

        {/* ── Compare Section ── */}
        <section className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Compare companies. Make <span className="text-[var(--color-primary)]">better</span> career moves.
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Compare salaries, benefits, culture, growth and more to find the right workplace for you.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-xl text-[var(--color-text-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                +
              </button>
              <span className="text-sm text-[var(--color-text-muted)]">vs</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-xl text-[var(--color-text-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                +
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Popular comparisons</h3>
              <Link href="/compare" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                View all comparisons <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {comparePairs.map(({ a, b, aName, bName, tag }) => (
                <CompareCard key={`${a}-${b}`} a={a} b={b} aName={aName} bName={bName} tag={tag} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                Can't decide which companies to compare?
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Explore top companies or view comparisons by category.
              </p>
            </div>
            <Link href="/companies/all" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
              Explore companies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── Explore Companies Your Way ── */}
        <section className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary-subtle)] bg-[var(--color-primary-muted)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                <Compass className="h-3 w-3" />
                Discover companies
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Explore companies your way
              </h2>
              <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">
                Find the right companies based on what matters to you.
              </p>
            </div>
            <Link
              href="/companies/all"
              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
            >
              View all companies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {exploreCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 transition hover:border-[var(--color-primary)]"
              >
                <div>
                  <p className="text-sm font-semibold leading-snug text-[var(--color-text-primary)]">
                    {cat.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{cat.count} companies</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-0.5 w-8 rounded-full bg-[var(--color-primary)]" />
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-primary)]" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
            <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">Quick ways to explore</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {quickWays.map((way) => (
                <Link
                  key={way.label}
                  href={way.href}
                  className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 transition hover:border-[var(--color-primary)]"
                >
                  <div className="flex items-center gap-2.5">
                    {/* ── UPDATED: icon bubble now uses primary color ── */}
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-primary-subtle)] bg-[var(--color-primary-muted)]">
                      <way.Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">
                        {way.label}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">{way.sub}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-primary)]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom promo strip ── */}
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-[var(--color-primary-subtle)] bg-[var(--color-primary-muted)] px-4 py-3">
          <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            Not sure where to start?{" "}
            <Link href="/companies/top-rated" className="font-semibold text-[var(--color-primary)]">
              Check out our Top 50 highest paying companies in India.
            </Link>
          </p>
          <ArrowRight className="ml-auto h-4 w-4 text-[var(--color-primary)]" />
        </div>

      </div>
    </main>
  );
}
