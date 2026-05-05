import { useState } from "react";
import { SectionChip } from "@/components/SectionChip";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

const roles = ["Parent", "Student", "Teacher", "Institute Administrator", "Institute Management"];

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const required = ["name", "email", "phone", "role", "school", "city"];
    const newErrors: Record<string, boolean> = {};
    required.forEach((f) => {
      if (!data.get(f)?.toString().trim()) newErrors[f] = true;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xlgpnvzo", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
    } catch (_) {
      // submit anyway
    }
    setEmail(data.get("email")?.toString() || "");
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue/5 via-sky to-teal/5">
      <section className="section-pad pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="rev">
            <SectionChip label="Get Early Access" color="blue" />
            <h1 className="text-4xl md:text-5xl font-display mt-4 mb-4">Let&#8217;s connect your educational institute.</h1>
            <p className="text-mid-grey font-body mb-10 leading-relaxed">
              Whether you&#8217;re a teacher, parent, or institutional leader &mdash; we&#8217;d love to hear from you. Fill in the form and our team will get back to you.
            </p>
            <div className="space-y-4">
              {[
                { icon: "🎓", text: "30-Day Pilot Program" },
                { icon: "📊", text: "Research Reports" },
                { icon: "💬", text: "Product Demo" },
                { icon: "🤝", text: "Partnerships" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-body font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="rev bg-card rounded-2xl p-8 border border-border shadow-xl" style={{ transitionDelay: "150ms" }}>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-display mb-2">Thank you.</h3>
                <p className="text-mid-grey font-body mb-2">The Classy team will contact you shortly.</p>
                <p className="text-sm text-mid-grey font-body mb-8">{email}</p>
                <button
                  onClick={() => onNavigate("home")}
                  className="bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-xl font-display mb-6 text-foreground">Contact Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">Full Name *</label>
                    <input name="name" className={`w-full rounded-lg border ${errors.name ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} />
                  </div>
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">Email *</label>
                    <input name="email" type="email" className={`w-full rounded-lg border ${errors.email ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} />
                  </div>
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">Phone *</label>
                    <input name="phone" type="tel" className={`w-full rounded-lg border ${errors.phone ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} />
                  </div>
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">Your Role *</label>
                    <select name="role" className={`w-full rounded-lg border ${errors.role ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} defaultValue="">
                      <option value="" disabled>Select role</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">Educational Institute Name *</label>
                    <input name="school" className={`w-full rounded-lg border ${errors.school ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} />
                  </div>
                  <div>
                    <label className="text-xs font-body font-medium text-foreground mb-1 block">City *</label>
                    <input name="city" className={`w-full rounded-lg border ${errors.city ? "border-destructive" : "border-border"} px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`} />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-xs font-body font-medium text-foreground mb-1 block">Message</label>
                  <textarea name="message" rows={4} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30 resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 shadow-md shadow-blue/20 transition-all disabled:opacity-60">
                  {submitting ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
