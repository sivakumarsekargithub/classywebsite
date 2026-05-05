import { useState, useEffect, useRef } from "react";
import { SectionChip } from "@/components/SectionChip";

/* ─── SVG Charts ─── */
function EfficiencyChart() {
  const points = [
    { x: 60, y: 255, label: "15%", xLabel: "Before" },
    { x: 200, y: 171, label: "43%", xLabel: "Week 1" },
    { x: 340, y: 39, label: "87%", xLabel: "Week 2" },
  ];
  return (
    <div className="bg-sky/40 rounded-xl p-5 border border-border">
      <h4 className="font-body font-semibold text-sm mb-3 text-foreground">Teacher Efficiency Over Pilot</h4>
      <svg viewBox="0 0 400 300" className="w-full" aria-label="Efficiency line chart">
        {/* grid */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = 270 - (v / 100) * 240;
          return (
            <g key={v}>
              <line x1="40" y1={y} x2="370" y2={y} stroke="hsl(214 32% 91%)" strokeWidth="1" />
              <text x="32" y={y + 4} textAnchor="end" className="fill-mid-grey" fontSize="10" fontFamily="Plus Jakarta Sans">{v}%</text>
            </g>
          );
        })}
        {/* line */}
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="hsl(217 91% 50%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* dots + labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill="hsl(217 91% 50%)" />
            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(217 91% 50%)" fontFamily="Plus Jakarta Sans">{p.label}</text>
            <text x={p.x} y={290} textAnchor="middle" fontSize="11" className="fill-mid-grey" fontFamily="Plus Jakarta Sans">{p.xLabel}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-2 mt-4">
        {["Real-time assignment tracking", "Reduced manual follow-ups", "More teaching time"].map((t) => (
          <span key={t} className="bg-card rounded-full px-3 py-1 text-xs font-body text-teal border border-border">✓ {t}</span>
        ))}
      </div>
    </div>
  );
}

