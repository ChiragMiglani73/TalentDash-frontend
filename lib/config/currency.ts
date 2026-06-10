/** Fixed display conversion for salary table currency toggle (trial requirement). */
export const INR_PER_USD = 83;

export const DISPLAY_CURRENCIES = ["INR", "USD"] as const;

export type DisplayCurrency =
  (typeof DISPLAY_CURRENCIES)[number];
