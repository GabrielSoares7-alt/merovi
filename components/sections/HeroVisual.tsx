"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useShouldRender3D } from "@/lib/use-should-render-3d";

const HeroMark = dynamic(() => import("@/components/3d/HeroMark"), {
  ssr: false,
});

function VisualFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)] blur-2xl"
    />
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
        <Suspense fallback={<VisualFallback />}>
          <HeroMark />
        </Suspense>
      ) : (
        <VisualFallback />
      )}
    </div>
  );
}
