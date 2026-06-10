"use client";

const DOMAIN_MAP: Record<string, string> = {
  google: "google.com",
  amazon: "amazon.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  meta: "meta.com",
  netflix: "netflix.com",
  tesla: "tesla.com",
  adobe: "adobe.com",
  salesforce: "salesforce.com",
  infosys: "infosys.com",
  tcs: "tcs.com",
  ibm: "ibm.com",
  oracle: "oracle.com",
  sap: "sap.com",
  hcltech: "hcltech.com",
  openai: "openai.com",
  nvidia: "nvidia.com",
  anthropic: "anthropic.com",
  deepmind: "deepmind.com",
  perplexity: "perplexity.ai",
  databricks: "databricks.com",
  cohere: "cohere.com",
  huggingface: "huggingface.co",
  stabilityai: "stability.ai",
  mistral: "mistral.ai",
  midjourney: "midjourney.com",
  stripe: "stripe.com",
  paypal: "paypal.com",
  deloitte: "deloitte.com",
  pwc: "pwc.com",
  amd: "amd.com",
  flipkart: "flipkart.com",
};

function getLogoUrl(slug: string, size: number): string {
  const domain = DOMAIN_MAP[slug] ?? `${slug}.com`;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function CompanyLogo({
  slug,
  name,
  size = 32,
}: {
  slug: string;
  name: string;
  size?: number;
}) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
      style={{ width: size, height: size }}
    >
      {/* Fallback initial — always sits behind the img */}
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)]"
        aria-hidden
      >
        {name.charAt(0).toUpperCase()}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getLogoUrl(slug, size * 2)}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="absolute inset-0 h-full w-full object-contain p-0.5"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}