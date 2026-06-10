"use client";

import { useCallback, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { LEVELS } from "@/types/salary";

import type { DisplayCurrency } from "@/lib/config/currency";

import { formatLevel } from "@/lib/salary/format";

type SalaryFiltersProps = {
  roles: string[];
  locations: string[];
  basePath?: string;
};

export function SalaryFilters({
  roles,
  locations,
  basePath,
}: SalaryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const path = basePath ?? pathname;

  const [companyInput, setCompanyInput] = useState(
    searchParams.get("company") ?? "",
  );

  useEffect(() => {
    setCompanyInput(
      searchParams.get("company") ?? "",
    );
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(
        searchParams.toString(),
      );

      for (const [key, value] of Object.entries(
        updates,
      )) {
        if (
          value === null ||
          value === "" ||
          value === undefined
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      params.delete("page");

      const q = params.toString();

      router.push(q ? `${path}?${q}` : path, {
        scroll: false,
      });
    },
    [path, router, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const current =
        searchParams.get("company") ?? "";

      if (companyInput !== current) {
        updateParams({
          company: companyInput || null,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [companyInput, searchParams, updateParams]);

  const selectedLevels =
    searchParams.get("level")?.split(",") ?? [];

  const display =
    (searchParams.get("display") as DisplayCurrency) ??
    "INR";

  const toggleLevel = (level: string) => {
    const next = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];

    updateParams({
      level: next.length ? next.join(",") : null,
    });
  };

  const clearAll = () => {
    setCompanyInput("");
    router.push(path);
  };

  return (
    <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-text-muted)]">
            Company
          </span>

          <input
            type="search"
            value={companyInput}
            onChange={(e) =>
              setCompanyInput(e.target.value)
            }
            placeholder="Search company…"
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-text-muted)]">
            Role
          </span>

          <select
            value={searchParams.get("role") ?? ""}
            onChange={(e) =>
              updateParams({
                role: e.target.value || null,
              })
            }
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="">All roles</option>

            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-text-muted)]">
            Location
          </span>

          <select
            value={
              searchParams.get("location") ?? ""
            }
            onChange={(e) =>
              updateParams({
                location: e.target.value || null,
              })
            }
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="">All locations</option>

            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1 block text-xs font-medium text-[var(--color-text-muted)]">
            Currency
          </span>

          <div className="flex rounded-lg border border-[var(--color-border)] p-1">
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() =>
                  updateParams({
                    display: c === "INR" ? null : c,
                  })
                }
                className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-colors ${
                  display === c
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium text-[var(--color-text-muted)]">
          Level
        </span>

        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <label
              key={level}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2 py-1 text-xs has-[:checked]:border-[var(--color-data)] has-[:checked]:bg-[color-mix(in_srgb,var(--color-data)_12%,white)]"
            >
              <input
                type="checkbox"
                checked={selectedLevels.includes(
                  level,
                )}
                onChange={() => toggleLevel(level)}
                className="rounded"
              />

              {formatLevel(level)}
            </label>
          ))}
        </div>
      </div>

      {searchParams.toString() && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-[var(--color-data)] hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
