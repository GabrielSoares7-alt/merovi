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
 * (narrow viewport, low-memory device, or prefers-reduced-motion) — the same
 * brand mark used everywhere else on the site (the flat PNG), not just an
 * empty glow blob, so those visitors still see the logo.
 */
function StaticMarkFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <GlowBackdrop />
      <Logo className="relative h-28" />
    </div>
  );
}

/**
 * The hero's decorative 3D shard, gated behind useShouldRender3D so it never
 * ships to narrow/low-memory devices, plus dynamic import + Suspense so its
 * chunk loads off the critical path. Hero text/CTA live outside this
 * component entirely and never wait on it.
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
