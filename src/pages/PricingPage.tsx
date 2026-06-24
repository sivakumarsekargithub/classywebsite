import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SectionChip } from "@/components/SectionChip";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const classroomPlans = [
  {
    name: "Free",
    badge: "FREE FOREVER",
    badgeClass: "bg-teal text-accent-foreground",
    price: "₹0",
    sub: "Always free · No credit card needed",
    features: [
      "Assignment management",
      "Teacher-parent communication",
      "Class schedules & timetable",
      "Attendance tracking",
      "Up to 3 classrooms",
      "Parent notifications",
      "Basic announcements",
    ],
    note: "Perfect for a single teacher, a small tuition center, or a school running a trial.",
    cta: "Get Started Free",
    page: "getapp",
  },
  {
    name: "Pro",
    badge: "PRO",
    badgeClass: "bg-blue text-primary-foreground",
    price: "₹149",
    sub: "per student / per year",
    helper: "= ₹0.41/day per student",
    features: [
      "Everything in Free",
      "Unlimited classrooms",
      "AI Assistant",
      "Library & resource management",
      "Storage facility",
      "Bus / Van tracking",
      "Admissions & Marketing tools",
      "Advanced reports & analytics",
      "Priority support",
      "More add-ons shipping every term",
    ],
    note: "A school of 200 students pays ₹29,800/year — less than ₹82/day for a fully connected school.",
    cta: "Upgrade to Pro",
    page: "signup",
    popular: true,
  },
] as const;

const comparisonRows = [
  ["Classrooms", "Up to 3", "Unlimited"],
  ["Assignments", "✓", "✓"],
  ["Attendance", "✓", "✓"],
  ["Communication", "✓", "✓"],
  ["Schedules", "✓", "✓"],
  ["AI Assistant", "—", "✓"],
  ["Library", "—", "✓"],
  ["Storage", "—", "✓"],
  ["Bus Tracking", "—", "✓"],
  ["Admissions & Marketing", "—", "✓"],
  ["Reports & Analytics", "—", "✓"],
  ["Support", "Basic", "Priority"],
];

const faqs = [
  {
    question: "Can I start with Free and upgrade later?",
    answer: "Yes. Start free, test Classy with up to 3 classrooms, and upgrade when your institution is ready for unlimited classrooms and advanced modules.",
  },
  {
    question: "How is the ₹149/student counted?",
    answer: "The Pro plan is priced per active student per year. Staff, teachers, and administrators are included for the institution.",
  },
  {
    question: "Is the Course plan separate from the Classroom plan?",
    answer: "Yes. Course Creator is an optional add-on for educators who want to create and sell courses, manage communities, and build a standalone learning business.",
  },
];

