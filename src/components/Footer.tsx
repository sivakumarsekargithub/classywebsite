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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => onNavigate("home")} className="flex items-center">
            <img src={classyLogo} alt="Classy" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </button>
          <div className="flex flex-wrap gap-4 text-sm">
            <button onClick={() => onNavigate("home")} className="hover:text-navy-foreground transition-colors">Home</button>
            <button onClick={() => onNavigate("pilot")} className="hover:text-navy-foreground transition-colors">Pilot</button>
            <button onClick={() => onNavigate("who")} className="hover:text-navy-foreground transition-colors">Who Needs Classy</button>
            <button onClick={() => onNavigate("why")} className="hover:text-navy-foreground transition-colors">Why Classy</button>
            <button onClick={() => onNavigate("getapp")} className="hover:text-navy-foreground transition-colors">Get the App</button>
            <button onClick={() => onNavigate("signup")} className="hover:text-navy-foreground transition-colors">Contact</button>
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
