import type {
  CompanyMeta,
  Level,
  SalaryRecord,
} from "@/types/salary";

export const companies: CompanyMeta[] = [
  {
    slug: "google",
    name: "Google",
    industry: "Technology",
    founded_year: 1998,
    headcount_range: "100,000+",
    headquarters: "Mountain View, CA",
  },
  {
    slug: "amazon",
    name: "Amazon",
    industry: "E-commerce & Cloud",
    founded_year: 1994,
    headcount_range: "1,000,000+",
    headquarters: "Seattle, WA",
  },
  {
    slug: "meta",
    name: "Meta",
    industry: "Technology",
    founded_year: 2004,
    headcount_range: "70,000+",
    headquarters: "Menlo Park, CA",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    industry: "Technology",
    founded_year: 1975,
    headcount_range: "200,000+",
    headquarters: "Redmond, WA",
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    industry: "E-commerce",
    founded_year: 2007,
    headcount_range: "50,000+",
    headquarters: "Bengaluru, India",
  },
  {
    slug: "meesho",
    name: "Meesho",
    industry: "Social Commerce",
    founded_year: 2015,
    headcount_range: "1,500+",
    headquarters: "Bengaluru, India",
  },
  {
    slug: "nvidia",
    name: "NVIDIA",
    industry: "Semiconductors",
    founded_year: 1993,
    headcount_range: "30,000+",
    headquarters: "Santa Clara, CA",
  },
  {
    slug: "tcs",
    name: "Tata Consultancy Services",
    industry: "IT Services",
    founded_year: 1968,
    headcount_range: "600,000+",
    headquarters: "Mumbai, India",
  },
  {
    slug: "infosys",
    name: "Infosys",
    industry: "IT Services",
    founded_year: 1981,
    headcount_range: "300,000+",
    headquarters: "Bengaluru, India",
  },
  {
    slug: "wipro",
    name: "Wipro",
    industry: "IT Services",
    founded_year: 1945,
    headcount_range: "250,000+",
    headquarters: "Bengaluru, India",
  },
  {
    slug: "razorpay",
    name: "Razorpay",
    industry: "Fintech",
    founded_year: 2014,
    headcount_range: "3,000+",
    headquarters: "Bengaluru, India",
  },
  {
    slug: "zepto",
    name: "Zepto",
    industry: "Quick Commerce",
    founded_year: 2021,
    headcount_range: "5,000+",
    headquarters: "Mumbai, India",
  },
  {
    slug: "accenture",
    name: "Accenture Solutions Private Limited India",
    industry: "Consulting",
    founded_year: 1989,
    headcount_range: "700,000+",
    headquarters: "Dublin, Ireland",
  },
];

const levels: Level[] = [
  "L3",
  "L4",
  "L5",
  "L6",
  "SDE_I",
  "SDE_II",
  "SDE_III",
  "STAFF",
  "PRINCIPAL",
];

const inCities = [
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Delhi",
  "Remote",
];

const usCities = [
  "San Francisco",
  "Seattle",
  "New York",
  "Remote",
];

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Data Analyst",
  "Engineering Manager",
];

function tc(
  base: number,
  bonus = 0,
  stock = 0,
): {
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
} {
  return {
    base_salary: base,
    bonus,
    stock,
    total_compensation: base + bonus + stock,
  };
}

