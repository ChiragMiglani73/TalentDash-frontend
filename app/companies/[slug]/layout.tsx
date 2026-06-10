import { Metadata } from "next";
import HeroShell from "@/components/companies/HeroShell";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Google — Reviews, Salaries & Jobs | TalentDash",
    description:
      "Google develops products and platforms used by billions of people worldwide.",
  };
}

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = {
    slug: "google",
    name: "Google",
    tagline: "Organizing the world's information",
    description:
      "Google develops products and platforms used by billions of people worldwide.",
    isVerified: true,
    location: "Mountain View, California, USA",
    employeeCount: "180K+",
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    coverImage: "",
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-6 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <HeroShell company={company} />
        <div className="flex flex-col gap-4 mt-4">
          {children}
        </div>
      </div>
    </main>
  );
}