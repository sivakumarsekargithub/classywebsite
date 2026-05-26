import { useState, useRef } from "react";
import { SectionChip } from "@/components/SectionChip";
import { Check, Smartphone, Apple, Download } from "lucide-react";

interface GetAppPageProps {
  onNavigate: (page: string) => void;
}

function CommunityFormPreview({ onNavigate }: GetAppPageProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-navy/5">
      <h3 className="text-3xl font-display text-foreground">Join the Classy Community</h3>
      <p className="mt-3 text-sm font-body text-mid-grey leading-relaxed">
        Sign up below to get access, stay updated, and be the first to know when we go live on Play Store and App Store.
      </p>

      <div className="mt-6 h-[440px] overflow-y-auto rounded-xl border border-border bg-[#f1eefc] p-4">
        <div className="overflow-hidden rounded-lg bg-card shadow-sm">
          <div className="h-3 bg-[#673ab7]" />
          <div className="border-b border-border p-5">
            <h4 className="text-3xl font-body font-semibold text-foreground">Users - Classy</h4>
            <p className="mt-5 text-sm font-body font-semibold text-mid-grey">
              public.acc2001@gmail.com <span className="font-normal text-blue underline">Switch account</span>
            </p>
            <p className="mt-3 text-sm font-body text-mid-grey">Not shared</p>
          </div>
          <div className="p-5 text-sm font-body text-destructive">* Indicates required question</div>
        </div>

        {[
          { label: "Name", required: true },
          { label: "Phone (Whatsapp)", required: true },
          { label: "Email", required: false },
        ].map((field) => (
          <div key={field.label} className="mt-4 rounded-lg bg-card p-5 shadow-sm">
            <label className="text-base font-body font-medium text-foreground">
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <div className="mt-10 w-1/2 min-w-[180px] border-b border-border pb-1 text-sm font-body text-mid-grey">Your answer</div>
          </div>
        ))}

        <div className="mt-4 rounded-lg bg-card p-5 shadow-sm">
          <p className="text-base font-body font-medium text-foreground">Who are you ? <span className="text-destructive">*</span></p>
          {["Coach", "Teacher", "Parent", "Institute Owner", "Student"].map((role) => (
            <label key={role} className="mt-5 flex items-center gap-3 text-sm font-body text-foreground">
              <span className="h-5 w-5 rounded-sm border-2 border-mid-grey" />
              {role}
            </label>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs font-body text-mid-grey">
        By submitting this form you agree to our <button onClick={() => onNavigate("privacy")} className="text-blue">Privacy Policy</button> and{" "}
        <button onClick={() => onNavigate("terms")} className="text-blue">Terms &amp; Conditions</button>.
      </p>
    </div>
  );
}

const onboardingSteps = [
  { number: "01", title: "Download", desc: "Get the Classy app from your native play store." },
  { number: "02", title: "Select Your Role", desc: "Choose your identity from our dynamic persona cards." },
  { number: "03", title: "Profile Setup", desc: "Fill in only the basic details needed for your role." },
  { number: "04", title: "Get Started", desc: "Unlock your dashboard and start using Classy." },
];

const roleFeatures = [
  {
    label: "Teacher",
    icon: "👩‍🏫",
    title: "The Classroom Command Center",
    desc: "Everything an educator needs to host and manage a learning ecosystem.",
    chips: ["Classroom Owner: Create & Manage", "Smart Assignments", "Instant Broadcast Announcements", "Unified Timetable Schedules", "Digital Note Sharing Hub", "Automated Tests & Exams"],
    previewTitle: "Grade 7A Dashboard",
    stats: ["Attendance 32/34", "Assignments 78%", "Announcements 3 sent", "Tests Today 2"],
  },
  {
    label: "Students",
    icon: "🎓",
    title: "Never Miss What Matters",
    desc: "A clean daily view of assignments, exams, notes, schedules, and progress.",
    chips: ["Assignment Feed", "Exam Calendar", "Progress Tracking", "Study Notes", "Deadline Alerts", "Class Timetable"],
    previewTitle: "Student Today",
    stats: ["Due Soon 3", "Attendance 94%", "Next Test Friday", "Notes 12 new"],
  },
  {
    label: "Parents",
    icon: "👨‍👩‍👧",
    title: "Know Without Chasing",
    desc: "Parents get reliable visibility into attendance, homework, results, and official updates.",
    chips: ["Live Attendance", "Homework Updates", "Result Alerts", "Announcement Inbox", "Teacher Chat", "Calendar View"],
    previewTitle: "Parent Snapshot",
    stats: ["Present Today", "Homework 2 due", "Result 87%", "Messages 1 new"],
  },
  {
    label: "Institutes",
    icon: "🏛️",
    title: "Institution-Level Control",
    desc: "Management gets a bird's-eye view of classes, staff activity, attendance, and communication.",
    chips: ["Admin Dashboard", "Batch Oversight", "Broadcasts", "Reports", "Staff Coordination", "Support Tools"],
    previewTitle: "Institute Overview",
    stats: ["Attendance 94%", "Classes 18 live", "Complaints 0", "Broadcast 91% read"],
  },
  {
    label: "Courses & Skills",
    icon: "🚀",
    title: "Launch Learning Communities",
    desc: "Course creators can publish learning paths, manage learners, and track outcomes.",
    chips: ["Course Builder", "Learner Community", "Payments Ready", "Progress Reports", "Certificates", "No Commission"],
    previewTitle: "Course Studio",
    stats: ["Learners 126", "Completion 81%", "Revenue Yours", "Cohorts 4"],
  },
];

function RolePreview({ role }: { role: (typeof roleFeatures)[number] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-navy/5">
      <div className="rounded-xl border border-border p-5">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-body font-bold text-foreground">{role.previewTitle}</h3>
            <p className="text-xs font-body text-mid-grey">Today · live workspace</p>
          </div>
          <span className="rounded-lg bg-blue px-4 py-2 text-xs font-body font-bold text-primary-foreground">+ New</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {role.stats.map((stat, index) => (
            <div
              key={stat}
              className={`rounded-lg p-4 text-sm font-body ${
                index % 2 === 0 ? "bg-teal/10 text-teal" : "bg-blue/10 text-blue"
              }`}
            >
              {stat}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-border bg-off-white p-4">
          <div className="flex items-center justify-between text-xs font-body text-mid-grey mb-2">
            <span>Activity Progress</span>
            <span>87%</span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full w-[87%] rounded-full bg-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GetAppPage({ onNavigate }: GetAppPageProps) {
  const [activeRole, setActiveRole] = useState(0);
  const downloadRef = useRef<HTMLDivElement>(null);

  const scrollToDownload = () => {
    downloadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const trustItems = ["✓ Free to try", "✓ 30-day pilot", "✓ No lock-in", "✓ Dedicated support"];

  return (
    <div>
      {/* SECTION 1 — HERO */}
      <section className="section-pad pt-32 md:pt-40" style={{ background: "linear-gradient(135deg, hsl(var(--sky)) 0%, #f0fdfa 100%)" }}>
        <div className="rev max-w-3xl mx-auto text-center">
          <SectionChip label="Now Available" color="teal" />
          <h1 className="text-4xl md:text-6xl font-display mt-6 mb-4">
            Download Classy. <span className="italic text-blue">Start transforming</span> your educational institute today.
          </h1>
          <p className="text-lg text-mid-grey font-body max-w-2xl mx-auto">
            One app. Every stakeholder connected. Built for Indian educational institutes, shaped by real classroom research.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {trustItems.map((t) => (
              <span key={t} className="bg-card rounded-full px-4 py-2 text-sm font-body font-medium text-foreground border border-border">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — ONBOARDING FLOW */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="rev text-center mb-12">
            <SectionChip label="Onboarding Flow" color="blue" />
            <h2 className="text-3xl md:text-5xl font-display mt-4">Get Started in 4 Easy Steps</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {onboardingSteps.map((step, index) => (
              <div key={step.number} className="rev bg-card rounded-xl border border-border p-6 text-center card-lift" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue text-primary-foreground text-2xl font-display shadow-lg shadow-blue/20">
                  {step.number}
                </div>
                <h3 className="font-body font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm font-body text-mid-grey leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — ROLE-BASED FEATURES */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="rev text-center mb-10">
            <SectionChip label="Built For Every Role" color="teal" />
            <h2 className="text-3xl md:text-5xl font-display mt-4">One app. Five perspectives.</h2>
          </div>
          <div className="rev flex flex-wrap justify-center gap-3 border-b border-border pb-6 mb-10">
            {roleFeatures.map((role, index) => (
              <button
                key={role.label}
                onClick={() => setActiveRole(index)}
                className={`rounded-full border px-5 py-3 text-sm font-body font-semibold transition-all ${
                  activeRole === index
                    ? "bg-blue text-primary-foreground border-blue shadow-md shadow-blue/20"
                    : "bg-card text-mid-grey border-border hover:text-foreground"
                }`}
              >
                <span className="mr-2">{role.icon}</span>{role.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rev">
              <h3 className="text-3xl md:text-4xl font-display mb-4">{roleFeatures[activeRole].title}</h3>
              <p className="text-mid-grey font-body leading-relaxed mb-8 max-w-xl">{roleFeatures[activeRole].desc}</p>
              <div className="flex flex-wrap gap-3">
                {roleFeatures[activeRole].chips.map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-sky px-4 py-2 text-xs font-body font-semibold text-blue">
                    <Check className="h-3.5 w-3.5" /> {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="rev" style={{ transitionDelay: "120ms" }}>
              <RolePreview role={roleFeatures[activeRole]} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — APP DOWNLOAD */}
      <section ref={downloadRef} className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="rev text-center mb-12">
            <SectionChip label="Download the App" color="blue" />
            <h2 className="text-3xl md:text-5xl font-display mt-4">The classroom in your pocket. <span className="italic text-blue">Available now.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Download options */}
            <div className="space-y-6 rev">
              {/* Android */}
              <div className="rounded-xl border-2 border-blue/30 bg-card p-6 shadow-lg shadow-blue/5">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-8 h-8 text-blue" />
                  <div>
                    <p className="font-body font-bold text-foreground">Android App</p>
                    <p className="text-sm text-mid-grey font-body">Compatible with Android 8.0 and above</p>
                  </div>
                </div>
                <a href="https://play.google.com/store/apps/details?id=com.classy.mobile&pli=1 " target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all shadow-md shadow-blue/20 mb-2">
                  <Download className="w-4 h-4" /> Download on Play Store
                </a>
                <p className="text-xs text-mid-grey font-body text-center">Available on Google Play · Free download</p>
              </div>

              {/* iOS */}
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Apple className="w-8 h-8 text-mid-grey" />
                  <div>
                    <p className="font-body font-bold text-foreground">iPhone &amp; iPad</p>
                    <p className="text-sm text-mid-grey font-body">iOS 14 and above</p>
                  </div>
                </div>
                <button disabled className="w-full border-2 border-border text-mid-grey rounded-lg px-6 py-3 text-sm font-body font-semibold opacity-60 cursor-not-allowed mb-2">
                  Coming Soon
                </button>
                <p className="text-xs text-teal font-body">🚀 App for iOS is on the way — sign up via the form to be notified first.</p>
              </div>

              {/* Store listing banner */}
              <div className="rounded-xl border border-border bg-muted/20 p-5">
                <p className="text-sm font-body text-mid-grey mb-4">📋 Listing in progress — Classy is currently being reviewed for listing on the Google Play Store and Apple App Store. Once approved, you'll be able to install directly without any extra steps.</p>
                <div className="flex gap-4">
                  {["Google Play", "App Store"].map((store) => (
                    <div key={store} className="relative flex-1 rounded-lg border border-border bg-muted/40 h-14 flex items-center justify-center">
                      <span className="text-xs font-body text-mid-grey">{store}</span>
                      <span className="absolute inset-0 flex items-center justify-center bg-muted/60 rounded-lg text-xs font-body font-semibold text-mid-grey">Coming Soon</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Community form preview */}
            <div className="rev" style={{ transitionDelay: "150ms" }}>
              <CommunityFormPreview onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF */}
      <section className="section-pad" style={{ background: "#f0fdfa" }}>
        <div className="max-w-3xl mx-auto text-center rev">
          <p className="text-5xl md:text-7xl font-display italic text-navy mb-2">112 out of 112 parents</p>
          <p className="text-lg font-body text-mid-grey mb-8">surveyed said they would pay for an educational institute app if it showed just three things:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["📅 Live Attendance", "🗓️ Timetable", "📝 Assignments"].map((item) => (
              <span key={item} className="bg-card rounded-full px-6 py-3 text-base font-body font-semibold border border-border shadow-sm">{item}</span>
            ))}
          </div>
          <hr className="border-border mb-8" />
          <div className="bg-amber/10 border border-amber/20 rounded-xl p-6 text-left">
            <p className="font-body text-sm text-foreground leading-relaxed">
              <strong>We heard you — and went further.</strong> Classy delivers all three, plus Announcements, Exam &amp; Test Schedules, Direct Teacher–Parent Chat, Academic Progress Tracking, and a lot more features on the way.
            </p>
            <p className="font-body text-sm text-foreground mt-3 font-semibold">And we kept the price exactly where parents said they'd be comfortable.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PARENT PROOF */}
      <section className="section-pad bg-navy text-navy-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="rev text-center mb-12">
            <span className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold font-body bg-navy-foreground/10 text-navy-foreground/70">What Parents Told Us</span>
            <h2 className="text-3xl md:text-5xl font-display mt-4">100% of parents surveyed said yes. <span className="italic">Here's what they actually said.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "If I can see my child's attendance every morning and check what homework is due — I'd pay for that without a second thought. This is what every educational institute needs.", who: "Parent, Class 6, Chennai" },
              { q: "We pay for tuition apps that do half of this. ₹500 a year is nothing if the educational institute communication actually works.", who: "Parent, Grade 9 student's parent" },
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

      {/* SECTION 6 — FINAL CTA */}
      <section className="section-pad" style={{ background: "linear-gradient(135deg, hsl(var(--blue)) 0%, hsl(var(--teal)) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center rev">
          <h2 className="text-3xl md:text-5xl font-display text-primary-foreground mb-10">Ready to bring Classy to your educational institute?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
              <p className="text-4xl mb-3">🏫</p>
              <p className="font-body font-bold text-primary-foreground text-lg mb-4">I represent an educational institute</p>
              <button onClick={() => onNavigate("pricing")} className="w-full bg-primary-foreground text-navy rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-95 transition-all">View Pricing →</button>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
              <p className="text-4xl mb-3">👨‍👩‍👦</p>
              <p className="font-body font-bold text-primary-foreground text-lg mb-4">I'm a parent or teacher</p>
              <button onClick={scrollToDownload} className="w-full border-2 border-primary-foreground text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-primary-foreground/10 transition-all">Download the App →</button>
              <p className="text-xs text-primary-foreground/60 font-body mt-3">Share with your educational institute management to get Classy adopted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
