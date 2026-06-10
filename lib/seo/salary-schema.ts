import type { SalaryRecord } from "@/types/salary";

const SITE = "https://talentdash.com";

export function buildSalaryDatasetSchema(
  records: SalaryRecord[],
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "TalentDash Salary Records",
    description,
    url: `${SITE}/salaries`,
    creator: {
      "@type": "Organization",
      name: "TalentDash",
      url: SITE,
    },
    distribution: records.slice(0, 50).map((r) => ({
      "@type": "DataDownload",
      contentUrl: `${SITE}/companies/${r.company_slug}`,
      description: `${r.role} ${r.level_standardized} at ${r.company} in ${r.location}`,
    })),
  };
}

export function buildCompanySchema(
  companyName: string,
  slug: string,
  industry: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    url: `${SITE}/companies/${slug}`,
    industry,
  };
}
