import { SectionChip } from "@/components/SectionChip";
import { PilotCTABanner } from "@/components/PilotCTABanner";

interface StakeholdersPageProps {
  onNavigate: (page: string) => void;
}

const stakeholders = [
  {
    tag: "Teachers",
    tagColor: "blue" as const,
    pains: [
      "Manual attendance taking every class",
      "Disorganised assignment collection",
      "Reactive, informal parent communication",
      "No longitudinal student trend view",
      "Manual exam result compilation",
    ],
    helps: [
      "One-tap attendance with automatic parent alerts",
      "Digital assignment deadlines and tracking",
      "In-app structured parent messaging",
      "Progress dashboards per student",
      "Instant results publishing",
    ],
    mockups: [
      { title: "Attendance — Grade 7A", detail: "32 Present · 2 Absent", badge: "Notified", badgeColor: "bg-teal/10 text-teal" },
      { title: "Assignment Posted", detail: "Science — Chapter 5 Worksheet", badge: "Due Fri", badgeColor: "bg-amber/10 text-amber" },
      { title: "Parent Message", detail: "Mrs. Sharma re: Arjun's progress", badge: "New", badgeColor: "bg-blue/10 text-blue" },
      { title: "Progress Alert", detail: "3 students declining in Maths", badge: "Review", badgeColor: "bg-destructive/10 text-destructive" },
    ],
  },
  {
    tag: "Parents",
    tagColor: "teal" as const,
    reverse: true,
    pains: [
      "No attendance visibility until PTM",
      "Informal, unreliable homework communication",
      "Performance only visible at parent-teacher day",
      "Missed institutional announcements",
      "No direct teacher communication channel",
    ],
    helps: [
      "Real-time attendance notifications",
      "Homework and exam visibility",
      "Ongoing progress tracking",
      "Instant institutional announcements",
      "Direct teacher messaging",
    ],
    mockups: [
      { title: "Attendance Confirmed", detail: "Arjun — Present today", badge: "Present", badgeColor: "bg-teal/10 text-teal" },
      { title: "Homework Due Tomorrow", detail: "Maths — Exercise 4.3", badge: "Due", badgeColor: "bg-amber/10 text-amber" },
      { title: "Exam Results Published", detail: "Term 1 — Science: 87/100", badge: "New", badgeColor: "bg-blue/10 text-blue" },
      { title: "Institute Announcement", detail: "Annual Day rehearsals from Monday", badge: "Read", badgeColor: "bg-mid-grey/20 text-mid-grey" },
    ],
  },
  {
    tag: "Students",
    tagColor: "amber" as const,
    pains: [
      "Inconsistent homework communication",
      "Timetable confusion and last-minute changes",
      "No personal progress tracking",
      "Hard to plan around exams",
    ],
    helps: [
      "Unified assignment feed with deadlines",
      "Live timetable with change alerts",
      "Personal progress view",
      "Exam calendar with reminders",
    ],
    mockups: [
      { title: "Today's Timetable", detail: "Maths · English · Science · PT", badge: "Live", badgeColor: "bg-teal/10 text-teal" },
      { title: "Pending Assignments", detail: "3 due this week", badge: "3 Due", badgeColor: "bg-amber/10 text-amber" },
      { title: "Your Progress", detail: "Science ↑ · Maths → · English ↑", badge: "Updated", badgeColor: "bg-blue/10 text-blue" },
    ],
  },
  {
    tag: "Institute Management",
    tagColor: "navy" as const,
    dark: true,
    pains: [
      "No unified attendance or academic view",
      "Communication breakdowns between stakeholders",
      "Manual report generation",
      "Unreliable announcement delivery",
    ],
    helps: [
      "Institution-wide operational dashboard",
      "Communication oversight and audit trail",
      "Automated performance summaries",
      "Broadcast with delivery confirmation",
    ],
    mockups: [
      { title: "Institute Attendance", detail: "Today: 94.3% overall", badge: "Live", badgeColor: "bg-teal/10 text-teal" },
      { title: "Grade 9 Performance", detail: "Average up 4% this term", badge: "↑ Up", badgeColor: "bg-teal/10 text-teal" },
      { title: "Last Announcement", detail: "91% read rate", badge: "91%", badgeColor: "bg-blue/10 text-blue" },
    ],
  },
];

export function StakeholdersPage({ onNavigate }: StakeholdersPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 text-center bg-gradient-to-b from-sky to-background">
        <div className="rev max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display mb-4">Everyone benefits. Everyone is connected.</h1>
          <p className="text-lg text-mid-grey font-body">See how Classy transforms the experience for every stakeholder in the educational institute ecosystem.</p>
        </div>
      </section>

      {/* Stakeholder sections */}
      {stakeholders.map((s, idx) => {
        const isReverse = s.reverse || false;
        const isDark = s.dark || false;
        return (
          <section
            key={s.tag}
            className={`section-pad ${isDark ? "bg-navy text-navy-foreground" : idx % 2 === 0 ? "bg-card" : "bg-off-white"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className={`grid md:grid-cols-2 gap-12 items-start ${isReverse ? "md:direction-rtl" : ""}`}>
                {/* Content */}
                <div className={`rev ${isReverse ? "md:order-2" : ""}`}>
                  <SectionChip label={s.tag} color={s.tagColor} />
                  <h2 className={`text-3xl md:text-4xl font-display mt-4 ${isDark ? "text-navy-foreground" : "text-foreground"}`}>{s.tag}</h2>
                  <div className="mt-6 mb-6">
                    <h3 className="font-body font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">Pain Points</h3>
                    <ul className="space-y-2">
                      {s.pains.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-body">
                          <span className="text-destructive mt-0.5 shrink-0">&#10005;</span>
                          <span className={isDark ? "text-navy-foreground/80" : "text-mid-grey"}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">How Classy Helps</h3>
                    <ul className="space-y-2">
                      {s.helps.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-body">
                          <span className="text-teal mt-0.5 shrink-0">&#10003;</span>
                          <span className={isDark ? "text-navy-foreground/80" : "text-foreground"}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Mockups */}
                <div className={`rev space-y-3 ${isReverse ? "md:order-1" : ""}`} style={{ transitionDelay: "150ms" }}>
                  {s.mockups.map((m, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border card-lift ${
                        isDark
                          ? "dark-glass-card border-navy-foreground/10"
                          : "bg-card border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-body font-semibold text-sm ${isDark ? "text-navy-foreground" : "text-foreground"}`}>{m.title}</p>
                          <p className={`text-xs font-body mt-0.5 ${isDark ? "text-navy-foreground/60" : "text-mid-grey"}`}>{m.detail}</p>
                        </div>
                        <span className={`text-xs font-body font-medium rounded-full px-3 py-1 ${m.badgeColor}`}>
                          {m.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <PilotCTABanner onNavigate={onNavigate} />
    </div>
  );
}
