import type { Metadata } from "next";

import { ToolShell } from "@/components/features/tools/ToolShell";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Resume Analyzer Checklist | TalentDash",
  description:
    "Structural checklist for tech resumes — impact, metrics, and clarity.",
  path: "/tools/resume-analyzer",
});

const checklist = [
  "One page for <10 YOE; two pages max for senior+",
  "Bullets lead with impact: metric → action → context",
  "Skills section matches target role keywords",
  "No dense paragraphs; scannable sections",
  "Company names link to recognizable brands or outcomes",
];

export default function ResumeAnalyzerPage() {
  return (
    <ToolShell
      title="Resume analyzer"
      description="Static checklist — AI review ships in a later release."
    >
      <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
        {checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ToolShell>
  );
}
