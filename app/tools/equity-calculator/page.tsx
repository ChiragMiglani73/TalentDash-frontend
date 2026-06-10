import type { Metadata } from "next";

import { EquityCalculator } from "@/components/features/tools/EquityCalculator";
import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Equity / ESOP Calculator | TalentDash",
  description: "Estimate annual vesting from grant size and schedule.",
  path: "/tools/equity-calculator",
});

export default function EquityCalculatorPage() {
  return (
    <ToolShell
      title="Equity calculator"
      description="Annual vesting value = grant ÷ vesting years."
    >
      <EquityCalculator />
    </ToolShell>
  );
}
