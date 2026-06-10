import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Offer Comparator | TalentDash",
  description: "Compare two salary records with deltas.",
  path: "/tools/offer-comparator",
});

export default function OfferComparatorPage() {
  return (
    <ToolShell
      title="Offer comparator"
      description="Use the full compare experience for record-level deltas."
    >
      <Button href="/compare" variant="primary">
        Open compare tool
      </Button>
    </ToolShell>
  );
}
