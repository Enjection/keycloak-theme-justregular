import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { KcContext } from "./login/KcContext";

const KcPage = lazy(() => import("./login/KcPage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-[oklch(0.145_0_0)]" />}>
      <KcPage kcContext={window.kcContext as KcContext} />
    </Suspense>
  </StrictMode>
);

declare global {
  interface Window {
    kcContext: unknown;
  }
}
