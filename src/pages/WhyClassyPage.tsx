import { useEffect, useRef, useState } from "react";
import { SectionChip } from "@/components/SectionChip";
import { PilotOutcomes } from "@/components/PilotOutcomes";

interface Props {
  onNavigate: (page: string) => void;
}

/* ─── Animated Counter ─── */
function AnimatedStat({ value, label, desc, color = "blue" }: { value: string; label: string; desc: string; color?: "blue" | "teal" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bg-card rounded-2xl p-8 border border-border text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className={`text-4xl md:text-5xl font-display italic ${color === "teal" ? "text-teal" : "text-blue"}`}>{value}</div>
      <div className="font-body font-semibold text-foreground mt-2">{label}</div>
      <div className="text-xs font-body text-mid-grey mt-1">{desc}</div>
    </div>
  );
}

/* ─── Timeline Bar ─── */
function TimelineBar() {
  return (
    <div className="mt-12 rev">
      <svg viewBox="0 0 600 60" className="w-full max-w-2xl mx-auto" aria-label="Transformation timeline">
        <line x1="30" y1="25" x2="570" y2="25" stroke="hsl(214 32% 91%)" strokeWidth="3" />
        <line x1="30" y1="25" x2="570" y2="25" stroke="hsl(217 91% 50%)" strokeWidth="3" strokeDasharray="540" />
        {[
          { x: 30, label: "Day 0", sub: "Setup" },
          { x: 210, label: "Week 1: 43%", sub: "Traction" },
          { x: 390, label: "Week 2: 87%", sub: "Results" },
          { x: 570, label: "Ongoing ↑", sub: "Growth" },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={25} r="8" fill="hsl(217 91% 50%)" />
            <circle cx={p.x} cy={25} r="4" fill="white" />
            <text x={p.x} y={10} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(217 91% 50%)" fontFamily="Plus Jakarta Sans">{p.label}</text>
            <text x={p.x} y={50} textAnchor="middle" fontSize="9" fill="hsl(215 16% 47%)" fontFamily="Plus Jakarta Sans">{p.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const timeRows = [
  { role: "Teacher", before: "15 min/class on attendance + follow-ups", after: "2 min tap + auto-notify", saved: "13 min/class" },
  { role: "Teacher (5 classes)", before: "75 min/day on admin", after: "10 min/day", saved: "65 min/day" },
  { role: "Admin staff", before: "Hours on substitute coordination", after: "Instant automated substitution", saved: "2+ hours/day" },
  { role: "Parent", before: "20 min/day monitoring 7–8 groups", after: "One glance at Classy", saved: "20 min/day" },
  { role: "Student", before: "Missed deadlines, catch-up time", after: "Notifications, no missed work", saved: "Stress eliminated" },
];

const emotionCards = [
  { icon: "\u{1F469}\u200D\u{1F3EB}", who: "For Teachers", headline: "\u201CI can finally teach.\u201D", body: "No more morning attendance chaos. No more chasing students for assignments. No more parent calls at 8pm. You open Classy, mark attendance in 60 seconds, post the day\u2019s homework, and walk into class." },
  { icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", who: "For Parents", headline: "\u201CI actually know what\u2019s happening.\u201D", body: "You wake up, open Classy, and see: Priya is present. Maths homework is due Friday. Annual Day is the 14th. No scrolling through 7 WhatsApp groups. No missed notices. Just clarity." },
  { icon: "\u{1F393}", who: "For Students", headline: "\u201CI don\u2019t miss things anymore.\u201D", body: "Every assignment, every exam date, every timetable change \u2014 it\u2019s all in one place. You get a notification, you submit your work, your teacher sees it. Simple. No excuses, no anxiety." },
  { icon: "\u{1F3EB}", who: "For Management", headline: "\u201CThe institution runs itself.\u201D", body: "Attendance is tracked. Substitutions are handled. Parents are informed. You open the admin dashboard and see 94% attendance today, zero complaints this week, and every class covered. That\u2019s what Classy feels like." },
];

const challengeTags = ["Cash Bounty", "Verified Cert", "Internship", "Direct Offer"];

const pilotHighlights = [
  { value: "87%", label: "Teacher efficiency reached in Week 2" },
  { value: "0", label: "Parent complaints by end of Week 2" },
  { value: "15 min", label: "Saved per class every day" },
  { value: "7-8", label: "WhatsApp groups eliminated per parent" },
];

export function WhyClassyPage({ onNavigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 bg-gradient-to-b from-teal/10 to-background">
        <div className="max-w-3xl mx-auto text-center rev">
          <SectionChip label="Why Classy" color="blue" />
          <h1 className="text-4xl md:text-5xl font-display mt-4 mb-4">
            Save time. Save money. <em className="text-blue">Feel the difference.</em>
          </h1>
          <p className="text-mid-grey font-body leading-relaxed max-w-[600px] mx-auto">
            Every institution we've spoken to has the same story: too much time wasted, too many messages missed, too little visibility. Classy was built to solve exactly this — with numbers to prove it.
          </p>
        </div>
      </section>

      {/* Section 1 — Employability */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="rev text-center mb-12">
            <SectionChip label="High-Retention Trust" color="amber" />
            <h2 className="text-4xl md:text-5xl font-display mt-4">Why Classy?</h2>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="rev">
            <h2 className="text-5xl md:text-7xl font-display leading-[0.95] mb-8">
              <em className="text-blue">Employability:</em><br />
              Bridge the Gap<br />
              <span className="text-mid-grey">Before You</span><br />
              <em className="text-teal">Graduate.</em>
            </h2>
            <p className="text-mid-grey font-body leading-relaxed max-w-xl">
              Students get the exclusive opportunity to solve actual, real-world engineering and business problems dropped directly by rising startups and MNCs. Complete these Classroom Feature Challenges to lock in immediate rewards: real cash bounties, verified digital certificates, priority internships, and direct employment offers before your final semester ends.
            </p>
          </div>

          <div className="rev rounded-2xl bg-card border border-border p-8 shadow-xl shadow-navy/5" style={{ transitionDelay: "120ms" }}>
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="rounded-full bg-teal/10 text-teal px-4 py-1.5 text-xs font-body font-semibold">● Live Active Challenge</span>
              <span className="text-sm font-body text-mid-grey">#CLS-0214</span>
            </div>
            <h3 className="text-2xl font-display mb-2">Build Passwordless Login</h3>
            <p className="font-body text-sm text-mid-grey mb-8">A production-grade authentication flow with magic links and device trust.</p>
            <div className="divide-y divide-border">
              {[
                ["REWARD", "₹15,000 + Certificate"],
                ["SPONSOR", "Silver Lynx"],
                ["BONUS", "Priority Internship Offer"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-xs font-body tracking-wider text-mid-grey">{label}</span>
                  <span className="text-sm font-body font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {challengeTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-off-white px-3 py-1 text-xs font-body text-foreground">{tag}</span>
              ))}
            </div>
            <button
              onClick={() => onNavigate("getapp")}
              className="mt-8 w-full rounded-lg bg-blue px-6 py-3 text-sm font-body font-semibold text-primary-foreground hover:brightness-110 transition-all shadow-md shadow-blue/20"
            >
              Accept Challenge &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 — Time Saved */}
      <section className="section-pad bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 rev">
            <SectionChip label="Time" color="teal" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Hours given back to teaching. Every single day.</h2>
          </div>
          <div className="rev space-y-3 md:hidden">
            {timeRows.map((r) => (
              <article key={r.role} className="rounded-xl border border-border bg-off-white p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-body text-base font-bold leading-tight text-foreground">{r.role}</h3>
                  <span className="shrink-0 rounded-full bg-blue/10 px-3 py-1 text-xs font-body font-bold text-blue">{r.saved}</span>
                </div>
                <dl className="space-y-3 text-sm font-body">
                  <div>
                    <dt className="mb-1 font-semibold text-mid-grey">Before Classy</dt>
                    <dd className="leading-relaxed text-mid-grey"><span className="mr-1.5 text-destructive/60">✗</span>{r.before}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-semibold text-teal">With Classy</dt>
                    <dd className="leading-relaxed text-foreground"><span className="mr-1.5 text-teal">✓</span>{r.after}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="rev hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-sm font-body border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-mid-grey">Before Classy</th>
                  <th className="text-left py-3 px-4 font-semibold text-teal">With Classy</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue">Time Saved</th>
                </tr>
              </thead>
              <tbody>
                {timeRows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-off-white"}>
                    <td className="py-3 px-4 font-medium text-foreground">{r.role}</td>
                    <td className="py-3 px-4 text-mid-grey"><span className="text-destructive/60 mr-1.5">✗</span>{r.before}</td>
                    <td className="py-3 px-4 text-foreground"><span className="text-teal mr-1.5">✓</span>{r.after}</td>
                    <td className="py-3 px-4 font-semibold text-blue">{r.saved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber/10 rounded-xl p-5 border border-amber/30 mt-8 rev">
            <p className="font-body text-sm text-foreground">
              <span className="text-amber font-semibold">⏱</span> An educational institute of 30 teachers saves ~32 hours of admin time every single day. That's 4 full working days — returned to teaching.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Pilot Intro */}
      <section className="section-pad bg-gradient-to-b from-sky to-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center rev">
            <SectionChip label="Pilot Complete" color="teal" />
            <h2 className="text-4xl md:text-5xl font-display mt-6 mb-5">
              We ran the pilot. <em className="text-blue">Here's what happened.</em>
            </h2>
            <p className="text-mid-grey font-body max-w-3xl mx-auto leading-relaxed">
              Classy was piloted at a real educational institute over 2 weeks. Every metric was tracked: teacher efficiency, student completion, parent complaints, and management visibility. The results speak for themselves.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {pilotHighlights.map((item, i) => (
              <div key={item.label} className="rev rounded-xl border border-border bg-card p-6 text-center card-lift" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-3xl font-display italic text-blue">{item.value}</div>
                <p className="text-sm font-body text-mid-grey mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Efficiency Metrics */}
      <section className="section-pad bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 rev text-center">
            <SectionChip label="Efficiency" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">The numbers from our actual pilot.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimatedStat value="87%" label="Teacher efficiency" desc="reached in Week 2" color="blue" />
            <AnimatedStat value="0" label="Parent complaints" desc="by end of Week 2" color="teal" />
            <AnimatedStat value="15 min" label="Saved per class" desc="every day" color="blue" />
            <AnimatedStat value="7–8" label="WhatsApp groups" desc="eliminated per parent" color="teal" />
          </div>
          <TimelineBar />
        </div>
      </section>

      <PilotOutcomes />

      {/* Section 5 — How It Feels */}
      <section className="section-pad bg-navy text-navy-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 rev">
            <span className="inline-block rounded-full bg-navy-foreground/10 text-navy-foreground/60 px-4 py-1.5 text-sm font-body font-medium">Experience</span>
            <h2 className="text-3xl md:text-4xl font-display mt-4 text-navy-foreground">What it actually feels like to use Classy.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {emotionCards.map((c, i) => (
              <div key={i} className="rev dark-glass-card rounded-2xl p-6" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="text-2xl">{c.icon}</span>
                <div className="text-xs font-body text-navy-foreground/50 mt-2 uppercase tracking-wider">{c.who}</div>
                <h3 className="font-display text-xl text-navy-foreground mt-2 mb-3">{c.headline}</h3>
                <p className="text-sm font-body text-navy-foreground/60 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — The One Question */}
      <section className="section-pad bg-gradient-to-r from-blue to-teal text-primary-foreground text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto rev">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            What would your institution do with 65 extra minutes of teaching time — every day?
          </h2>
          <p className="text-primary-foreground/70 font-body mb-8 max-w-xl mx-auto">
            That's what Classy gives each teacher. Multiply that by your staff. That's the real cost of not using Classy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate("signup")}
              className="bg-card text-navy rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all shadow-md"
            >
              Start the Pilot &rarr;
            </button>
            <button
              onClick={() => onNavigate("getapp")}
              className="border-2 border-primary-foreground/40 text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-primary-foreground/10 transition-all"
            >
              Download the App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
