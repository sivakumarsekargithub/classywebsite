import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { legalRoutePaths } from "@/lib/legalRoutes";
import { pageRoutePaths, type MarketingPageType } from "@/lib/pageRoutes";

const Index = lazy(() => import("./pages/Index.tsx"));
const LegalDocumentPage = lazy(() =>
  import("./pages/LegalDocumentPage.tsx").then((module) => ({ default: module.LegalDocumentPage })),
);
const ManagementUsersPage = lazy(() =>
  import("./pages/ManagementUsersPage.tsx").then((module) => ({ default: module.ManagementUsersPage })),
);
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const pageRoutes: Array<[MarketingPageType, string]> = [
  ["home", pageRoutePaths.home],
  ["resources", pageRoutePaths.resources],
  ["signup", pageRoutePaths.signup],
  ["getapp", pageRoutePaths.getapp],
  ["who", pageRoutePaths.who],
  ["why", pageRoutePaths.why],
  ["pricing", pageRoutePaths.pricing],
];

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-teal/20" role="status" aria-label="Loading page" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {pageRoutes.map(([page, path]) => (
              <Route key={page} path={path} element={<Index initialPage={page} />} />
            ))}
            <Route path={legalRoutePaths.privacy} element={<LegalDocumentPage type="privacy" />} />
            <Route path={legalRoutePaths.terms} element={<LegalDocumentPage type="terms" />} />
            <Route path={legalRoutePaths["acceptable-use"]} element={<LegalDocumentPage type="acceptable-use" />} />
            <Route path="/management" element={<ManagementUsersPage />} />
            <Route path="/management/:screen" element={<ManagementUsersPage />} />
            <Route path="/management-users" element={<ManagementUsersPage />} />
            <Route path="/management-users/:screen" element={<ManagementUsersPage />} />
            <Route path="/admin" element={<Navigate to="/management" replace />} />
            <Route path="/dashboard" element={<Navigate to="/management" replace />} />
            <Route path="/home" element={<Navigate to={pageRoutePaths.home} replace />} />
            <Route path="/stakeholders" element={<Navigate to={pageRoutePaths.who} replace />} />
            <Route path="/pilot" element={<Navigate to={pageRoutePaths.why} replace />} />
            <Route path="/pilot-program" element={<Navigate to={pageRoutePaths.why} replace />} />
            <Route path="/contact" element={<Navigate to={pageRoutePaths.signup} replace />} />
            <Route path="/get-app" element={<Navigate to={pageRoutePaths.getapp} replace />} />
            <Route path="/getapp" element={<Navigate to={pageRoutePaths.getapp} replace />} />
            <Route path="/who" element={<Navigate to={pageRoutePaths.who} replace />} />
            <Route path="/why" element={<Navigate to={pageRoutePaths.why} replace />} />
            <Route path="/plans" element={<Navigate to={pageRoutePaths.pricing} replace />} />
            <Route path="/privacy" element={<Navigate to={legalRoutePaths.privacy} replace />} />
            <Route path="/terms" element={<Navigate to={legalRoutePaths.terms} replace />} />
            <Route path="/acceptable-use" element={<Navigate to={legalRoutePaths["acceptable-use"]} replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
