import {
  Gift,
  MessageSquare,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

type Props = {
  region?: string;
};

function tint(bg: string, amount = "12%") {
  return `color-mix(in srgb, ${bg} ${amount}, white)`;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-full min-h-0 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon, accentColor, title, sub }: { icon: React.ReactNode; accentColor: string; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-2.5 mb-3">
      {/* ensure icon SVGs inherit primary color (lucide uses currentColor) */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(255,90,95,0.12)" }}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold leading-snug text-[var(--color-text-primary)]">{title}</h3>
        <p className="mt-0.5 text-[11px] leading-4 text-[var(--color-text-secondary)]">{sub}</p>
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-3">
      {items.map((it) => (
        <li key={it} className="text-[13px] text-[var(--color-text-secondary)]">• {it}</li>
      ))}
    </ul>
  );
}

/* Simple salary bars — fewer roles for clarity */
const ROLES = [
  { label: "AI / ML Engineer", value: 62, color: "#ff5a5f" },
  { label: "Backend Engineer", value: 44, color: "#f97316" },
  { label: "Frontend Engineer", value: 30, color: "#10b981" },
  { label: "Full Stack Engineer", value: 38, color: "#7c3aed" }, // added role
];
const MAX_VAL = 70;

function SalaryBars() {
  return (
    <div className="space-y-3">
      {ROLES.map(({ label, value, color }) => {
        const pct = Math.min(100, (value / MAX_VAL) * 100);
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-medium text-[var(--color-text-secondary)]">{label}</span>
              <span className="text-[12px] font-bold" style={{ color }}>{`₹${value} LPA`}</span>
            </div>
            <div className="h-[6px] w-full rounded-full overflow-hidden bg-[var(--color-border)]">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Compact area chart — fewer points, lightweight */
function AreaChart() {
  const vals = [10, 14, 18, 22, 26, 28];
  const W = 260, H = 96, PAD_L = 28, PAD_R = 8, PAD_B = 18;
  const chartW = W - PAD_L - PAD_R, chartH = H - PAD_B;
  const max = 32;
  const pts = vals.map((v, i) => ({
    x: PAD_L + (i / (vals.length - 1)) * chartW,
    y: ((max - v) / max) * chartH,
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x},${chartH} L ${PAD_L},${chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        <linearGradient id="areaGradSmall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGradSmall)" />
      <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill="var(--color-primary)" />
    </svg>
  );
}

function MiniTrend() {
  // previous curved increasing sparkline with subtle fill
  return (
    <svg viewBox="0 0 80 44" fill="none" aria-hidden style={{ width: 80, height: 44, flexShrink: 0 }}>
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-data)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-data)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M4 38 C14 34 22 28 32 24 C42 20 52 14 62 10 C68 8 74 5 78 3"
        fill="none" stroke="var(--color-data)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 38 C14 34 22 28 32 24 C42 20 52 14 62 10 C68 8 74 5 78 3 L 78 44 L 4 44 Z"
        fill="url(#trendFill)" />
      {([
        [4, 38], [22, 28], [38, 22], [54, 13], [72, 5],
      ] as [number, number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill="white" stroke="var(--color-data)" strokeWidth="1.8" />
      ))}
    </svg>
  );
}

function AvatarStack({ count = 3 }: { count?: number }) {
  const colors = ["#f97316", "#3b82f6", "#10b981"];
  const initials = ["A", "B", "C"];
  return (
    <div className="flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: colors[i % colors.length], marginLeft: i > 0 ? -8 : 0 }}>
          {initials[i]}
        </div>
      ))}
    </div>
  );
}

function ExploreLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold text-[var(--color-primary)] hover:opacity-80">
      {label}
      <ArrowRight className="h-3 w-3" style={{ color: "var(--color-primary)" }} />
    </a>
  );
}

export function CareerHubGrid({ region }: Props) {
  const city = region ?? "Bangalore";
  const avgSalary = "₹28 LPA";

  return (
    <section className="space-y-4">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>
          — Intelligence Hub
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">Explore the world of work</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {/* Compensation (spans 2 rows) */}
        <Card className="lg:row-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(255,90,95,0.12)" }}>
              <DollarSign className="h-4 w-4" style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Compensation Intelligence</h3>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Salaries by role & city</p>
            </div>
          </div>

          <p className="text-[11px] text-[var(--color-text-muted)]">Average salary • {city}</p>
          <p className="text-3xl font-black mt-0.5 text-[var(--color-text-primary)]">{avgSalary}</p>
          <p className="flex items-center gap-1 text-xs font-semibold mt-1 mb-3" style={{ color: "var(--color-primary)" }}>
            <TrendingUp className="h-3 w-3" style={{ color: "var(--color-primary)" }} /> ▲ 12% YoY
          </p>

          <div className="mb-3">
            <AreaChart />
          </div>

          <div className="mb-3">
            <p className="mb-2 text-[11px] font-semibold text-[var(--color-text-muted)]">Top roles</p>
            <SalaryBars />
          </div>

          <ExploreLink href="/salaries" label="Explore salaries" />
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader icon={<Star className="h-4 w-4" style={{ color: "var(--color-primary)" }} />} accentColor="#f97316" title="Company Reviews" sub="Employee feedback and ratings." />
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" style={{ color: "#f97316" }}>4.1</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Average rating</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[var(--color-text-primary)]">68%</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Recommend</p>
              </div>
            </div>
          </div>

          <Bullets items={["Culture highlights", "Employee feedback", "Role-specific notes"]} />
          <ExploreLink href="/reviews" label="Explore reviews" />
        </Card>

        {/* Interviews */}
        <Card>
          <CardHeader icon={<MessageSquare className="h-4 w-4" style={{ color: "var(--color-primary)" }} />} accentColor="#8b5cf6" title="Interview Experiences" sub="Sample questions and company trends." />

          <div className="rounded-lg border p-3 mb-3" style={{ background: tint("var(--color-data)", "8%"), borderColor: tint("var(--color-data)", "20%") }}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-data)" }}>Trending skills</p>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Based on recent interviews</p>
              </div>
              <MiniTrend />
            </div>
          </div>

          <div className="mb-2">
            <p className="mb-2 text-[11px] font-semibold text-[var(--color-text-muted)]">Top roles</p>
            <div className="flex flex-wrap gap-1.5">
              {["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Data Analyst"].map(tag => (
                <span key={tag} className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ExploreLink href="/interviews" label="Explore interviews" />
        </Card>

        {/* Offers */}
        <Card>
          <CardHeader icon={<Gift className="h-4 w-4" style={{ color: "var(--color-primary)" }} />} accentColor="var(--color-primary)" title="Offers & Negotiations" sub="Compare offers and learn negotiation tips." />

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">Top reported</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Real candidate data</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">58%</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Negotiated</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <AvatarStack count={3} />
            <p className="text-[11px] text-[var(--color-text-secondary)] font-medium">Join professionals</p>
          </div>

          <ExploreLink href="/offers" label="Explore offers" />
        </Card>

        {/* Community */}
        <Card>
          <CardHeader icon={<Users className="h-4 w-4" style={{ color: "var(--color-primary)" }} />} accentColor="#3b82f6" title="Community Discussions" sub="Ask questions and share learnings." />

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 mb-3">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">&ldquo;Work-life balance tips for remote teams?&rdquo;</p>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold text-[var(--color-text-muted)]">Trending</p>
            <div className="flex flex-wrap gap-1.5">
              {["Remote work", "Interview prep"].map(tag => (
                <span key={tag} className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {tag}
                </span>
              ))}
              <a href="/forum" className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ color: "var(--color-data)", background: tint("var(--color-data)", "10%") }}>View all</a>
            </div>
          </div>

          <ExploreLink href="/forum" label="Explore community" />
        </Card>
      </div>
    </section>
  );
}