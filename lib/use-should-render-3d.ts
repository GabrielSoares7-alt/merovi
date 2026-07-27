"use client";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Gate for the hero's decorative 3D mark. The mobile-viewport and
 * low-memory checks that used to skip it were removed — the interactive
 * monogram is the hero's signature moment and now ships on every screen
 * size. prefers-reduced-motion is the one exception kept: those visitors
 * still get the static fallback, out of respect for motion sensitivity.
 */
export function useShouldRender3D() {
  return !usePrefersReducedMotion();
}
