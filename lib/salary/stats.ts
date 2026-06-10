import type {
  CompanyMeta,
  Level,
  SalaryRecord,
} from "@/types/salary";

export function median(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (
      (sorted[mid - 1]! + sorted[mid]!) / 2
    );
  }

  return sorted[mid]!;
}

export function getCompanyRecords(
  slug: string,
  records: SalaryRecord[],
): SalaryRecord[] {
  return records.filter(
    (r) => r.company_slug === slug,
  );
}

export function computeMedianTc(
  records: SalaryRecord[],
): number {
  return median(
    records.map((r) => r.total_compensation),
  );
}

export function computeTcRange(
  records: SalaryRecord[],
): { min: number; max: number } {
  if (records.length === 0) {
    return { min: 0, max: 0 };
  }

  const values = records.map(
    (r) => r.total_compensation,
  );

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

export function computeLevelDistribution(
  records: SalaryRecord[],
): Record<string, number> {
  const dist: Record<string, number> = {};

  for (const r of records) {
    dist[r.level_standardized] =
      (dist[r.level_standardized] ?? 0) + 1;
  }

  return dist;
}

export function getCompanyBySlug(
  slug: string,
  companies: CompanyMeta[],
): CompanyMeta | undefined {
  return companies.find((c) => c.slug === slug);
}

export function levelPercentages(
  distribution: Record<string, number>,
): { level: Level; count: number; pct: number }[] {
  const total = Object.values(distribution).reduce(
    (a, b) => a + b,
    0,
  );

  if (total === 0) {
    return [];
  }

  return Object.entries(distribution)
    .map(([level, count]) => ({
      level: level as Level,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
