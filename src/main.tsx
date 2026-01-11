import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import type { KcContext } from "./login/KcContext";

const KcPage = lazy(() => import("./login/KcPage"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const kcContext = (window as any).kcContext as KcContext | undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-[oklch(0.145_0_0)]" />}>
      {kcContext && <KcPage kcContext={kcContext} />}
    </Suspense>
  </StrictMode>
);
