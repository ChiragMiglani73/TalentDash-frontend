import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RegionCompanyPage({
  params,
}: PageProps) {
  const { slug } = await params;

  redirect(`/companies/${slug}`);
}
