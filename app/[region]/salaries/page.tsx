import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegionSalariesPage({
  searchParams,
}: PageProps) {
  const raw = await searchParams;
  const q = new URLSearchParams();

  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") {
      q.set(k, v);
    }
  }

  const query = q.toString();

  redirect(query ? `/salaries?${query}` : "/salaries");
}
