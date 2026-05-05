import { SectionChip } from "@/components/SectionChip";
import { PilotOutcomes } from "@/components/PilotOutcomes";

interface PilotPageProps {
  onNavigate: (page: string) => void;
}

const features = [
  { icon: "✅", title: "Attendance Tracking", desc: "Daily digital attendance with automatic parent notifications and reporting." },
  { icon: "📝", title: "Assignments Management", desc: "Create, distribute, and track assignments with deadline management." },
  { icon: "📢", title: "Announcements", desc: "Broadcast targeted announcements with delivery and read confirmations." },
  { icon: "🗓️", title: "Timetable", desc: "Publish and update live timetables with instant change alerts." },
  { icon: "🏆", title: "Exam Results", desc: "Publish exam results with historical tracking and performance trends." },
  { icon: "💬", title: "Teacher–Parent Communication", desc: "Structured in-app messaging between teachers and parents." },
];

const timeline = [
  { step: 1, title: "Apply & Get Accepted", desc: "Submit your application — reviewed within 5 working days." },
  { step: 2, title: "Onboarding & Setup", desc: "Account setup, timetable import, and staff walkthrough." },
  { step: 3, title: "Live for 30 Days", desc: "Daily use by teachers, students, and parents with dedicated support." },
  { step: 4, title: "Review & Report", desc: "Detailed usage and impact report shared with institutional leadership." },
];

export function PilotPage({ onNavigate }: PilotPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 bg-gradient-to-b from-sky to-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="rev">
            <SectionChip label="Pilot Program" color="teal" />
            <h1 className="text-4xl md:text-5xl font-display mt-4 mb-4">30 days to see the difference.</h1>
            <p className="text-mid-grey font-body mb-8 leading-relaxed">
              We offer a structured, fully-supported 30-day pilot at no cost. Experience Classy with your real institute data, real teachers, and real parents.
            </p>
            <button
              onClick={() => onNavigate("signup")}
              className="bg-teal text-accent-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-teal-light shadow-md shadow-teal/20 transition-all mb-8"
            >
              Apply for Pilot &rarr;
            </button>
            <div className="bg-sky/60 rounded-xl p-5 border border-border">
              <h4 className="font-body font-semibold text-sm mb-3 text-foreground">What&#8217;s included</h4>
              <div className="flex flex-wrap gap-2">
                {["Full platform access", "Dedicated onboarding", "Live support", "End-of-pilot review report", "Complimentary for pilot educational institutes"].map((item) => (
                  <span key={item} className="bg-card rounded-full px-3 py-1 text-xs font-body text-foreground border border-border">{item}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Summary Card */}
          <div className="rev bg-card rounded-2xl p-6 border border-border shadow-lg" style={{ transitionDelay: "150ms" }}>
            <h4 className="font-display text-xl mb-6 text-foreground">Pilot Summary</h4>
            <div className="space-y-4">
              {[
                { label: "Duration", value: "30 Days" },
                { label: "Cost", value: "Complimentary", highlight: true },
                { label: "Commitment", value: "None required" },
                { label: "Support", value: "Dedicated team" },
                { label: "Pilot Report", value: "Included" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center border-b border-border pb-3 last:border-0">
                  <span className="text-sm text-mid-grey font-body">{r.label}</span>
                  <span className={`text-sm font-body font-semibold ${r.highlight ? "text-teal" : "text-foreground"}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Tested */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 rev">
            <SectionChip label="Features Tested" color="teal" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Everything your educational institute needs, tested live</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="rev bg-card rounded-xl p-6 border border-border card-lift" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="text-2xl">{f.icon}</span>
                <h4 className="font-body font-semibold mt-3 mb-2 text-foreground">{f.title}</h4>
                <p className="text-sm text-mid-grey font-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-card">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 rev">
            <SectionChip label="How It Works" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Four simple steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={i} className="rev flex gap-6 items-start" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-blue text-primary-foreground flex items-center justify-center text-sm font-body font-bold shrink-0 relative z-10">
                    {t.step}
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-foreground mb-1">{t.title}</h4>
                    <p className="text-sm text-mid-grey font-body">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Outcomes */}
      <PilotOutcomes />

      {/* Apply CTA */}
      <section className="section-pad bg-navy text-navy-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(217,91%,50%,0.15)_0%,_transparent_70%)] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto rev">
          <span className="inline-block rounded-full bg-teal/20 text-teal px-4 py-1.5 text-sm font-body font-medium mb-6">
            Limited Spots Available
          </span>
          <h2 className="text-3xl md:text-4xl font-display mb-4">Apply for the Classy Pilot</h2>
          <p className="text-navy-foreground/60 font-body mb-8">
            Applications reviewed on a rolling basis &mdash; early applicants given priority.
          </p>
          <button
            onClick={() => onNavigate("signup")}
            className="bg-teal text-accent-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-teal-light shadow-md shadow-teal/20 transition-all"
          >
            Apply for Pilot &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