function FeatureCheck({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-sm font-body text-foreground">
      <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <section className="section-pad pt-32 md:pt-40 bg-gradient-to-b from-sky to-background">
        <div className="rev max-w-4xl mx-auto text-center">
          <SectionChip label="Simple, Honest Pricing" color="blue" />
          <h1 className="text-4xl md:text-6xl font-display mt-6 mb-4">
            The right plan <em className="text-blue">for every institution.</em>
          </h1>
          <p className="text-lg text-mid-grey font-body max-w-2xl mx-auto">
            Whether you're a classroom teacher or running a full institution, Classy has a plan that fits. Start free, grow when you're ready.
          </p>
        </div>
      </section>

      <section className="section-pad bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 rev">
            <SectionChip label="🏫 Classroom Features" color="blue" />
            <p className="text-mid-grey font-body mt-4">For schools, colleges, tuition centers, coaching institutes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {classroomPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`rev relative rounded-2xl border bg-card p-8 card-lift flex flex-col ${
                  "popular" in plan && plan.popular ? "border-2 border-blue shadow-xl shadow-blue/10" : "border-border"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {"popular" in plan && plan.popular && (
                  <span className="absolute -top-4 right-8 rounded-full bg-amber px-4 py-1.5 text-xs font-body font-bold text-foreground shadow-md">
                    MOST POPULAR
                  </span>
                )}
                <span className={`self-start rounded-full px-4 py-1.5 text-xs font-body font-bold ${plan.badgeClass}`}>{plan.badge}</span>
                <div className="mt-6">
                  <span className="text-5xl md:text-6xl font-display text-foreground">{plan.price}</span>
                  {" "}
                  {plan.name === "Pro" && <span className="ml-3 text-sm font-body text-mid-grey">{plan.sub}</span>}
                </div>
                {plan.name === "Free" && <p className="mt-3 text-sm font-body text-mid-grey">{plan.sub}</p>}
                {"helper" in plan && <p className="mt-2 text-sm font-body font-semibold text-blue">{plan.helper}</p>}

                <ul className="mt-8 space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <FeatureCheck key={feature}>{feature}</FeatureCheck>
                  ))}
                </ul>

                <div className={`mt-8 rounded-xl p-4 text-sm font-body ${"popular" in plan && plan.popular ? "bg-amber/10 border border-amber/30 text-foreground" : "bg-sky/50 text-mid-grey italic"}`}>
                  {plan.note}
                </div>
                <button
                  onClick={() => onNavigate(plan.page)}
                  className={`mt-6 rounded-lg px-6 py-3 text-sm font-body font-semibold transition-all ${
                    "popular" in plan && plan.popular
                      ? "bg-blue text-primary-foreground hover:brightness-110 shadow-md shadow-blue/20"
                      : "border-2 border-teal text-teal hover:bg-teal hover:text-accent-foreground"
                  }`}
                >
                  {plan.cta} &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-off-white">
        <div className="max-w-5xl mx-auto">
          <div className="rev text-center mb-10">
            <SectionChip label="🎓 Course Features" color="amber" />
            <p className="text-lg text-mid-grey font-body max-w-2xl mx-auto mt-6">
              For educators who want to create and sell courses, build communities, and grow beyond their classroom.
            </p>
          </div>

          <div className="rev rounded-2xl border border-border bg-card p-8 md:p-12 shadow-xl shadow-navy/5 text-center">
            <span className="inline-block rounded-full bg-amber px-4 py-1.5 text-xs font-body font-bold text-foreground">COURSE CREATOR</span>
            <div className="mt-6">
              <span className="text-5xl md:text-6xl font-display text-foreground">₹500</span>
              {" "}
              <span className="ml-3 text-sm font-body text-mid-grey">per month · per institution</span>
            </div>
            <p className="mt-4 font-display italic text-lg text-blue">"Turn your expertise into a business."</p>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto text-left mt-10">
              {[
                "Create & sell online courses",
                "Manage your audience",
                "Zero platform commission",
                "Build learner communities",
                "Analytics & performance tracking",
                "Your brand, your revenue",
              ].map((feature) => (
                <FeatureCheck key={feature}>{feature}</FeatureCheck>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-display text-amber mt-10">
              0% commission. Every rupee your course earns is yours.
            </p>
            <button
              onClick={() => onNavigate("signup")}
              className="mt-8 bg-amber text-foreground rounded-lg px-8 py-4 text-sm font-body font-bold hover:brightness-105 transition-all shadow-md shadow-amber/20"
            >
              Start Selling Courses &rarr;
            </button>
            <p className="text-xs font-body text-mid-grey mt-4">Works standalone or alongside Classroom plan</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="rev text-3xl md:text-4xl font-display text-center mb-10">Compare plans</h2>
          <div className="rev grid gap-3 md:hidden">
            {comparisonRows.map(([feature, free, pro]) => (
              <article key={feature} className="rounded-xl border border-border bg-off-white p-4">
                <h3 className="font-body text-base font-bold text-foreground">{feature}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm font-body">
                  <div className="rounded-lg bg-card p-3">
                    <dt className="mb-1 font-semibold text-mid-grey">Free</dt>
                    <dd className={free === "✓" ? "font-bold text-teal" : "font-medium text-mid-grey"}>{free}</dd>
                  </div>
                  <div className="rounded-lg bg-card p-3">
                    <dt className="mb-1 font-semibold text-blue">Pro</dt>
                    <dd className={pro === "✓" ? "font-bold text-teal" : "font-medium text-foreground"}>{pro}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="rev hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
            <table className="w-full min-w-[560px] text-sm font-body">
              <thead className="bg-off-white">
                <tr>
                  <th className="text-left p-5 font-bold text-foreground">Feature</th>
                  <th className="text-center p-5 font-bold text-foreground">Free</th>
                  <th className="text-center p-5 font-bold text-blue">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, free, pro]) => (
                  <tr key={feature} className="border-t border-border/60">
                    <td className="p-4 text-foreground">{feature}</td>
                    <td className={`p-4 text-center ${free === "✓" ? "text-teal" : "text-mid-grey"}`}>{free}</td>
                    <td className={`p-4 text-center font-medium ${pro === "✓" ? "text-teal" : "text-foreground"}`}>{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad bg-off-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="rev text-3xl md:text-4xl font-display text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="rev rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-body font-semibold text-foreground"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-mid-grey shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm font-body text-mid-grey leading-relaxed">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-navy-foreground text-center">
        <div className="max-w-3xl mx-auto rev">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Ready to get started?</h2>
          <p className="text-navy-foreground/70 font-body mb-8">
            Download the app and start with the Free plan today. No credit card required.
          </p>
          <button
            onClick={() => onNavigate("getapp")}
            className="bg-teal text-accent-foreground rounded-lg px-8 py-4 text-sm font-body font-semibold hover:bg-teal-light transition-all shadow-md shadow-teal/20"
          >
            Get the App &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
