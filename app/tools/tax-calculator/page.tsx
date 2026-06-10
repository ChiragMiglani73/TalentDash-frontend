import type { Metadata } from "next";

import { TaxCalculator } from "@/components/features/tools/TaxCalculator";
import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tax Calculator (India) | TalentDash",
  description: "Rough in-hand salary estimate from CTC.",
  path: "/tools/tax-calculator",
});

export default function TaxCalculatorPage() {
  return (
    <ToolShell
      title="Tax calculator"
      description="Illustrative in-hand estimate — not tax advice."
    >
      <TaxCalculator />
    </ToolShell>
  );
}
