import { Check } from "lucide-react";
import { SectionChip } from "@/components/SectionChip";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const pilotFeatures = [
  "Full platform access for 30 days",
  "Onboarding & setup by our team",
  "All 6 modules unlocked (Attendance, Assignments, Results, Timetable, Announcements, Chat)",
  "Dedicated support throughout",
  "End-of-pilot Review Report — yours to keep",
  "No per-student charges during pilot",
];

const fullFeatures = [
  "Attendance with real-time parent alerts",
  "Assignments & homework tracking",
  "Exam & test schedules",
  "Announcements with read receipts",
  "Direct teacher–parent chat",
  "Academic progress & results",
  "Timetable (always live)",
  "Admin school dashboard",
  "Ongoing support & updates",
  "More features shipping every term",
];

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div>
      {/* HERO */}
      <section className="section-pad pt-32 md:pt-40" style={{ background: "linear-gradient(135deg, hsl(var(--sky)) 0%, #f0fdfa 100%)" }}>
        <div className="rev max-w-3xl mx-auto text-center">
          <SectionChip label="Simple Pricing" color="blue" />
          <h1 className="text-4xl md:text-6xl font-display mt-6 mb-4">
            Honest pricing. <span className="italic text-blue">Built around what schools actually need.</span>
          </h1>
          <p className="text-lg text-mid-grey font-body max-w-2xl mx-auto">
            No per-feature charges. No hidden costs. One clear price per school, per student — and a pilot that costs almost nothing to start.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Pilot Plan */}
            <div className="rev rounded-2xl border-2 border-teal/30 overflow-hidden card-lift">
              <div className="bg-teal text-accent-foreground px-6 py-2 text-sm font-body font-bold text-center">START HERE</div>
              <div className="p-8">
                <p className="text-5xl font-display text-foreground">₹1,000</p>
                <p className="text-sm font-body text-mid-grey mt-1">per school / one-time pilot fee</p>
                <p className="text-sm font-body text-foreground mt-3 italic">"Less than a school field trip. More impact than most."</p>
                <ul className="mt-6 space-y-3">
                  {pilotFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-body">
                      <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-mid-grey font-body mt-4">Pilot fee is fully adjustable against your first year if you continue.</p>
                <button onClick={() => onNavigate("signup")} className="w-full mt-6 bg-teal text-accent-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all shadow-md shadow-teal/20">Start the Pilot →</button>
                <p className="text-xs text-mid-grey font-body text-center mt-2">Limited pilot slots available</p>
              </div>
            </div>

            {/* Full Plan */}
            <div className="rev rounded-2xl border-2 border-blue/30 overflow-hidden shadow-xl card-lift" style={{ transitionDelay: "100ms" }}>
              <div className="bg-blue text-primary-foreground px-6 py-2 text-sm font-body font-bold text-center">AFTER PILOT</div>
              <div className="p-8">
                <p className="text-5xl font-display text-foreground">₹500</p>
                <p className="text-sm font-body text-mid-grey mt-1">per student / per year</p>
                <p className="text-xs font-body text-mid-grey mt-2 line-through">Average tuition app: ₹1,200–2,000/student/year</p>
                <p className="text-xs font-body text-blue font-semibold">You pay less than half.</p>
                <p className="text-sm font-body text-foreground mt-3 italic">"For less than ₹1.40 a day per student — the whole school stays connected."</p>
                <ul className="mt-6 space-y-3">
                  {fullFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-body">
                      <Check className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-amber/10 border border-amber/20 rounded-lg p-4 text-xs font-body text-foreground">
                  💡 <strong>The maths is simple:</strong> A school of 500 students pays ₹2,50,000/year. That's ₹694/day — for a tool that saves hours of admin, eliminates communication gaps, and keeps 500 families informed, every single day.
                </div>
                <button onClick={() => onNavigate("signup")} className="w-full mt-6 bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all shadow-md shadow-blue/20">Talk to Us About Pricing →</button>
                <p className="text-xs text-mid-grey font-body text-center mt-2">Bulk school &amp; district pricing available</p>
              </div>
            </div>
          </div>

          {/* Value strip */}
          <div className="rev grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-off-white rounded-xl p-8">
            {[
              { icon: "🔒", title: "No lock-in", sub: "Cancel anytime" },
              { icon: "🛠", title: "Free setup", sub: "We handle onboarding" },
              { icon: "📊", title: "Pilot Report included", sub: "Data-backed review at end" },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <p className="text-2xl mb-1">{v.icon}</p>
                <p className="font-body font-bold text-foreground text-sm">{v.title}</p>
                <p className="font-body text-xs text-mid-grey">{v.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT PROOF */}
      <section className="section-pad bg-navy text-navy-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="rev text-center mb-12">
            <span className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold font-body bg-navy-foreground/10 text-navy-foreground/70">What Parents Told Us</span>
            <h2 className="text-3xl md:text-5xl font-display mt-4">100% of parents surveyed said yes. <span className="italic">Here's what they actually said.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "If I can see my child's attendance every morning and check what homework is due — I'd pay for that without a second thought. This is what every school needs.", who: "Parent, Class 6, Chennai" },
              { q: "We pay for tuition apps that do half of this. ₹500 a year is nothing if the school communication actually works.", who: "Parent, Grade 9 student's parent" },
              { q: "I spend more than ₹500 on a single parent-teacher day — travel, time off work. If this app means fewer emergency calls and more visibility, it pays for itself.", who: "Parent, Grade 4 & 7 student's parent" },
            ].map((t, i) => (
              <div key={i} className="rev dark-glass-card rounded-xl p-6" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="font-body text-sm text-navy-foreground/80 leading-relaxed mb-4">"{t.q}"</p>
                <p className="font-body text-xs text-navy-foreground/50">— {t.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-pad" style={{ background: "linear-gradient(135deg, hsl(var(--blue)) 0%, hsl(var(--teal)) 100%)" }}>
        <div className="max-w-3xl mx-auto text-center rev">
          <h2 className="text-3xl md:text-5xl font-display text-primary-foreground mb-6">Ready to get started?</h2>
          <p className="text-lg font-body text-primary-foreground/80 mb-8">Start with the ₹1,000 pilot. See the impact. Then decide.</p>
          <button onClick={() => onNavigate("signup")} className="bg-primary-foreground text-navy rounded-lg px-8 py-4 text-base font-body font-semibold hover:brightness-95 transition-all shadow-lg">Apply for the Pilot →</button>
        </div>
      </section>
    </div>
  );
}
