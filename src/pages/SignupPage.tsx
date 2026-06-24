import { useId, useState, type FormEvent } from "react";
import { SectionChip } from "@/components/SectionChip";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

const roles = ["Parent", "Student", "Teacher", "Institute Administrator", "Institute Management"];
const formEndpoint = "https://formspree.io/f/xlgpnvzo";

const maxLengths = {
  name: 80,
  email: 120,
  phone: 24,
  school: 120,
  city: 80,
  message: 800,
} as const;

type ContactField = keyof typeof maxLengths | "role" | "form";
type FieldErrors = Partial<Record<ContactField, string>>;

function cleanValue(value: FormDataEntryValue | null, maxLength: number) {
  return value?.toString().trim().replace(/\s+/g, " ").slice(0, maxLength) ?? "";
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")?.toString().trim()) {
      setSubmitted(true);
      return;
    }

    const values = {
      name: cleanValue(data.get("name"), maxLengths.name),
      email: cleanValue(data.get("email"), maxLengths.email).toLowerCase(),
      phone: cleanValue(data.get("phone"), maxLengths.phone),
      role: cleanValue(data.get("role"), 40),
      school: cleanValue(data.get("school"), maxLengths.school),
      city: cleanValue(data.get("city"), maxLengths.city),
      message: cleanValue(data.get("message"), maxLengths.message),
    };

    const newErrors: FieldErrors = {};
    if (values.name.length < 2) newErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) newErrors.email = "Enter a valid email address.";
    if (!/^[+\d][+\d\s().-]{6,23}$/.test(values.phone)) newErrors.phone = "Enter a valid phone number.";
    if (!roles.includes(values.role)) newErrors.role = "Select your role.";
    if (values.school.length < 2) newErrors.school = "Enter the institution name.";
    if (values.city.length < 2) newErrors.city = "Enter your city.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const safeData = new FormData();
    Object.entries(values).forEach(([key, value]) => safeData.append(key, value));

    setSubmitting(true);
    setErrors({});
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: safeData,
        headers: { Accept: "application/json" },
        credentials: "omit",
        referrerPolicy: "strict-origin-when-cross-origin",
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with ${response.status}`);
      }

      setEmail(values.email);
      setSubmitted(true);
      form.reset();
    } catch {
      setErrors({ form: "We could not send the message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: ContactField) =>
    `w-full rounded-lg border ${errors[field] ? "border-destructive" : "border-border"} bg-background px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30`;

  const errorText = (field: ContactField) =>
    errors[field] ? <p className="mt-1 text-xs font-body text-destructive">{errors[field]}</p> : null;

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
          <div className="rev bg-card rounded-xl p-6 sm:p-8 border border-border shadow-xl" style={{ transitionDelay: "150ms" }}>
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
                <div className="hidden" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor={`${formId}-name`} className="text-xs font-body font-medium text-foreground mb-1 block">Full Name *</label>
                    <input id={`${formId}-name`} name="name" autoComplete="name" maxLength={maxLengths.name} required aria-invalid={Boolean(errors.name)} className={inputClass("name")} />
                    {errorText("name")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-email`} className="text-xs font-body font-medium text-foreground mb-1 block">Email *</label>
                    <input id={`${formId}-email`} name="email" type="email" autoComplete="email" maxLength={maxLengths.email} required aria-invalid={Boolean(errors.email)} className={inputClass("email")} />
                    {errorText("email")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-phone`} className="text-xs font-body font-medium text-foreground mb-1 block">Phone *</label>
                    <input id={`${formId}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={maxLengths.phone} required aria-invalid={Boolean(errors.phone)} className={inputClass("phone")} />
                    {errorText("phone")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-role`} className="text-xs font-body font-medium text-foreground mb-1 block">Your Role *</label>
                    <select id={`${formId}-role`} name="role" required aria-invalid={Boolean(errors.role)} className={inputClass("role")} defaultValue="">
                      <option value="" disabled>Select role</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errorText("role")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-school`} className="text-xs font-body font-medium text-foreground mb-1 block">Educational Institute Name *</label>
                    <input id={`${formId}-school`} name="school" autoComplete="organization" maxLength={maxLengths.school} required aria-invalid={Boolean(errors.school)} className={inputClass("school")} />
                    {errorText("school")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-city`} className="text-xs font-body font-medium text-foreground mb-1 block">City *</label>
                    <input id={`${formId}-city`} name="city" autoComplete="address-level2" maxLength={maxLengths.city} required aria-invalid={Boolean(errors.city)} className={inputClass("city")} />
                    {errorText("city")}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor={`${formId}-message`} className="text-xs font-body font-medium text-foreground mb-1 block">Message</label>
                  <textarea id={`${formId}-message`} name="message" rows={4} maxLength={maxLengths.message} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue/30 resize-none" />
                </div>
                {errors.form && <p className="mb-4 text-sm font-body text-destructive">{errors.form}</p>}
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
