"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, AreaChart, Area,
} from "recharts";

const ROLES = [
  { role:"Staff Engineer",        department:"Engineering", base:6800000, stock:3200000, bonus:1200000, total:11200000, low:5800000,  high:13000000, count:21,  yoe:"10–16 yrs", daysAgo:3  },
  { role:"Engineering Manager",   department:"Engineering", base:5200000, stock:2400000, bonus:800000,  total:8400000,  low:4400000,  high:9800000,  count:38,  yoe:"8–14 yrs",  daysAgo:7  },
  { role:"Product Manager",       department:"Product",     base:3800000, stock:1200000, bonus:600000,  total:5600000,  low:3000000,  high:6200000,  count:87,  yoe:"4–8 yrs",   daysAgo:1  },
  { role:"Software Engineer III", department:"Engineering", base:3200000, stock:1000000, bonus:600000,  total:4800000,  low:2600000,  high:5200000,  count:214, yoe:"3–6 yrs",   daysAgo:2  },
  { role:"Data Scientist",        department:"Engineering", base:2900000, stock:900000,  bonus:400000,  total:4200000,  low:2200000,  high:4900000,  count:63,  yoe:"2–5 yrs",   daysAgo:5  },
  { role:"UX Designer",           department:"Design",      base:2400000, stock:500000,  bonus:300000,  total:3200000,  low:1800000,  high:3800000,  count:49,  yoe:"3–7 yrs",   daysAgo:12 },
  { role:"Business Analyst",      department:"Operations",  base:1800000, stock:300000,  bonus:300000,  total:2400000,  low:1400000,  high:2900000,  count:72,  yoe:"1–4 yrs",   daysAgo:8  },
  { role:"Marketing Manager",     department:"Marketing",   base:2600000, stock:500000,  bonus:500000,  total:3600000,  low:2000000,  high:4200000,  count:34,  yoe:"4–9 yrs",   daysAgo:14 },
];

const LEVEL_DATA = [
  { level:"L3", label:"SWE II",    total:3800000, base:2600000 },
  { level:"L4", label:"SWE III",   total:4800000, base:3200000 },
  { level:"L5", label:"Senior",    total:6800000, base:4400000 },
  { level:"L6", label:"Staff",     total:11200000, base:6800000 },
  { level:"L7", label:"Principal", total:16600000, base:9200000 },
];

const TREND_DATA = [
  { year:"'21", median:3200000 },
  { year:"'22", median:3600000 },
  { year:"'23", median:4100000 },
  { year:"'24", median:4500000 },
  { year:"'25", median:4800000 },
];

const SUBMISSIONS = [
  { role:"SWE III",        level:"L4", location:"Bengaluru", yoe:"4 yrs",  total:4800000,  dept:"Engineering" },
  { role:"Senior SWE",     level:"L5", location:"Hyderabad", yoe:"7 yrs",  total:6600000,  dept:"Engineering" },
  { role:"Staff SWE",      level:"L6", location:"Gurugram",  yoe:"12 yrs", total:11200000, dept:"Engineering" },
  { role:"Product Manager",level:"L5", location:"Mumbai",    yoe:"6 yrs",  total:5600000,  dept:"Product"     },
  { role:"Data Scientist", level:"L4", location:"Bengaluru", yoe:"3 yrs",  total:4200000,  dept:"Engineering" },
  { role:"SWE II",         level:"L3", location:"Pune",      yoe:"1 yr",   total:3100000,  dept:"Engineering" },
];

const DEPTS = ["All","Engineering","Product","Design","Operations","Marketing"];

const DEPT_COLORS: Record<string, { bg: string; text: string }> = {
  Engineering: { bg:"#eff6ff", text:"#1d4ed8" },
  Product:     { bg:"#f0fdf4", text:"#15803d" },
  Design:      { bg:"#fdf4ff", text:"#7e22ce" },
  Operations:  { bg:"#fff7ed", text:"#c2410c" },
  Marketing:   { bg:"#fef2f2", text:"#b91c1c" },
};

