import { ShieldCheck, BadgeCheck, Users, Clock } from "lucide-react";

const ITEMS = [
  {
    icon: <ShieldCheck style={{ width: 20, height: 20 }} />,
    title: "100% Anonymous",
    sub: "Your privacy is our priority",
  },
  {
    icon: <BadgeCheck style={{ width: 20, height: 20 }} />,
    title: "Verified Submissions",
    sub: "Real data from real people",
  },
  {
    icon: <Users style={{ width: 20, height: 20 }} />,
    title: "Millions of Professionals",
    sub: "Real experiences from real professionals",
  },
  {
    icon: <Clock style={{ width: 20, height: 20 }} />,
    title: "Updated in Real-time",
    sub: "Always fresh, always relevant",
  },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-5 rounded-2xl border border-[#e2e4e9] px-8 py-5 lg:grid-cols-4">
      {ITEMS.map(({ icon, title, sub }, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(255,90,95,0.08)", color: "var(--color-primary)" }}
          >
            {icon}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">{title}</p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}