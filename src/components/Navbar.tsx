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
        <button onClick={() => navigate("home")} className="flex items-center">
          <img src={classyLogo} alt="Classy" className="h-10 w-auto" />
        </button>

        {/* Desktop */}
        <div className="hidden min-[920px]:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-sm font-body font-medium transition-colors ${
                currentPage === l.id ? "text-blue" : "text-mid-grey hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="min-[920px]:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="min-[920px]:hidden bg-card border-t border-border px-[5vw] py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-sm font-body font-medium text-left py-2 ${
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
