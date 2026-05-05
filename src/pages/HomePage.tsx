import { SectionChip } from "@/components/SectionChip";
import { PilotCTABanner } from "@/components/PilotCTABanner";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const solutions = [
  { icon: "✅", title: "Attendance Tracking", desc: "One-tap daily marking with instant parent notifications" },
  { icon: "📝", title: "Assignments & Homework", desc: "Teachers assign, students submit, parents stay informed" },
  { icon: "🏆", title: "Exam Results", desc: "Publish results instantly with historical tracking" },
  { icon: "📢", title: "Announcements", desc: "Targeted announcements with read receipts" },
  { icon: "🗓️", title: "Timetable Management", desc: "Live, always-accurate timetables" },
  { icon: "💬", title: "Teacher–Parent Communication", desc: "Structured professional messaging" },
  { icon: "📊", title: "Student Academic Insights", desc: "Longitudinal progress dashboards" },
  { icon: "🏫", title: "Admin Dashboard", desc: "Bird's-eye view of operations" },
];

const stakeholderCards = [
  { icon: "👩‍🏫", title: "Teachers", desc: "Spend less time on admin, more time on teaching" },
  { icon: "👨‍👩‍👦", title: "Parents", desc: "Stay genuinely informed about your child's academic life" },
  { icon: "🎒", title: "Students", desc: "Never miss a deadline, always know the timetable" },
  { icon: "🏫", title: "Institute Management", desc: "Unified visibility into institutional operations" },
];

const testimonials = [
  {
    quote: "I spend almost 15 minutes every morning just marking attendance and sending notes home. If Classy can automate even half of that, it transforms my mornings completely.",
    author: "Teacher",
    detail: "Private Educational Institute, Chennai",
  },
  {
    quote: "I only find out about my daughter's homework when she's already missed a deadline. I shouldn't have to chase the educational institute diary every night.",
    author: "Parent",
    detail: "Class 7 student's parent, Chennai",
  },
  {
    quote: "Sometimes two teachers assign homework on the same day and I don't know which to do first. A proper app where everything is listed would make studying so much less stressful.",
    author: "Student",
    detail: "Grade 8, Private Educational Institute",
  },
];

