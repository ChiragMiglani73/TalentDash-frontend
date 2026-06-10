"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X } from "lucide-react";

type Company = {
  slug: string;
  name: string;
  industry?: string;
  headquarters?: string;
};

export function CompanySearch({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length === 0
    ? []
    : companies
        .filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.industry?.toLowerCase().includes(query.toLowerCase()) ||
          c.headquarters?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = highlighted >= 0 ? results[highlighted] : results[0];
      if (target) navigate(target.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function navigate(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/companies/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      navigate(highlighted >= 0 ? results[highlighted].slug : results[0].slug);
    }
  }

  return (
    <div ref={containerRef} className="relative mx-auto mt-6 max-w-md">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center gap-2 rounded-xl border bg-[var(--color-background)] px-4 py-3 transition ${
            open && results.length > 0
              ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary-muted)]"
              : "border-[var(--color-border)]"
          }`}
        >
          <Search className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlighted(-1);
            }}
            onFocus={() => {
              if (query.trim()) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for a company..."
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="flex-shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
          {results.map((company, i) => (
            <button
              key={company.slug}
              type="button"
              onMouseDown={(e) => {
                // prevent input blur before click fires
                e.preventDefault();
                navigate(company.slug);
              }}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                highlighted === i
                  ? "bg-[var(--color-primary-muted)]"
                  : "hover:bg-[var(--color-primary-muted)]"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {company.name}
                </p>
                {(company.industry || company.headquarters) && (
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {[company.industry, company.headquarters].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-lg">
          <p className="text-sm text-[var(--color-text-muted)]">
            No companies found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}