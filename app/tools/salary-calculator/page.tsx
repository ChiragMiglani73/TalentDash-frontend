import type { Metadata } from "next";

import { SalaryCalculator } from "@/components/features/tools/SalaryCalculator";
import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Salary Calculator — Total Compensation | TalentDash",
  description:
    "Calculate annual total compensation from base, bonus, and equity.",
  path: "/tools/salary-calculator",
});

export default function SalaryCalculatorPage() {
  return (
    <ToolShell
      title="Salary calculator"
      description="Client-side TC = base + bonus + stock."
    >
      <SalaryCalculator />
    </ToolShell>
  );
}
