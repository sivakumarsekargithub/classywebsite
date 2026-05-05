import { SectionChip } from "@/components/SectionChip";

interface Props {
  onNavigate: (page: string) => void;
}

interface InstitutionCard {
  icon: string;
  title: string;
  target: string;
  painSolved: string[];
  classyGives: string[];
  tag: string;
}

function InstCard({ card }: { card: InstitutionCard }) {
  return (
    <div className="rev bg-card rounded-2xl p-6 border border-border card-lift flex flex-col">
      <span className="text-3xl mb-3">{card.icon}</span>
      <h3 className="font-display text-xl mb-1 text-foreground">{card.title}</h3>
      <p className="text-xs font-body text-mid-grey mb-4">{card.target}</p>
      <div className="mb-4">
        <h4 className="font-body font-semibold text-xs text-destructive/80 uppercase tracking-wide mb-2">Pain Solved</h4>
        <ul className="space-y-1.5">
          {card.painSolved.map((p) => (
            <li key={p} className="text-xs font-body text-mid-grey flex gap-2"><span className="text-destructive/60 shrink-0">✗</span>{p}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4 flex-1">
        <h4 className="font-body font-semibold text-xs text-teal uppercase tracking-wide mb-2">Classy Gives Them</h4>
        <ul className="space-y-1.5">
          {card.classyGives.map((g) => (
            <li key={g} className="text-xs font-body text-foreground flex gap-2"><span className="text-teal shrink-0">✓</span>{g}</li>
          ))}
        </ul>
      </div>
      <span className="inline-block bg-sky rounded-full px-3 py-1 text-xs font-body text-blue font-medium mt-auto self-start">{card.tag}</span>
    </div>
  );
}

function CompactCard({ icon, title, points }: { icon: string; title: string; points: string[] }) {
  return (
    <div className="rev bg-card rounded-2xl p-6 border border-border card-lift">
      <span className="text-2xl mb-2 block">{icon}</span>
      <h3 className="font-display text-lg mb-3 text-foreground">{title}</h3>
      <ul className="space-y-1.5">
        {points.map((p) => (
          <li key={p} className="text-xs font-body text-mid-grey flex gap-2"><span className="text-teal shrink-0">✓</span>{p}</li>
        ))}
      </ul>
    </div>
  );
}

const mainstream: InstitutionCard[] = [
  {
    icon: "🏫",
    title: "Schools (K–12)",
    target: "Primary, Middle, High School",
    painSolved: [
      "Daily attendance eating 15+ minutes per teacher",
      "Parent groups overflowing with noise",
      "Assignments tracked in notebooks nobody reads",
      "Exam results shared via printed slips",
    ],
    classyGives: [
      "One-tap attendance + instant parent SMS",
      "Structured assignment feed",
      "Digital result publishing",
      "Direct teacher-parent messaging",
    ],
    tag: "Most common pilot candidate",
  },
  {
    icon: "🎓",
    title: "Colleges & Universities",
    target: "Degree, Diploma, Engineering, Arts, Science",
    painSolved: [
      "Faculty-student communication scattered across email, WhatsApp, and notice boards",
      "Attendance compliance manually intensive for large batches",
      "No central place for internal announcements",
      "Exam timetables change and nobody gets notified",
    ],
    classyGives: [
      "Batch-wise attendance with compliance reports",
      "Department announcement system",
      "Faculty-student direct messaging",
      "Timetable management with change alerts",
    ],
    tag: "High volume, high impact",
  },
  {
    icon: "🌱",
    title: "Pre-Schools & Kindergartens",
    target: "Playschools, LKG/UKG, Montessori, Daycare",
    painSolved: [
      "Parents are anxious and call constantly",
      "Daily updates sent via personal WhatsApp",
      "No professional communication channel",
      "Manual attendance with paper registers",
    ],
    classyGives: [
      "Daily child activity updates to parents",
      "Photo-safe announcements",
      "Structured pickup and attendance confirmation",
      "Professional parent communication channel",
    ],
    tag: "Highest parent engagement",
  },
];

const allied: InstitutionCard[] = [
  {
    icon: "📚",
    title: "Tuition Centers",
    target: "Private tuitions, home tutoring networks, subject-specific centers",
    painSolved: [
      "Homework given verbally, forgotten instantly",
      "Parents don't know what was covered",
      "Fee reminders via personal WhatsApp",
      "No attendance record = fee disputes",
    ],
    classyGives: [
      "Session-wise homework assignment",
      "Parent update after every class",
      "Attendance history for fee validation",
      "Announcement channel for holidays/schedule changes",
    ],
    tag: "Quick to adopt",
  },
  {
    icon: "🧪",
    title: "Coaching Centers",
    target: "JEE, NEET, CA, CMA, Law entrance, MBA entrance",
    painSolved: [
      "Multiple batches across multiple teachers with zero coordination",
      "Test schedules change constantly",
      "Student performance across mock tests not tracked centrally",
      "Parents paying high fees have no visibility",
    ],
    classyGives: [
      "Batch-wise timetable and test schedules",
      "Mock test result publishing with rank tracking",
      "Parent progress dashboard",
      "Teacher coordination through admin channel",
    ],
    tag: "High fee, high expectations",
  },
  {
    icon: "🏋️",
    title: "Skill & Training Centers",
    target: "Spoken English, coding bootcamps, music academies, art schools, sports academies",
    painSolved: [
      "No structured attendance for session-based programs",
      "Certificate/schedule communication is informal",
      "Student progress not shared with parents",
      "High dropout due to low engagement",
    ],
    classyGives: [
      "Session attendance and progress tracking",
      "Certificate milestone announcements",
      "Schedule management with notifications",
      "Parent involvement for minor students",
    ],
    tag: "Retention booster",
  },
];

const professional = [
  {
    icon: "📜",
    title: "Certification Programs",
    points: ["Batch coordination across cohorts", "Assignment and project tracking", "Certificate issuance communication", "Alumni and post-program follow-up channel"],
  },
  {
    icon: "💼",
    title: "Corporate Training",
    points: ["Employee batch management", "Training material announcements", "Assessment tracking and result sharing", "Manager visibility into team progress"],
  },
  {
    icon: "🏆",
    title: "Competitive Exam Institutes",
    points: ["Exam schedule and syllabus updates", "Daily current affairs announcements", "Mock test tracking and leaderboard", "Student doubt and query channel"],
  },
  {
    icon: "🌐",
    title: "Online & Hybrid Learning",
    points: ["Asynchronous assignment management", "Live session schedules and links", "Attendance tracking for hybrid cohorts", "Parent/guardian notifications regardless of location"],
  },
];

export function WhoNeedsClassyPage({ onNavigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad pt-32 md:pt-40 bg-gradient-to-b from-sky to-background">
        <div className="max-w-3xl mx-auto text-center rev">
          <SectionChip label="Built For Everyone In Education" color="teal" />
          <h1 className="text-4xl md:text-5xl font-display mt-4 mb-4">
            If you run, teach, study, or manage an institution — Classy is built for you.
          </h1>
          <p className="text-mid-grey font-body leading-relaxed max-w-2xl mx-auto">
            Every educational institution has the same core problem: communication is broken, administration is manual, and people are drowning in group messages. Classy fixes this for all of them.
          </p>
        </div>
      </section>

      {/* Mainstream */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 rev">
            <SectionChip label="Primary Market" color="blue" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Educational Institutes, Colleges & Pre-Schools</h2>
            <p className="text-mid-grey font-body mt-2">The institutions where Classy was born — and where its impact is most immediate.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mainstream.map((c, i) => (
              <div key={c.title} style={{ transitionDelay: `${i * 80}ms` }}><InstCard card={c} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* Allied */}
      <section className="section-pad bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 rev">
            <SectionChip label="Allied Market" color="teal" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Tuitions, Coaching & Training</h2>
            <p className="text-mid-grey font-body mt-2">Smaller institutions with the same communication chaos — and even less admin infrastructure.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {allied.map((c, i) => (
              <div key={c.title} style={{ transitionDelay: `${i * 80}ms` }}><InstCard card={c} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional */}
      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 rev">
            <SectionChip label="Professional Market" color="amber" />
            <h2 className="text-3xl md:text-4xl font-display mt-4">Certification, Corporate & Competitive Exams</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {professional.map((c, i) => (
              <div key={c.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <CompactCard {...c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-navy text-navy-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(217,91%,50%,0.15)_0%,_transparent_70%)] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto rev">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Don't see your institution type?</h2>
          <p className="text-navy-foreground/60 font-body mb-8">
            If you educate people — Classy works for you. Every institution that has teachers, students, and parents (or guardians) is a Classy institution.
          </p>
          <button
            onClick={() => onNavigate("signup")}
            className="bg-teal text-accent-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:bg-teal-light shadow-md shadow-teal/20 transition-all"
          >
            Talk to Us &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
