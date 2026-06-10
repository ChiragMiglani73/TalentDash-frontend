import { getAllCompanySlugs } from "@/lib/mock-data";

const SITE_URL =
  "https://talentdash.com";

export async function GET() {
  const slugs = getAllCompanySlugs();

  const regions = [
    "",
    "/in",
    "/us",
    "/uk",
  ];

  const now = new Date().toISOString();

  const urls = slugs.flatMap((slug) =>
    regions.map(
      (region) => `
  <url>
    <loc>${SITE_URL}${region}/companies/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`,
    ),
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
