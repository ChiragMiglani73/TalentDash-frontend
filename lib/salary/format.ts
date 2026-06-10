import type { Currency } from "@/types/salary";

import {
  INR_PER_USD,
  type DisplayCurrency,
} from "@/lib/config/currency";

/** Smallest unit → major unit for display. */
export function toMajor(
  amountSmallest: number,
  currency: Currency,
): number {
  if (currency === "INR") {
    return amountSmallest / 100;
  }

  return amountSmallest / 100;
}

export function convertAmount(
  amountSmallest: number,
  from: Currency,
  to: DisplayCurrency,
): number {
  const major = toMajor(amountSmallest, from);

  if (from === to) {
    return major;
  }

  if (from === "INR" && to === "USD") {
    return major / INR_PER_USD;
  }

  if (from === "USD" && to === "INR") {
    return major * INR_PER_USD;
  }

  if (to === "USD") {
    const inr =
      from === "GBP"
        ? major * 105
        : from === "EUR"
          ? major * 90
          : major;

    return inr / INR_PER_USD;
  }

  const inr =
    from === "USD"
      ? major * INR_PER_USD
      : from === "GBP"
        ? major * 105
        : from === "EUR"
          ? major * 90
          : major;

  return inr;
}

export function formatLevel(level: string): string {
  return level.replace(/_/g, "-");
}

export function formatIndianNumber(
  value: number,
): string {
  const rounded = Math.round(value);
  const s = String(Math.abs(rounded));
  const sign = rounded < 0 ? "-" : "";

  if (s.length <= 3) {
    return `${sign}${s}`;
  }

  const lastThree = s.slice(-3);
  let rest = s.slice(0, -3);
  const parts: string[] = [];

  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }

  if (rest.length > 0) {
    parts.unshift(rest);
  }

  return `${sign}${parts.join(",")},${lastThree}`;
}

export function formatSalary(
  amountSmallest: number,
  sourceCurrency: Currency,
  displayCurrency: DisplayCurrency,
  options?: { compact?: boolean },
): string {
  const major = convertAmount(
    amountSmallest,
    sourceCurrency,
    displayCurrency,
  );

  if (displayCurrency === "INR") {
    const formatted = formatIndianNumber(major);

    if (options?.compact && major >= 100000) {
      if (major >= 10000000) {
        return `₹${(major / 10000000).toFixed(2)} Cr`;
      }

      return `₹${(major / 100000).toFixed(2)} L`;
    }

    return `₹${formatted}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(major);
}

/** US amount in thousands (e.g. 158 = $158K) → compact INR for home page previews. */
export function formatHomeInrFromUsdK(usdK: number): string {
  const lakhs = (usdK * 1000 * INR_PER_USD) / 100_000;

  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(1)} Cr`;
  }

  const rounded = Math.round(lakhs * 10) / 10;
  return `₹${rounded} LPA`;
}

export function formatOptionalSalary(
  amount: number,
  sourceCurrency: Currency,
  displayCurrency: DisplayCurrency,
): string {
  if (amount <= 0) {
    return "—";
  }

  return formatSalary(
    amount,
    sourceCurrency,
    displayCurrency,
  );
}
