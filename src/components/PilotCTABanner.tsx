interface PilotCTABannerProps {
  onNavigate: (page: string) => void;
}

export function PilotCTABanner({ onNavigate }: PilotCTABannerProps) {
  return (
    <section className="section-pad bg-navy text-navy-foreground text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue/10 to-teal/10 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto rev">
        <h2 className="text-3xl md:text-4xl font-display mb-4">
          Ready to bring Classy to your educational institute?
        </h2>
        <p className="text-navy-foreground/70 font-body mb-8 text-lg">
          Download the app, explore the features, and start transforming classroom communication today.
        </p>
        <button
          onClick={() => onNavigate("getapp")}
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold font-body bg-teal text-accent-foreground hover:bg-teal-light shadow-md shadow-teal/20 transition-all"
        >
          Get the App &rarr;
        </button>
      </div>
    </section>
  );
}
