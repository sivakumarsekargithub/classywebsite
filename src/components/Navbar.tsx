import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import classyLogo from "@/assets/classy-logo.jpg";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: "who", label: "Who Needs Classy" },
  { id: "why", label: "Why Classy" },
  { id: "pricing", label: "Pricing" },
  { id: "management", label: "Management" },
  { id: "getapp", label: "Get the App" },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 navbar-glass ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-[5vw] h-16 flex items-center justify-between">
        <button type="button" onClick={() => navigate("home")} className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40" aria-label="Go to Classy home">
          <img src={classyLogo} alt="Classy" className="h-10 w-auto" />
        </button>

        {/* Desktop */}
        <div className="hidden min-[980px]:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              type="button"
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`rounded-lg px-1 py-2 text-sm font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 ${
                currentPage === l.id ? "text-blue" : "text-mid-grey hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="min-[980px]:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation" className="min-[980px]:hidden bg-card border-t border-border px-[5vw] py-4 flex flex-col gap-2 shadow-lg">
          {navLinks.map((l) => (
            <button
              type="button"
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`rounded-lg px-2 py-2 text-sm font-body font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 ${
                currentPage === l.id ? "text-blue" : "text-mid-grey"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
