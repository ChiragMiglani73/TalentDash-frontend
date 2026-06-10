import type { Metadata } from "next";

import { HikeCalculator } from "@/components/features/tools/HikeCalculator";
import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Salary Hike Calculator | TalentDash",
  description: "Calculate percentage hike between two CTC figures.",
  path: "/tools/hike-calculator",
});

export default function HikeCalculatorPage() {
  return (
    <ToolShell
      title="Hike calculator"
      description="See your percentage increase at a glance."
    >
      <HikeCalculator />
    </ToolShell>
  );
}
