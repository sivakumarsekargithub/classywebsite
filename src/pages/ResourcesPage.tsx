import { SectionChip } from "@/components/SectionChip";

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

const reports = [
  { title: "The State of Teacher–Parent Communication in Indian Educational Institutes", year: "2025", tag: "Educational Institute Communication", available: true },
  { title: "Classroom Time & Administrative Overhead: A Teacher Burden Study", year: "2025", tag: "Teacher Productivity", available: true },
  { title: "Student Academic Visibility: What Parents Actually Know", year: "Q3 2025", tag: "Coming Soon", available: false },
];

const insightArticles = [
  { title: "5 Signs Your Educational Institute's Communication System Is Broken", read: "5 min read" },
  { title: "Why Attendance Tracking Is the Hidden Productivity Problem", read: "4 min read" },
  { title: "What Parents Really Want From Educational Institute Communication", read: "6 min read" },
];

const downloads = [
  { title: "Educational Institute Communication Audit Checklist", available: true },
  { title: "Teacher Workflow Optimisation Guide", available: true },
  { title: "EdTech Evaluation Framework for Educational Institutes", available: false },
];

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 text-center bg-gradient-to-b from-teal/5 to-background">
        <div className="rev max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display mb-4">Research, insights, and practical guides.</h1>
          <p className="text-lg text-mid-grey font-body">Evidence-based resources to help educational institutes improve communication and academic workflows.</p>
        </div>
      </section>

      {/* Research Reports */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 rev">
            <SectionChip label="Research Reports" color="blue" />
            <h2 className="text-3xl font-display mt-4">Original research</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reports.map((r, i) => (
              <div key={i} className="rev bg-card rounded-xl p-6 border border-border card-lift flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-body text-mid-grey">{r.year}</span>
                  <span className={`text-xs font-body font-medium rounded-full px-3 py-0.5 ${r.available ? "bg-blue/10 text-blue" : "bg-amber/10 text-amber"}`}>
                    {r.tag}
                  </span>
                </div>
                <h4 className="font-body font-semibold text-foreground mb-4 flex-1">{r.title}</h4>
                <button
                  disabled={!r.available}
                  onClick={() => r.available && onNavigate("signup")}
                  className={`text-sm font-body font-semibold ${r.available ? "text-blue hover:underline cursor-pointer" : "text-mid-grey/50 cursor-not-allowed"}`}
                >
                  {r.available ? "Request Report →" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 rev">
            <SectionChip label="Insights" color="blue" />
            <h2 className="text-3xl font-display mt-4">Articles &amp; analysis</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {insightArticles.map((a, i) => (
              <div key={i} className="rev bg-off-white rounded-xl p-6 border border-border card-lift" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="text-xs font-body rounded-full bg-blue/10 text-blue px-3 py-0.5 font-medium">{a.read}</span>
                <h4 className="font-body font-semibold text-foreground mt-4 mb-2">{a.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 rev">
            <SectionChip label="Downloads" color="amber" />
            <h2 className="text-3xl font-display mt-4">Practical tools</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {downloads.map((d, i) => (
              <div key={i} className="rev bg-card rounded-xl p-6 border border-border card-lift" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className={`text-xs font-body rounded-full px-3 py-0.5 font-medium ${d.available ? "bg-amber/10 text-amber" : "bg-mid-grey/10 text-mid-grey"}`}>
                  {d.available ? "PDF" : "Coming Soon"}
                </span>
                <h4 className="font-body font-semibold text-foreground mt-4 mb-4">{d.title}</h4>
                <button
                  disabled={!d.available}
                  className={`text-sm font-body font-semibold ${d.available ? "text-amber hover:underline cursor-pointer" : "text-mid-grey/50 cursor-not-allowed"}`}
                >
                  {d.available ? "Download PDF →" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-navy text-navy-foreground text-center">
        <div className="max-w-2xl mx-auto rev">
          <h2 className="text-3xl font-display mb-4">Want the full research data?</h2>
          <p className="text-navy-foreground/60 font-body mb-8">Detailed findings shared with pilot educational institutes or upon request.</p>
          <button
            onClick={() => onNavigate("signup")}
            className="bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 shadow-md shadow-blue/20 transition-all"
          >
            Get in Touch &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
