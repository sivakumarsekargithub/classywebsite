import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isLegalPageType, legalRoutePaths, type LegalPageType } from "@/lib/legalRoutes";
import { isMarketingPageType, pageRoutePaths } from "@/lib/pageRoutes";
import { LegalPage } from "@/pages/LegalPage";

interface LegalDocumentPageProps {
  type: LegalPageType;
}

const legalDocumentTitles: Record<LegalPageType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms and Conditions",
  "acceptable-use": "Acceptable Use Policy",
};

export function LegalDocumentPage({ type }: LegalDocumentPageProps) {
  const routerNavigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;

    document.title = `${legalDocumentTitles[type]} | Classy`;
    canonical?.setAttribute("href", `${window.location.origin}${legalRoutePaths[type]}`);

    return () => {
      document.title = previousTitle;
      if (previousCanonical) {
        canonical?.setAttribute("href", previousCanonical);
      }
    };
  }, [type]);

  const navigate = useCallback(
    (page: string) => {
      if (isLegalPageType(page)) {
        routerNavigate(legalRoutePaths[page]);
        return;
      }

      if (isMarketingPageType(page)) {
        routerNavigate(pageRoutePaths[page]);
      }
    },
    [routerNavigate]
  );

  return (
    <div className="min-h-screen">
      <Navbar currentPage={type} onNavigate={navigate} />
      <LegalPage type={type} onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </div>
  );
}
