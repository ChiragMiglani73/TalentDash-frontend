"use client";

import { useState, useRef, useEffect } from "react";

type Department = "All Roles" | "Engineering" | "Product" | "Design" | "Data" | "Marketing" | "Operations";

interface Job {
  id: string;
  title: string;
  department: Department;
  location: string;
  employmentType: string;
  experienceLevel: string;
  experienceYears: string;
  postedAt: string | null;
  featured?: boolean;
  salary?: string;
  team?: string;
  perks?: string[];
  description?: string;
  skills?: string[];
  applicants?: number;
}

const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer — Platform",
    department: "Engineering",
    location: "San Francisco / Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    experienceYears: "5+ yrs",
    postedAt: "2d ago",
    featured: true,
    salary: "₹48L – ₹72L",
    team: "Infrastructure",
    perks: ["Remote OK", "Stock", "Visa"],
    description: "Own the core platform powering 10M+ requests/day. Work with Go, Kubernetes, and distributed systems at scale.",
    skills: ["Go", "Kubernetes", "PostgreSQL", "gRPC"],
    applicants: 34,
  },
  {
    id: "2",
    title: "Product Manager, Growth",
    department: "Product",
    location: "New York / Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    experienceYears: "3–5 yrs",
    postedAt: "5d ago",
    salary: "₹32L – ₹48L",
    team: "Growth",
    perks: ["Hybrid", "Bonus", "Health"],
    description: "Drive user acquisition and activation metrics for our fastest-growing product line.",
    skills: ["Analytics", "A/B Testing", "SQL", "Figma"],
    applicants: 61,
  },
  {
    id: "3",
    title: "Staff UX Designer",
    department: "Design",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Staff",
    experienceYears: "7+ yrs",
    postedAt: "1d ago",
    salary: "₹40L – ₹60L",
    team: "Design Systems",
    perks: ["Fully Remote", "Stock", "L&D"],
    description: "Shape the visual language for a product used by millions. Lead the design system and mentor junior designers.",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    applicants: 18,
  },
  {
    id: "4",
    title: "Data Scientist — Revenue Analytics",
    department: "Data",
    location: "San Francisco",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    experienceYears: "2–4 yrs",
    postedAt: "3d ago",
    salary: "₹28L – ₹42L",
    team: "Analytics",
    perks: ["On-site", "Meals", "Gym"],
    description: "Build models that directly influence pricing and revenue strategy for a $200M ARR business.",
    skills: ["Python", "ML", "dbt", "Looker"],
    applicants: 47,
  },
  {
    id: "5",
    title: "Marketing Manager, Brand",
    department: "Marketing",
    location: "Austin / Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    experienceYears: "3+ yrs",
    postedAt: "1w ago",
    salary: "₹22L – ₹32L",
    team: "Brand",
    perks: ["Remote OK", "Budget", "Equity"],
    description: "Own the brand narrative across channels. You'll shape how the world sees us.",
    skills: ["Brand Strategy", "Copywriting", "Content", "SEO"],
    applicants: 82,
  },
];

const FILTER_CHIPS: Department[] = ["All Roles", "Engineering", "Product", "Design", "Data", "Marketing", "Operations"];

const DEPT_COLOR: Record<string, string> = {
  Engineering: "bg-blue-50 text-blue-700 border-blue-100",
  Product:     "bg-emerald-50 text-emerald-700 border-emerald-100",
  Design:      "bg-violet-50 text-violet-700 border-violet-100",
  Data:        "bg-amber-50 text-amber-700 border-amber-100",
  Marketing:   "bg-pink-50 text-pink-700 border-pink-100",
  Operations:  "bg-slate-50 text-slate-600 border-slate-100",
};

const SIMILAR_ROLES = [
  { title: "Senior Product Manager", company: "Lattice", location: "San Francisco", salary: "₹52L" },
  { title: "Engineering Manager, Platform", company: "Rippling", location: "Remote", salary: "₹80L" },
  { title: "Staff Data Engineer", company: "Greenhouse", location: "New York", salary: "₹65L" },
];