const insights = [
  { icon: "📋", title: "Attendance is still largely manual", desc: "Most educational institutes rely on pen-and-paper registers with no real-time visibility for parents." },
  { icon: "💬", title: "Parents want timely, structured updates", desc: "Informal WhatsApp groups fail to deliver consistent, reliable academic communication." },
  { icon: "📚", title: "Assignment tracking lacks consistency", desc: "Teachers, students, and parents each have different versions of what's due and when." },
  { icon: "🗓️", title: "Timetable confusion is widespread", desc: "Students frequently arrive unprepared due to last-minute schedule changes they weren't informed about." },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-sky to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="rev inline-flex items-center gap-2 rounded-full bg-sky px-4 py-1.5 text-sm font-body font-medium text-blue mb-8">
            <span className="w-2 h-2 rounded-full bg-blue pulse-dot inline-block" />
            Now accepting pilot educational institutes
          </div>
          <h1 className="rev text-4xl md:text-6xl font-display leading-tight mb-6">
            Educational institute communication,{" "}
            <em className="text-blue">finally simplified.</em>
          </h1>
          <p className="rev text-lg text-mid-grey font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Classy connects teachers, parents, and students on one intelligent platform &mdash; reducing administrative burden, closing visibility gaps, and putting learning back at the centre.
          </p>
          <div className="rev flex flex-wrap justify-center gap-4 mb-16">
            <button onClick={() => onNavigate("signup")} className="bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 shadow-md shadow-blue/20 transition-all">
              Get Early Access &rarr;
            </button>
            <button onClick={() => onNavigate("pilot")} className="border-2 border-blue text-blue rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-blue hover:text-primary-foreground transition-all">
              Apply for Pilot
            </button>
          </div>
          <div className="rev border-t border-border pt-8">
            <p className="text-xs text-mid-grey font-body uppercase tracking-widest mb-4">Built on research from</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Multiple educational institutes", "Students & parents", "Classroom teachers", "Administrators"].map((t) => (
                <span key={t} className="rounded-full bg-card border border-border px-4 py-1.5 text-xs font-body text-mid-grey">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-pad bg-navy text-navy-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 rev">
            <SectionChip label="The Problem" color="blue" />
            <h2 className="text-3xl md:text-5xl font-display mt-4 mb-4">Educational Institutes are losing time every single day</h2>
            <p className="text-navy-foreground/60 font-body max-w-2xl mx-auto">Our extensive research across educational institutes revealed consistent patterns of inefficiency and disconnection.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Classroom time lost to administration", desc: "Teachers spend valuable instructional time collecting assignments, recording attendance, and managing routine communication." },
              { num: "02", title: "The parent visibility gap", desc: "Parents have little real-time insight into their child's academic progress, daily attendance, or institutional announcements." },
              { num: "03", title: "Teacher workload at scale", desc: "Managing multiple classes and hundreds of individual student records makes personalised progress tracking nearly impossible." },
            ].map((c) => (
              <div key={c.num} className="rev dark-glass-card rounded-xl p-6 card-lift">
                <span className="text-blue-light font-body font-bold text-sm">{c.num}</span>
                <h3 className="text-lg font-display mt-2 mb-3">{c.title}</h3>
                <p className="text-sm text-navy-foreground/60 font-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Insights */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="rev">
            <SectionChip label="Research Insights" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4 mb-4">What our research uncovered</h2>
            <p className="text-mid-grey font-body mb-8 leading-relaxed">
              Insights gathered from extensive interviews with parents, students, teachers, and administrators across multiple educational institutes.
            </p>
            <button onClick={() => onNavigate("resources")} className="bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 shadow-md shadow-blue/20 transition-all">
              Read the Research Reports
            </button>
          </div>
          <div className="grid gap-4">
            {insights.map((ins, i) => (
              <div key={i} className="rev bg-card rounded-xl p-5 border border-border card-lift flex gap-4 items-start" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="text-2xl shrink-0 mt-0.5">{ins.icon}</span>
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">{ins.title}</h4>
                  <p className="text-sm text-mid-grey font-body leading-relaxed">{ins.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto text-center mb-12 rev">
          <SectionChip label="The Solution" color="teal" />
          <h2 className="text-3xl md:text-5xl font-display mt-4 mb-4">One platform. Every workflow, connected.</h2>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((s, i) => (
            <div key={i} className="rev bg-off-white rounded-xl p-5 border border-border card-lift" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="text-2xl">{s.icon}</span>
              <h4 className="font-body font-semibold mt-3 mb-1 text-foreground">{s.title}</h4>
              <p className="text-sm text-mid-grey font-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders Preview */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 rev">
            <SectionChip label="Who It's For" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Built for everyone in the educational institute</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stakeholderCards.map((s, i) => (
              <button
                key={i}
                onClick={() => onNavigate("stakeholders")}
                className="rev bg-card rounded-xl p-6 border border-border card-lift text-left group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-3xl">{s.icon}</span>
                <h4 className="font-body font-semibold mt-3 mb-2 text-foreground">{s.title}</h4>
                <p className="text-sm text-mid-grey font-body mb-3">{s.desc}</p>
                <span className="text-sm text-blue font-body font-medium group-hover:underline">Learn more &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 rev">
            <SectionChip label="What They Say" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Voices from the classroom</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rev bg-off-white rounded-xl p-6 border border-border card-lift" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-foreground font-body text-sm leading-relaxed mb-6 italic">&#8220;{t.quote}&#8221;</p>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">{t.author}</p>
                  <p className="text-xs text-mid-grey font-body">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PilotCTABanner onNavigate={onNavigate} />
    </div>
  );
}