const fmt = (n: number) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n/100000).toFixed(0)}L`;
  return `₹${(n/1000).toFixed(0)}K`;
};

const PRIMARY = "#e84040";

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-xs shadow-lg">
      <p className="font-bold text-[var(--color-text-primary)] mb-1.5 text-sm">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-[var(--color-text-muted)] mb-0.5">
          <span className="font-semibold" style={{ color: p.color }}>{p.name}</span>: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

function RoleCard({ r, isOpen, onClick }: any) {
  const dc = DEPT_COLORS[r.department] || { bg:"#f3f4f6", text:"#374151" };
  const baseShare  = Math.round((r.base  / r.total) * 100);
  const stockShare = Math.round((r.stock / r.total) * 100);
  const bonusShare = 100 - baseShare - stockShare;
  const markerPct  = Math.round(((r.total - r.low) / (r.high - r.low)) * 82);

  return (
    <div
      onClick={onClick}
      className={`bg-[var(--color-surface)] rounded-xl mb-2 cursor-pointer overflow-hidden transition-all border ${
        isOpen
          ? "border-[var(--color-primary)] shadow-[0_0_0_3px_#e8404018]"
          : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
      }`}
    >
      <div className="px-5 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[0.95rem] font-bold text-[var(--color-text-primary)] tracking-tight mb-1">{r.role}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded" style={{ background: dc.bg, color: dc.text }}>{r.department}</span>
            <span className="text-[var(--color-text-muted)] text-[0.73rem] font-medium">{r.count} reports</span>
            <span className="text-[var(--color-border)] text-xs">·</span>
            <span className="text-[var(--color-text-muted)] text-[0.73rem] font-medium">{r.yoe} exp</span>
            <span className="text-[var(--color-border)] text-xs">·</span>
            <span className="text-[var(--color-text-muted)] text-[0.73rem]">Updated {r.daysAgo}d ago</span>
          </div>
        </div>

        <div className="flex-1 px-4 flex flex-col gap-1.5">
          <div className="flex justify-between text-[0.7rem] text-[var(--color-text-muted)] font-medium">
            <span>{fmt(r.low)}</span>
            <span className="text-[var(--color-text-secondary)] font-semibold">Median</span>
            <span>{fmt(r.high)}</span>
          </div>
          <div className="h-1.5 bg-[var(--color-border)] rounded-full relative">
            <div className="h-full bg-red-200 rounded-full" style={{ width: `${markerPct}%` }} />
            <div
              className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${markerPct}%`, background: PRIMARY, outline: `2px solid ${PRIMARY}` }}
            />
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-[0.62rem] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Median comp</p>
          <p className="text-[1.3rem] font-extrabold text-[var(--color-text-primary)] tracking-tight leading-none">{fmt(r.total)}</p>
        </div>
        <span className={`text-[0.6rem] ml-1 transition-colors ${isOpen ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { label:"Base salary",  value:r.base,  color:"#111"    },
              { label:"Stock (RSU)",  value:r.stock, color:PRIMARY   },
              { label:"Annual bonus", value:r.bonus, color:"#7c3aed" },
            ].map(x => (
              <div key={x.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3.5 py-3">
                <p className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-1.5">{x.label}</p>
                <p className="text-base font-extrabold mb-2" style={{ color: x.color }}>{fmt(x.value)}</p>
                <div className="h-1 bg-[var(--color-border)] rounded-full">
                  <div className="h-full rounded-full" style={{ width:`${Math.round((x.value/r.total)*100)}%`, background: x.color }} />
                </div>
                <p className="text-[0.65rem] text-[var(--color-text-muted)] font-medium mt-1.5">{Math.round((x.value/r.total)*100)}% of total comp</p>
              </div>
            ))}
          </div>

          <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
            <div className="rounded-l-full bg-slate-800" style={{ flex: baseShare }} />
            <div style={{ flex: stockShare, background: PRIMARY }} />
            <div className="rounded-r-full bg-violet-600" style={{ flex: bonusShare }} />
          </div>
          <div className="flex gap-4 mt-2.5">
            {[["Base","#1e293b",baseShare],["Stock",PRIMARY,stockShare],["Bonus","#7c3aed",bonusShare]].map(([l,c,p]) => (
              <div key={l as string} className="flex items-center gap-1.5 text-[0.7rem] text-[var(--color-text-secondary)] font-medium">
                <div className="w-2 h-2 rounded-sm" style={{ background: c as string }} />
                {l} <span className="text-[var(--color-text-muted)]">{p}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InsightStrip() {
  return (
    <div className="bg-[var(--color-primary-muted)] border border-[var(--color-primary-subtle)] rounded-xl px-5 py-3.5 mb-3 flex items-center gap-4">
      <span className="text-2xl">📈</span>
      <div className="flex-1">
        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5">
          Median total comp has grown from ₹32L to ₹48L since 2021
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Based on {ROLES.reduce((s,r) => s + r.count, 0)} verified salary reports across all roles.
        </p>
      </div>
      <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap">
        View Trends ↓
      </button>
    </div>
  );
}

function LevelProgression() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 mb-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[0.95rem] font-bold text-[var(--color-text-primary)] mb-0.5">Compensation by level</p>
          <p className="text-xs text-[var(--color-text-muted)]">Median total comp by seniority · Google India</p>
        </div>
        <span className="bg-green-50 text-green-700 text-[0.68rem] font-bold px-2.5 py-1 rounded">Engineering</span>
      </div>

      <div className="flex gap-2 mb-4">
        {LEVEL_DATA.map((l, i) => (
          <div
            key={l.level}
            className={`flex-1 rounded-xl px-2.5 py-3 text-center border ${
              i === 3
                ? "bg-[var(--color-primary-muted)] border-[var(--color-primary-subtle)]"
                : "bg-[var(--color-background)] border-[var(--color-border)]"
            }`}
          >
            <p className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">{l.level}</p>
            <p className="text-[0.75rem] font-semibold text-[var(--color-text-secondary)] my-0.5">{l.label}</p>
            <p className={`text-[0.95rem] font-extrabold ${i === 3 ? "text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}>
              {fmt(l.total)}
            </p>
            {i < LEVEL_DATA.length - 1 && (
              <p className="text-[0.65rem] text-emerald-500 mt-1">
                +{Math.round(((LEVEL_DATA[i+1].total - l.total) / l.total) * 100)}%↑
              </p>
            )}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={LEVEL_DATA} margin={{ top:0, right:0, left:-24, bottom:0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="level" tick={{ fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => fmt(v)} tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Bar dataKey="base"  name="Base"     stackId="a" fill="#e5e7eb" />
          <Bar dataKey="total" name="Total TC"             fill={PRIMARY} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrendSection() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 mb-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[0.95rem] font-bold text-[var(--color-text-primary)] mb-0.5">Median total comp over time</p>
          <p className="text-xs text-[var(--color-text-muted)]">All roles · Google India · 2021–2025</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">2025 Median</p>
            <p className="text-base font-extrabold text-[var(--color-text-primary)]">₹48L</p>
          </div>
          <div className="text-right">
            <p className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">4-yr growth</p>
            <p className="text-base font-extrabold text-emerald-500">+50%</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={TREND_DATA} margin={{ top:4, right:8, left:-24, bottom:0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={PRIMARY} stopOpacity={0.12} />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize:12, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => fmt(v)} tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Area type="monotone" dataKey="median" name="Median TC" stroke={PRIMARY} strokeWidth={2.5} fill="url(#trendFill)" dot={{ fill:PRIMARY, r:4, strokeWidth:2, stroke:"#fff" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SubmissionsTable() {
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? SUBMISSIONS : SUBMISSIONS.slice(0, 4);
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 mb-3">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[0.95rem] font-bold text-[var(--color-text-primary)] mb-0.5">Recent salary submissions</p>
          <p className="text-xs text-[var(--color-text-muted)]">Verified submissions from Google India employees</p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
          + Share yours
        </button>
      </div>

      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="bg-[var(--color-background)] px-4 py-2.5 border-b border-[var(--color-border)]" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr" }}>
          {["Role · Level","Location","Experience","Total comp"].map(h => (
            <p key={h} className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">{h}</p>
          ))}
        </div>
        {rows.map((s, i) => (
          <div key={i} className={`px-4 py-2.5 items-center ${i < rows.length-1 ? "border-b border-[var(--color-border)]" : ""}`} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr" }}>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[var(--color-text-primary)] text-sm">{s.role}</span>
              <span className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-[0.62rem] font-bold px-1.5 py-0.5 rounded">{s.level}</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">{s.location}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{s.yoe}</p>
            <p className="text-sm font-bold text-[var(--color-primary)]">{fmt(s.total)}</p>
          </div>
        ))}
      </div>

      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-2.5 w-full py-2.5 bg-transparent border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-secondary)] cursor-pointer hover:bg-[var(--color-background)] transition-colors"
        >
          Show {SUBMISSIONS.length - 4} more submissions
        </button>
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-3">

      <div className="rounded-xl p-5 bg-[var(--color-text-primary)]">
        <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">TalentDash Pro</p>
        <p className="text-base font-bold text-white leading-snug mb-4">
          Unlock percentile breakdowns & peer benchmarks
        </p>
        {["P25 / P75 breakdowns","Negotiation scripts","Historical offers","Excel export"].map(f => (
          <div key={f} className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
            <span className="text-white/90 font-semibold">✓</span> {f}
          </div>
        ))}
        <button className="mt-4 w-full py-2.5 bg-white text-[var(--color-text-primary)] text-sm font-bold rounded-lg cursor-pointer hover:bg-[var(--color-background)] transition-colors">
          Upgrade to Pro · ₹499/mo
        </button>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--color-background)] border-b border-[var(--color-border)]">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">Sponsored · Hiring now</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">Ad</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#0052cc] flex items-center justify-center text-white text-sm font-black shrink-0">At</div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Atlassian</p>
              <p className="text-xs text-[var(--color-text-muted)]">Remote · Bengaluru</p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-3">
            Senior SWE roles open — competitive comp packages up to ₹1.2Cr TC.
          </p>
          <div className="flex gap-1.5 flex-wrap mb-3">
            {["SWE III","Staff Eng","EM"].map(t => (
              <span key={t} className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
          <button className="w-full py-2 bg-[#0052cc] text-white text-xs font-semibold rounded-lg cursor-pointer">
            View open roles →
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-background)] border border-dashed border-[var(--color-border)] rounded-xl p-5 text-center">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Advertisement</p>
        <div className="w-12 h-12 rounded-xl bg-[var(--color-border)] mx-auto mb-2 flex items-center justify-center text-xl">🏢</div>
        <p className="text-xs text-[var(--color-text-muted)]">300 × 250 display ad</p>
      </div>

      <div className="bg-[var(--color-primary-muted)] border border-[var(--color-primary-subtle)] rounded-xl p-4">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">🔔 Set a salary alert</p>
        <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-3">
          Get notified when new salary data is added for your role.
        </p>
        <input
          placeholder="Your role (e.g. SWE III)"
          className="w-full px-3 py-2 text-xs border border-[var(--color-border)] rounded-lg mb-2 outline-none bg-[var(--color-surface)] text-[var(--color-text-primary)] font-[inherit]"
        />
        <button className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
          Get alerts
        </button>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--color-background)] border-b border-[var(--color-border)]">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">Sponsored</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">Ad</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff6900] flex items-center justify-center text-white text-sm font-black shrink-0">Cf</div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Cloudflare</p>
              <p className="text-xs text-[var(--color-text-muted)]">Bengaluru · Full-time</p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-3">
            Infrastructure & platform roles. Stock-heavy packages, strong eng culture.
          </p>
          <button className="w-full py-2 bg-[#ff6900] text-white text-xs font-semibold rounded-lg cursor-pointer">
            Explore roles →
          </button>
        </div>
      </div>

    </div>
  );
}

export default function SalariesPage() {
  const [dept,     setDept]     = useState("All");
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("total");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ROLES
    .filter(r => dept === "All" || r.department === dept)
    .filter(r => r.role.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b as any)[sort] - (a as any)[sort]);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen font-sans">

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl mb-4 px-5 py-3 sticky top-3 z-10">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search roles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-[var(--color-border)] rounded-lg pl-8 pr-3 py-1.5 text-sm bg-[var(--color-background)] text-[var(--color-text-primary)] outline-none w-48 font-[inherit]"
            />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {DEPTS.map(d => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                  d === dept
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]"
                }`}
              >{d}</button>
            ))}
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="ml-auto px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm bg-[var(--color-surface)] text-[var(--color-text-secondary)] cursor-pointer outline-none font-[inherit]"
          >
            <option value="total">Sort: Total comp</option>
            <option value="base">Sort: Base salary</option>
            <option value="count">Sort: Most reports</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "1fr 280px" }}>

        <div>
          <InsightStrip />

          <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-3">
            {filtered.length} role{filtered.length !== 1 ? "s" : ""}{dept !== "All" ? ` in ${dept}` : ""}
          </p>

          {filtered.map(r => (
            <RoleCard
              key={r.role}
              r={r}
              isOpen={expanded === r.role}
              onClick={() => setExpanded(expanded === r.role ? null : r.role)}
            />
          ))}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Compensation insights</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <LevelProgression />
          <TrendSection />
          <SubmissionsTable />
        </div>

        <Sidebar />
      </div>
    </div>
  );
}