function AssignmentChart() {
  return (
    <div className="bg-sky/40 rounded-xl p-5 border border-border">
      <h4 className="font-body font-semibold text-sm mb-3 text-foreground">Assignment Completion</h4>
      <svg viewBox="0 0 300 220" className="w-full" aria-label="Assignment bar chart">
        {[0, 25, 50, 75, 100].map((v) => {
          const y = 190 - (v / 100) * 170;
          return (
            <g key={v}>
              <line x1="50" y1={y} x2="260" y2={y} stroke="hsl(214 32% 91%)" strokeWidth="1" />
              <text x="42" y={y + 4} textAnchor="end" fontSize="10" className="fill-mid-grey" fontFamily="Plus Jakarta Sans">{v}%</text>
            </g>
          );
        })}
        {/* bars */}
        <rect x="90" y={190 - (43 / 100) * 170} width="50" height={(43 / 100) * 170} rx="4" fill="hsl(38 92% 50%)" opacity="0.85" />
        <text x="115" y={190 - (43 / 100) * 170 - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(38 92% 50%)" fontFamily="Plus Jakarta Sans">43%</text>
        <text x="115" y="210" textAnchor="middle" fontSize="11" className="fill-mid-grey" fontFamily="Plus Jakarta Sans">Week 1</text>

        <rect x="170" y={190 - (87 / 100) * 170} width="50" height={(87 / 100) * 170} rx="4" fill="hsl(38 92% 50%)" />
        <text x="195" y={190 - (87 / 100) * 170 - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(38 92% 50%)" fontFamily="Plus Jakarta Sans">87%</text>
        <text x="195" y="210" textAnchor="middle" fontSize="11" className="fill-mid-grey" fontFamily="Plus Jakarta Sans">Week 2</text>
      </svg>
      <div className="flex flex-wrap gap-2 mt-4">
        {["Flexible deadlines", "PDF digital submission", "Less follow-up pressure", "Peer-driven adoption"].map((t) => (
          <span key={t} className="bg-card rounded-full px-3 py-1 text-xs font-body text-teal border border-border">✓ {t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sky/50 rounded-lg p-4 border border-border text-center">
      <div className="text-xl font-display italic text-blue">{value}</div>
      <div className="text-xs font-body text-mid-grey mt-1">{label}</div>
    </div>
  );
}

/* ─── Tab Content ─── */
const tabs = ["Teachers", "Students", "Management", "Parents"] as const;
const tabIcons = ["👩‍🏫", "🎓", "🏫", "👨‍👩‍👧"];

function TeachersTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Students per teacher" value="~300" />
        <StatCard label="Starting efficiency" value="15%" />
        <StatCard label="Week 1 efficiency" value="43%" />
        <StatCard label="Week 2 efficiency" value="87%" />
        <StatCard label="Complaints before" value="~20/week" />
        <StatCard label="Week 1 complaints" value="2" />
        <StatCard label="Week 2 complaints" value="0" />
        <StatCard label="Time saved" value="15 min/class" />
      </div>
      <EfficiencyChart />
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Assignment completion Week 1" value="43%" />
        <StatCard label="Assignment completion Week 2" value="87%" />
      </div>
      <AssignmentChart />
    </div>
  );
}

function ManagementTab() {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-display italic text-navy text-center mb-8 max-w-xl mx-auto leading-snug">
        Parent complaints dropped from 20/week to zero.<br />In two weeks.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { icon: "🤖", title: "Automated attendance", desc: "No more manual registers" },
          { icon: "📋", title: "Digital leave applications", desc: "Teachers apply, system notifies" },
          { icon: "🔄", title: "Instant substitution", desc: "Auto-assign cover teachers" },
          { icon: "👁", title: "Real-time visibility", desc: "Operations at a glance" },
          { icon: "⭐", title: "Institutional reputation", desc: "Trust rebuilt with parents in 2 weeks" },
        ].map((c) => (
          <div key={c.title} className="bg-card rounded-xl p-5 border border-border text-center card-lift">
            <span className="text-2xl">{c.icon}</span>
            <h4 className="font-body font-semibold text-sm mt-2 text-foreground">{c.title}</h4>
            <p className="text-xs text-mid-grey font-body mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentsTab() {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-display italic text-navy text-center mb-2 leading-snug">
        Eliminated 7–8 WhatsApp groups.<br />Per parent.
      </p>
      <p className="text-mid-grey font-body text-center mb-8 max-w-lg mx-auto">
        One app replaced the chaos of multiple parent groups, teacher DMs, and missed announcements.
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
        {/* Before */}
        <div className="bg-muted rounded-xl p-6 border border-border">
          <h4 className="font-body font-semibold text-sm mb-3 text-mid-grey uppercase tracking-wide">Before</h4>
          <ul className="space-y-2 text-sm font-body text-mid-grey">
            <li>❌ 7–8 WhatsApp groups</li>
            <li>❌ Missed announcements buried in chats</li>
            <li>❌ No idea if homework was assigned</li>
            <li>❌ Calling the institution to check attendance</li>
          </ul>
        </div>
        {/* After */}
        <div className="bg-teal/10 rounded-xl p-6 border border-teal/30">
          <h4 className="font-body font-semibold text-sm mb-3 text-teal uppercase tracking-wide">After</h4>
          <ul className="space-y-2 text-sm font-body text-foreground">
            <li>✅ One Classy app</li>
            <li>✅ Announcements pushed instantly</li>
            <li>✅ Assignments visible in real time</li>
            <li>✅ Attendance confirmed every morning</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {["📝 Assignments", "✅ Attendance", "📢 Announcements"].map((p) => (
          <span key={p} className="bg-card rounded-full px-4 py-2 text-sm font-body border border-border">{p}</span>
        ))}
      </div>
    </div>
  );
}

const tabComponents = [TeachersTab, StudentsTab, ManagementTab, ParentsTab];

/* ─── Main Component ─── */
export function PilotOutcomes() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 920);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Header */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 rev">
            <SectionChip label="Real Results" color="amber" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">What happened in just 2 weeks.</h2>
            <p className="text-mid-grey font-body mt-4 max-w-[620px] mx-auto">
              These aren't projections. This is what Classy delivered during an actual pilot at a real educational institute — tracked week by week, stakeholder by stakeholder.
            </p>
          </div>
        </div>
      </section>

      {/* Big Impact Strip */}
      <section className="section-pad bg-navy text-navy-foreground py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { num: "15% → 87%", label: "Efficiency jump" },
            { num: "43% → 87%", label: "Assignments done" },
            { num: "20 → 0", label: "Complaints/week" },
            { num: "15 mins", label: "Saved per class" },
            { num: "2 Weeks", label: "To transform" },
          ].map((s) => (
            <div key={s.label} className="rev">
              <div className="text-2xl md:text-3xl font-display italic text-blue-light">{s.num}</div>
              <div className="text-xs font-body text-navy-foreground/60 mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes by Stakeholder */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rev">
            <SectionChip label="Outcomes by Stakeholder" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Detailed breakdown</h2>
          </div>

          {!isMobile ? (
            <>
              {/* Desktop Tabs */}
              <div className="flex justify-center gap-1 mb-8 border-b border-border">
                {tabs.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(i)}
                    className={`px-6 py-3 text-sm font-body font-medium transition-all relative ${
                      activeTab === i ? "text-blue" : "text-mid-grey hover:text-foreground"
                    }`}
                  >
                    <span className="mr-1.5">{tabIcons[i]}</span>{t}
                    {activeTab === i && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <div className="rev">
                {tabComponents.map((Tab, i) => activeTab === i && <Tab key={i} />)}
              </div>
            </>
          ) : (
            /* Mobile Accordions */
            <div className="space-y-3">
              {tabs.map((t, i) => {
                const Tab = tabComponents[i];
                const isOpen = openAccordion === i;
                return (
                  <div key={t} className="bg-card rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-body font-semibold text-foreground"
                    >
                      <span><span className="mr-2">{tabIcons[i]}</span>{t}</span>
                      <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <Tab />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
