export const LEVELS = [
  "L3",
  "L4",
  "L5",
  "L6",
  "SDE_I",
  "SDE_II",
  "SDE_III",
  "STAFF",
  "PRINCIPAL",
  "IC4",
  "IC5",
] as const;

export type Level = (typeof LEVELS)[number];

export const CURRENCIES = ["INR", "USD", "GBP", "EUR"] as const;

export type Currency = (typeof CURRENCIES)[number];

export const SOURCES = [
  "CONTRIBUTOR",
  "SCRAPED",
  "AI_INFERRED",
] as const;

export type Source = (typeof SOURCES)[number];

/** Integration contract shape — amounts in smallest currency unit (paise/cents). */
export type SalaryRecord = {
  id: string;
  company: string;
  company_slug: string;
  role: string;
  level_standardized: Level;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  source: Source;
  confidence_score: number;
  submitted_at: string;
  is_verified: boolean;
};

export type CompanyMeta = {
  slug: string;
  name: string;
  industry: string;
  founded_year: number | null;
  headcount_range: string;
  headquarters: string;
};

export type SortField =
  | "total_compensation"
  | "base_salary"
  | "company"
  | "role"
  | "level_standardized"
  | "location"
  | "experience_years";

export type SortDirection = "asc" | "desc";

export type SalarySearchParams = {
  company?: string;
  role?: string;
  level?: string | string[];
  location?: string;
  currency?: Currency;
  sort?: string;
  page?: string;
};
