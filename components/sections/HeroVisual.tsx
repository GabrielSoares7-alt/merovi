"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { useShouldRender3D } from "@/lib/use-should-render-3d";

const HeroMark = dynamic(() => import("@/components/3d/HeroMark"), {
  ssr: false,
});

function GlowBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)] blur-2xl"
    />
  );
}

/** Brief placeholder while the 3D chunk itself is still loading on capable devices — unchanged from before. */
function LoadingFallback() {
  return (
    <div className="relative h-full w-full">
      <GlowBackdrop />
    </div>
  );
}

/**
 * Shown instead of the 3D mark whenever useShouldRender3D gates it out
 * (prefers-reduced-motion) — the same brand mark used everywhere else on the
 * site (the flat PNG), not just an empty glow blob, so those visitors still
 * see the logo.
 *
 * Centered via absolute positioning + translate, not flexbox: Logo's own
 * className always includes `self-start` (see components/ui/Logo.tsx),
 * which would override a flex parent's `items-center` and pin the mark to
 * the top while the glow (unaffected by flex, since it's also absolute)
 * stayed centered on the full box — the two visibly drifted apart.
 */
function StaticMarkFallback() {
  return (
    <div className="relative h-full w-full">
      <GlowBackdrop />
      <Logo className="absolute left-1/2 top-1/2 h-28 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

/**
 * The hero's decorative 3D shard, gated behind useShouldRender3D (now just
 * prefers-reduced-motion — it ships on every screen size), plus dynamic
 * import + Suspense so its chunk loads off the critical path. Hero text/CTA
 * live outside this component entirely and never wait on it.
 */
export function HeroVisual() {
  const canRender3D = useShouldRender3D();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {canRender3D ? (
        <Suspense fallback={<LoadingFallback />}>
          <HeroMark />
        </Suspense>
      ) : (
        <StaticMarkFallback />
      )}
    </div>
  );
}
