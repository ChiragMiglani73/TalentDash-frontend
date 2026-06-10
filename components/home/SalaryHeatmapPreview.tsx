"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

// ── Salary by Role data ───────────────────────────────────────────────────────
const ROLES = [
  { label: "Software Engineer", value: 28.4 },
  { label: "Data Scientist",    value: 24.7 },
  { label: "Product Manager",   value: 31.2 },
  { label: "Marketing Manager", value: 16.8 },
  { label: "DevOps Engineer",   value: 26.1 },
  { label: "UX Designer",       value: 19.5 },
];
const MAX_VAL = 40;

// ── D3 World Map ──────────────────────────────────────────────────────────────
function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const world = await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      ).then((r) => r.json()) as Topology<{ countries: GeometryCollection }>;

      if (cancelled || !svgRef.current) return;

      const svg = svgRef.current;
      const W = svg.clientWidth || 480;
      const H = svg.clientHeight || 220;

      // Clear previous
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const projection = d3
        .geoNaturalEarth1()
        .scale((W / 640) * 100)
        .translate([W / 2, H / 2]);

      const pathGen = d3.geoPath().projection(projection);
      const countries = topojson.feature(world, world.objects.countries);

      const primary =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-primary")
          .trim() || "#ff5a5f";

      const sel = d3.select(svg);

      // Country fills
      sel
        .append("g")
        .selectAll("path")
        .data((countries as GeoJSON.FeatureCollection).features)
        .enter()
        .append("path")
        .attr("d", pathGen as any)
        .attr("fill", primary)
        .attr("fill-opacity", (d: any) => (String(d.id) === "356" ? 0.85 : 0.28))
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);

      // India glow ring
      const indiaPt = projection([78.9629, 20.5937]);
      if (indiaPt) {
        const g = sel.append("g");
        g.append("circle").attr("cx", indiaPt[0]).attr("cy", indiaPt[1]).attr("r", 18).attr("fill", primary).attr("fill-opacity", 0.22);
        g.append("circle").attr("cx", indiaPt[0]).attr("cy", indiaPt[1]).attr("r", 9).attr("fill", primary).attr("fill-opacity", 0.50);
        g.append("circle").attr("cx", indiaPt[0]).attr("cy", indiaPt[1]).attr("r", 4.5).attr("fill", primary).attr("fill-opacity", 1.0);
        g.append("circle").attr("cx", indiaPt[0]).attr("cy", indiaPt[1]).attr("r", 2).attr("fill", "white");
      }

      // Other tech hub dots
      const hubs: [number, number, number][] = [
        [-95.7, 37.1, 0.70],   // USA
        [103.8, 1.35, 0.75],   // Singapore
        [55.3, 25.2, 0.65],    // UAE
        [133.8, -25.3, 0.58],  // Australia
        [-1.5, 52.0, 0.58],    // UK
        [13.4, 52.5, 0.55],    // Germany
      ];
      hubs.forEach(([lng, lat, op]) => {
        const pt = projection([lng, lat]);
        if (!pt) return;
        sel.append("circle").attr("cx", pt[0]).attr("cy", pt[1]).attr("r", 4).attr("fill", primary).attr("fill-opacity", op);
      });
    }

    draw();
    return () => { cancelled = true; };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full"
      style={{ height: 220, display: "block" }}
      aria-hidden
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function SalaryHeatmapPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">

      {/* LEFT: Compensation Heatmap */}
      <div
        className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        <div className="mb-4">
          <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Compensation Heatmap</h3>
          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
            Explore salary levels across locations
          </p>
        </div>

        <div className="flex-1">
          <WorldMap />
        </div>

        <a
          href="/salaries/heatmap"
          className="mt-4 inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--color-primary)", borderTop: "1px solid var(--color-border)" }}
        >
          View heatmap
          <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

      {/* RIGHT: Salary by Role */}
      <div
        className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        <div className="mb-5">
          <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Salary by Role</h3>
          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
            Explore average total compensation
          </p>
        </div>

        <div className="flex-1 space-y-4">
          {ROLES.map(({ label, value }) => {
            const pct = (value / MAX_VAL) * 100;
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-[13px] text-[var(--color-text-primary)]">
                  {label}
                </span>
                <div
                  className="flex-1 relative h-[6px] rounded-full overflow-hidden"
                  style={{ background: "var(--color-border)" }}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(to right, var(--color-primary), color-mix(in srgb, var(--color-primary) 50%, white))`,
                    }}
                  />
                </div>
                <span className="w-20 text-right text-[13px] font-semibold text-[var(--color-text-primary)] shrink-0">
                  ₹{value} LPA
                </span>
              </div>
            );
          })}
        </div>

        <a
          href="/salaries"
          className="mt-5 inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--color-primary)", borderTop: "1px solid var(--color-border)" }}
        >
          Explore all roles
          <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

    </div>
  );
}