/** Amounts in paise (INR) or cents (USD). */
function buildRecords(): SalaryRecord[] {
  const records: SalaryRecord[] = [];
  let id = 1;

  const add = (
    partial: Omit<
      SalaryRecord,
      | "id"
      | "total_compensation"
      | "submitted_at"
      | "confidence_score"
      | "is_verified"
      | "source"
    > &
      Partial<
        Pick<
          SalaryRecord,
          | "bonus"
          | "stock"
          | "source"
          | "confidence_score"
          | "is_verified"
        >
      >,
  ) => {
    const bonus = partial.bonus ?? 0;
    const stock = partial.stock ?? 0;
    const total =
      partial.base_salary + bonus + stock;

    records.push({
      id: `sal-${String(id++).padStart(3, "0")}`,
      source: partial.source ?? "CONTRIBUTOR",
      confidence_score:
        partial.confidence_score ?? 0.92,
      submitted_at: new Date(
        2025,
        (id % 12) - 1,
        (id % 28) + 1,
      ).toISOString(),
      is_verified: partial.is_verified ?? true,
      ...partial,
      bonus,
      stock,
      total_compensation: total,
    });
  };

  const companySlugs = companies.map((c) => c.slug);

  for (const slug of companySlugs) {
    const company = companies.find(
      (c) => c.slug === slug,
    )!;

    for (let i = 0; i < 5; i++) {
      const level = levels[i % levels.length]!;
      const city =
        inCities[i % inCities.length]!;
      const role = roles[i % roles.length]!;
      const baseLpa = 12 + i * 4 + companySlugs.indexOf(slug);

      add({
        company: company.name,
        company_slug: slug,
        role,
        level_standardized: level,
        location: city,
        currency: "INR",
        experience_years: 2 + i,
        ...tc(baseLpa * 100000 * 100),
      });
    }
  }

  const usBundles = [
    { slug: "google", level: "L4" as Level, tcUsd: 38000000 },
    { slug: "google", level: "L5" as Level, tcUsd: 52000000 },
    { slug: "amazon", level: "L4" as Level, tcUsd: 35000000 },
    { slug: "meta", level: "SDE_II" as Level, tcUsd: 32000000 },
    { slug: "microsoft", level: "L5" as Level, tcUsd: 41000000 },
    { slug: "nvidia", level: "L5" as Level, tcUsd: 48000000 },
  ];

  for (const b of usBundles) {
    const company = companies.find(
      (c) => c.slug === b.slug,
    )!;

    add({
      company: company.name,
      company_slug: b.slug,
      role: "Software Engineer",
      level_standardized: b.level,
      location: usCities[0]!,
      currency: "USD",
      experience_years: 6,
      base_salary: Math.round(b.tcUsd * 0.65),
      bonus: Math.round(b.tcUsd * 0.15),
      stock: Math.round(b.tcUsd * 0.2),
    });
  }

  add({
    company: "Amazon",
    company_slug: "amazon",
    role: "Software Engineer",
    level_standardized: "L4",
    location: "Bengaluru",
    currency: "INR",
    experience_years: 5,
    ...tc(28000000 * 100, 0, 0),
    bonus: 0,
    stock: 0,
  });

  add({
    company: "Razorpay",
    company_slug: "razorpay",
    role: "Software Engineer",
    level_standardized: "SDE_II",
    location: "Bengaluru",
    currency: "INR",
    experience_years: 4,
    ...tc(22000000 * 100, 2000000 * 100, 0),
    stock: 0,
  });

  add({
    company: "Google",
    company_slug: "google",
    role: "Software Engineer",
    level_standardized: "PRINCIPAL",
    location: "Bengaluru",
    currency: "INR",
    experience_years: 14,
    ...tc(65000000 * 100, 8000000 * 100, 12000000 * 100),
  });

  add({
    company: "Zepto",
    company_slug: "zepto",
    role: "Software Engineer",
    level_standardized: "SDE_III",
    location: "Mumbai",
    currency: "INR",
    experience_years: 7,
    ...tc(400000000 * 100, 20000000 * 100, 50000000 * 100),
  });

  add({
    company: companies.find((c) => c.slug === "accenture")!.name,
    company_slug: "accenture",
    role: "Data Analyst",
    level_standardized: "L3",
    location: "Pune",
    currency: "INR",
    experience_years: 2,
    ...tc(9000000 * 100),
  });

  add({
    company: "Flipkart",
    company_slug: "flipkart",
    role: "Product Manager",
    level_standardized: "L5",
    location: "Bengaluru",
    currency: "INR",
    experience_years: 9,
    ...tc(45000000 * 100, 5000000 * 100, 15000000 * 100),
  });

  add({
    company: "Meesho",
    company_slug: "meesho",
    role: "Software Engineer",
    level_standardized: "SDE_II",
    location: "Bengaluru",
    currency: "INR",
    experience_years: 3,
    ...tc(18000000 * 100, 1500000 * 100, 4000000 * 100),
  });

  add({
    company: "TCS",
    company_slug: "tcs",
    role: "Software Engineer",
    level_standardized: "SDE_I",
    location: "Hyderabad",
    currency: "INR",
    experience_years: 1,
    ...tc(6500000 * 100),
    is_verified: false,
    confidence_score: 0.75,
  });

  return records;
}

export const salaryRecords: SalaryRecord[] =
  buildRecords();

export function getSalaryById(
  id: string,
): SalaryRecord | undefined {
  return salaryRecords.find((r) => r.id === id);
}

export function getAllCompanySlugs(): string[] {
  return [
    ...new Set(
      salaryRecords.map((r) => r.company_slug),
    ),
  ];
}
