import { useState, useRef } from "react";
import { SectionChip } from "@/components/SectionChip";
import { PillButton } from "@/components/PillButton";
import { Check, Smartphone, Apple, Download } from "lucide-react";

interface GetAppPageProps {
  onNavigate: (page: string) => void;
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] md:w-[300px]">
      <svg viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
        <rect x="4" y="4" width="292" height="592" rx="36" fill="hsl(var(--navy))" stroke="hsl(var(--border))" strokeWidth="4"/>
        <rect x="100" y="12" width="100" height="24" rx="12" fill="hsl(213 90% 10%)"/>
        <rect x="16" y="48" width="268" height="504" rx="8" fill="hsl(var(--background))"/>
        {/* Header */}
        <rect x="16" y="48" width="268" height="52" rx="8" fill="hsl(var(--navy))"/>
        <text x="150" y="80" textAnchor="middle" fill="hsl(var(--navy-foreground))" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="20">Classy</text>
        {/* Cards */}
        {[
          { y: 114, icon: "✅", text: "Attendance marked", sub: "Priya present today", badge: "Present", color: "hsl(var(--teal))" },
          { y: 200, icon: "📝", text: "Maths assignment", sub: "Due tomorrow", badge: "Due", color: "hsl(var(--amber))" },
          { y: 286, icon: "📢", text: "Annual Day", sub: "14th March", badge: "New", color: "hsl(var(--blue))" },
        ].map((c, i) => (
          <g key={i}>
            <rect x="28" y={c.y} width="244" height="72" rx="12" fill="white" stroke="hsl(var(--border))" strokeWidth="1"/>
            <text x="48" y={c.y + 28} fontSize="13" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" fill="hsl(var(--foreground))">{c.icon} {c.text}</text>
            <text x="48" y={c.y + 48} fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fill="hsl(var(--mid-grey))">{c.sub}</text>
            <rect x="200" y={c.y + 16} width="60" height="24" rx="12" fill={c.color} opacity="0.15"/>
            <text x="230" y={c.y + 33} textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="'Plus Jakarta Sans', sans-serif" fill={c.color}>{c.badge}</text>
          </g>
        ))}
        {/* Bottom tab bar */}
        <rect x="16" y="500" width="268" height="52" rx="8" fill="white" stroke="hsl(var(--border))" strokeWidth="1"/>
        {["🏠","✅","📝","💬","👤"].map((icon, i) => (
          <text key={i} x={58 + i * 50} y="532" textAnchor="middle" fontSize="18">{icon}</text>
        ))}
      </svg>
    </div>
  );
}

export function GetAppPage({ onNavigate }: GetAppPageProps) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const scrollToDownload = () => {
    downloadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      try {
        await fetch("https://formspree.io/f/xlgpnvzo", {
          method: "POST",
          body: JSON.stringify({ email: waitlistEmail, type: "iOS Waitlist" }),
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
      } catch (_) {}
      setWaitlistSubmitted(true);
    }
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

      {/* SECTION 2 — APP DOWNLOAD */}
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
                <a href="https://drive.usercontent.google.com/download?id=1aX6Q2IoNv4JBpDVl36JfQJdPPI1sK2Nd&export=download&authuser=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full bg-blue text-primary-foreground rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-110 transition-all shadow-md shadow-blue/20 mb-2">
                  <Download className="w-4 h-4" /> Download APK
                </a>
                <p className="text-xs text-mid-grey font-body text-center">Direct APK install · v1.0.0 · 18MB</p>
                <div className="mt-3 bg-amber/10 border border-amber/20 rounded-lg px-4 py-2 text-xs font-body text-amber">
                  ⚠️ Enable &lsquo;Install from unknown sources&rsquo; in your phone settings to install
                </div>
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
                <p className="text-xs text-teal font-body mb-3">🚀 App for iOS is on the way — join the waitlist to be notified first</p>
                {waitlistSubmitted ? (
                  <p className="text-sm font-body font-semibold text-teal">✅ You're on the list!</p>
                ) : (
                  <form onSubmit={handleWaitlist} className="flex gap-2">
                    <input type="email" required placeholder="your@email.com" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-body bg-card focus:outline-none focus:ring-2 focus:ring-teal/30" />
                    <button type="submit" className="bg-teal text-accent-foreground rounded-lg px-4 py-2 text-sm font-body font-semibold hover:brightness-110 transition-all">Notify Me</button>
                  </form>
                )}
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

            {/* Right — Phone mockup */}
            <div className="rev flex justify-center" style={{ transitionDelay: "150ms" }}>
              <PhoneMockup />
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
              <button onClick={() => onNavigate("signup")} className="w-full bg-primary-foreground text-navy rounded-lg px-6 py-3 text-sm font-body font-semibold hover:brightness-95 transition-all">Apply for the ₹1,000 Pilot →</button>
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
