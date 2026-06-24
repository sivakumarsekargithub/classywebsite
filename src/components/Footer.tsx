import { Link } from "react-router-dom";
import classyLogo from "@/assets/classy-logo.jpg";
import { legalRoutePaths } from "@/lib/legalRoutes";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-navy text-navy-foreground/60 font-body">
      <div className="max-w-7xl mx-auto px-[5vw] py-8 flex flex-col gap-6">
        {/* Top row: Logo + Nav + Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <button type="button" onClick={() => onNavigate("home")} className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40" aria-label="Go to Classy home">
            <img src={classyLogo} alt="Classy" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </button>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
            <button type="button" onClick={() => onNavigate("home")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Home</button>
            <button type="button" onClick={() => onNavigate("who")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Who Needs Classy</button>
            <button type="button" onClick={() => onNavigate("why")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Why Classy</button>
            <button type="button" onClick={() => onNavigate("pricing")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Pricing</button>
            <button type="button" onClick={() => onNavigate("management")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Management</button>
            <button type="button" onClick={() => onNavigate("getapp")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Get the App</button>
            <button type="button" onClick={() => onNavigate("signup")} className="rounded-md hover:text-navy-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground/40">Contact</button>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <Link to={legalRoutePaths.privacy} className="hover:text-navy-foreground transition-colors underline underline-offset-2">Privacy Policy</Link>
          <span className="text-navy-foreground/30">·</span>
          <Link to={legalRoutePaths.terms} className="hover:text-navy-foreground transition-colors underline underline-offset-2">Terms &amp; Conditions</Link>
          <span className="text-navy-foreground/30">·</span>
          <Link to={legalRoutePaths["acceptable-use"]} className="hover:text-navy-foreground transition-colors underline underline-offset-2">Acceptable Use Policy</Link>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-navy-foreground/40">
          &copy; 2025 Classy &middot; classyapp.in &middot; A Communication That Powers Classrooms
        </p>
      </div>
    </footer>
  );
}