const ALSO_HIRING = [
  { name: "Workday", tagline: "HR SaaS", location: "Pleasanton, CA", openRoles: 12 },
  { name: "Lever", tagline: "Recruiting Software", location: "Remote", openRoles: 7 },
  { name: "HiBob", tagline: "HRIS", location: "New York / Tel Aviv", openRoles: 9 },
];

function JobCard({ job, featured }: { job: Job; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const dc = DEPT_COLOR[job.department] || "bg-slate-50 text-slate-600 border-slate-100";

  return (
    <div
      className={`bg-white rounded-xl mb-2.5 overflow-hidden border transition-all duration-200 ${
        featured
          ? "border-l-[3px] border-l-[#ff5a5f] border-[#ebebeb] shadow-sm"
          : expanded
          ? "border-[#e0e0e0] shadow-md"
          : "border-[#ebebeb] hover:border-[#d0d0d0] hover:shadow-sm"
      }`}
      style={{ transform: expanded ? "translateY(-1px)" : "none", transition: "all 0.2s ease" }}
    >
      {featured && (
        <div className="px-5 pt-4 pb-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider bg-[#fff0f0] text-[#ff5a5f] px-2.5 py-1 rounded-full">
            ⚡ Featured
          </span>
        </div>
      )}

      <div
        className="px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className={`font-bold text-[#111] leading-snug mb-1.5 ${featured ? "text-[15px]" : "text-[14px]"}`}>{job.title}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${dc}`}>{job.department}</span>
              {job.team && <span className="text-[11px] text-[#717171]">{job.team}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {job.salary && (
              <span className="text-[12px] font-bold text-[#111] hidden sm:block">{job.salary}</span>
            )}
            <button
              onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all cursor-pointer ${
                saved ? "bg-[#fff0f0] text-[#ff5a5f]" : "bg-[#f5f5f5] text-[#aaa] hover:bg-[#fff0f0] hover:text-[#ff5a5f]"
              }`}
              title={saved ? "Unsave" : "Save"}
            >
              {saved ? "♥" : "♡"}
            </button>
            <span className={`text-[10px] text-[#aaa] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▼</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
          <span className="text-[11px] text-[#717171] bg-[#f5f5f5] px-2 py-0.5 rounded">📍 {job.location}</span>
          <span className="text-[11px] text-[#717171] bg-[#f5f5f5] px-2 py-0.5 rounded">💼 {job.employmentType}</span>
          <span className="text-[11px] text-[#717171] bg-[#f5f5f5] px-2 py-0.5 rounded">📊 {job.experienceLevel} · {job.experienceYears}</span>
          {job.perks?.map(p => (
            <span key={p} className="text-[11px] text-[#717171] bg-[#f5f5f5] px-2 py-0.5 rounded">{p}</span>
          ))}
          <span className="ml-auto text-[11px] text-[#bbb]">{job.postedAt}</span>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-[#f5f5f5]" style={{ animation: "expandDown 0.2s ease" }}>
          <p className="text-sm text-[#484848] leading-relaxed mt-4 mb-4">{job.description}</p>

          {job.skills && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#aaa] mb-2">Skills</p>
              <div className="flex gap-1.5 flex-wrap">
                {job.skills.map(s => (
                  <span key={s} className="text-[12px] font-medium text-[#484848] bg-[#f5f5f5] border border-[#ebebeb] px-2.5 py-1 rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiscoverySection() {
  return (
    <div className="grid grid-cols-2 gap-3.5 mb-6">
      <div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#aaa] mb-2.5">Similar roles elsewhere</p>
        {SIMILAR_ROLES.map(r => (
          <div key={r.title} className="bg-white border border-[#ebebeb] hover:border-[#ccc] hover:shadow-sm rounded-xl p-3 mb-2 cursor-pointer transition-all group">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#222] leading-snug mb-0.5 group-hover:text-[#ff5a5f] transition-colors">{r.title}</p>
                <p className="text-[11px] text-[#717171]">{r.company} · {r.location}</p>
              </div>
              <span className="text-[12px] font-bold text-[#111] shrink-0">{r.salary}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#aaa] mb-2.5">Companies also hiring</p>
        {ALSO_HIRING.map(c => (
          <div key={c.name} className="bg-white border border-[#ebebeb] hover:border-[#ccc] hover:shadow-sm rounded-xl p-3 mb-2 cursor-pointer transition-all group">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-[#0369a1] leading-snug mb-0.5 group-hover:underline">{c.name}</p>
                <p className="text-[11px] text-[#717171]">{c.tagline} · {c.location}</p>
              </div>
              <span className="text-[11px] font-semibold text-[#22c55e] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full shrink-0">{c.openRoles} open</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProCard() {
  return (
    <div className="bg-white border border-[#ebebeb] border-l-[3px] border-l-[#ff5a5f] rounded-xl p-4">
      <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider bg-[#ff5a5f] text-white px-2.5 py-0.5 rounded-full mb-2">👑 PRO</span>
      <h4 className="text-[13px] font-bold text-[#111] mb-1">TalentDash Pro</h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">Salary insights, recruiter contact info, and direct application tracking.</p>
      {["View full salary bands","Direct recruiter messaging","Application status tracker","AI resume tailoring"].map((f, i, arr) => (
        <div key={f} className={`flex items-center gap-1.5 text-[12px] text-[#484848] py-1.5 ${i < arr.length-1 ? "border-b border-[#f5f5f5]" : ""}`}>
          <span className="text-green-500 text-sm font-bold">✓</span> {f}
        </div>
      ))}
      <button className="w-full mt-3 py-2.5 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[12px] font-bold rounded-xl cursor-pointer transition-all hover:shadow-md active:scale-95">
        Upgrade to Pro
      </button>
    </div>
  );
}

function SponsorCard() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <p className="text-[10px] font-semibold tracking-wider uppercase text-green-600 mb-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Hiring now
      </p>
      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[12px] font-black text-sky-700 mb-2.5">AR</div>
      <h4 className="text-[13px] font-bold text-[#111] mb-1">Arion Robotics</h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-2.5">Building autonomous systems for industrial logistics.</p>
      <p className="text-[11px] text-[#aaa] mb-3">📍 Austin, TX · Remote-friendly</p>
      <button className="w-full py-2 text-[#ff5a5f] border border-[#ffe3e4] text-[12px] font-semibold rounded-xl cursor-pointer hover:bg-[#fff0f0] transition-colors">
        View open roles
      </button>
    </div>
  );
}

function AlertCard() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4">
      <h4 className="text-[13px] font-bold text-[#111] mb-1 flex items-center gap-1.5">
        <span className="text-[#ff5a5f]">🔔</span> Job alerts
      </h4>
      <p className="text-[12px] text-[#717171] leading-relaxed mb-3">Get notified when new matching roles are posted.</p>
      {done ? (
        <div className="text-center py-2">
          <p className="text-sm font-bold text-green-600">✓ Alert set!</p>
          <p className="text-xs text-[#717171] mt-0.5">We'll email you at {email}</p>
        </div>
      ) : (
        <>
          <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#ebebeb] rounded-lg text-[12px] text-[#111] outline-none focus:border-[#ff5a5f] mb-2 transition-colors" />
          <div className="flex gap-1.5 mb-2.5">
            <select className="flex-1 px-2 py-1.5 border border-[#ebebeb] rounded-lg text-[12px] text-[#484848] outline-none">
              <option>All teams</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
            </select>
            <select className="flex-1 px-2 py-1.5 border border-[#ebebeb] rounded-lg text-[12px] text-[#484848] outline-none">
              <option>Any location</option>
              <option>Remote</option>
              <option>San Francisco</option>
              <option>New York</option>
            </select>
          </div>
          <button
            onClick={() => email && setDone(true)}
            className="w-full py-2 bg-[#111] hover:bg-[#333] text-white text-[12px] font-bold rounded-xl cursor-pointer transition-all active:scale-95"
          >
            Set alert
          </button>
        </>
      )}
    </div>
  );
}

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState<Department>("All Roles");
  const [remoteOnly, setRemoteOnly]     = useState(false);
  const [search, setSearch]             = useState("");

  const featuredJob  = JOBS.find(j => j.featured);
  const visibleJobs  = JOBS.filter(j => !j.featured).filter(job => {
    const matchesDept   = activeFilter === "All Roles" || job.department === activeFilter;
    const matchesRemote = !remoteOnly || job.location.toLowerCase().includes("remote");
    const matchesSearch = !search.trim() || job.title.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesRemote && matchesSearch;
  });

  return (
    <>
      <style>{`
        @keyframes fadeIn    { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp   { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes expandDown{ from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes popIn     { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>

      <div className="min-h-screen">
        <div className="grid gap-5 max-w-[1100px]" style={{ gridTemplateColumns: "1fr 260px" }}>

          <main>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa] text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search roles, teams, or keywords…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-[#ebebeb] rounded-xl text-[13px] text-[#222] bg-white outline-none focus:border-[#ccc] focus:shadow-sm transition-all"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#484848] cursor-pointer text-sm">✕</button>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#ff5a5f] hover:bg-[#e84a4f] text-white text-[13px] font-semibold rounded-xl cursor-pointer transition-all hover:shadow-md active:scale-95 whitespace-nowrap">
                🔍 Search
              </button>
            </div>

            <div className="flex gap-1.5 flex-wrap mb-5">
              {FILTER_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all whitespace-nowrap ${
                    activeFilter === chip
                      ? "bg-[#ff5a5f] border-[#ff5a5f] text-white shadow-sm"
                      : "bg-white border-[#ebebeb] text-[#484848] hover:border-[#bbb] hover:bg-[#f9f9f9]"
                  }`}
                >{chip}</button>
              ))}
              <button
                onClick={() => setRemoteOnly(v => !v)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all ${
                  remoteOnly
                    ? "bg-[#ff5a5f] border-[#ff5a5f] text-white shadow-sm"
                    : "bg-white border-[#ebebeb] text-[#484848] hover:border-[#bbb] hover:bg-[#f9f9f9]"
                }`}
              >🌐 Remote only</button>
            </div>

            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#aaa] mb-3">
              {activeFilter !== "All Roles" ? `${activeFilter} · ` : ""}{visibleJobs.length + (featuredJob ? 1 : 0)} open roles
            </p>

            {featuredJob && (
              <JobCard job={featuredJob} featured />
            )}

            {visibleJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 text-sm text-[#717171] bg-white border border-[#ebebeb] rounded-xl p-10 mb-3">
                <span className="text-3xl">🔍</span>
                <p className="font-semibold text-[#222]">No roles match your filters</p>
                <p className="text-xs">Try adjusting the department or removing filters</p>
                <button onClick={() => { setActiveFilter("All Roles"); setSearch(""); setRemoteOnly(false); }}
                  className="mt-2 px-4 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] text-[#484848] text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                  Clear all filters
                </button>
              </div>
            ) : (
              visibleJobs.map(job => <JobCard key={job.id} job={job} />)
            )}

            <div className="flex items-center gap-2 text-[11px] text-[#aaa] bg-[#fafafa] border border-dashed border-[#e5e5e5] rounded-lg px-3 py-2 mt-3 mb-6">
              ℹ️ Job listings will be populated from the backend once data is connected.
            </div>

            <DiscoverySection />
          </main>

          <aside className="flex flex-col gap-3.5">
            <ProCard />
            <SponsorCard />
            <AlertCard />
            <div className="bg-[#f5f5f5] border border-dashed border-[#d0d0d0] rounded-xl p-6 text-center text-[#aaa] text-[11px]">
              <div className="text-2xl mb-1.5 opacity-40">🏢</div>
              Advertisement
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}