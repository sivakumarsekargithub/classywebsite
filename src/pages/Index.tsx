import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { SignupPage } from "@/pages/SignupPage";
import { GetAppPage } from "@/pages/GetAppPage";
import { WhoNeedsClassyPage } from "@/pages/WhoNeedsClassyPage";
import { WhyClassyPage } from "@/pages/WhyClassyPage";
import { PricingPage } from "@/pages/PricingPage";
import { isLegalPageType, legalRoutePaths } from "@/lib/legalRoutes";
import { isMarketingPageType, pageRoutePaths, type MarketingPageType } from "@/lib/pageRoutes";

interface IndexProps {
  initialPage?: MarketingPageType;
}

const Index = ({ initialPage = "home" }: IndexProps) => {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPage = useMemo(() => {
    const page = new URLSearchParams(location.search).get("page");
    return isMarketingPageType(page) ? page : initialPage;
  }, [initialPage, location.search]);

  const navigate = useCallback((page: string) => {
    if (page === "management") {
      routerNavigate("/management");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isLegalPageType(page)) {
      routerNavigate(legalRoutePaths[page]);
      return;
    }

    if (!isMarketingPageType(page)) {
      return;
    }

    routerNavigate(pageRoutePaths[page]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [routerNavigate]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (el) {
        el.querySelectorAll(".rev").forEach((r) => observer.observe(r));
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentPage]);

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {currentPage === "home" && <HomePage onNavigate={navigate} />}
      {currentPage === "resources" && <ResourcesPage onNavigate={navigate} />}
      {currentPage === "signup" && <SignupPage onNavigate={navigate} />}
      {currentPage === "getapp" && <GetAppPage onNavigate={navigate} />}
      {currentPage === "who" && <WhoNeedsClassyPage onNavigate={navigate} />}
      {currentPage === "why" && <WhyClassyPage onNavigate={navigate} />}
      {currentPage === "pricing" && <PricingPage onNavigate={navigate} />}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;
