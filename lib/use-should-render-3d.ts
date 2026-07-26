"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * Gate for decorative 3D: skips it on narrow (mobile) viewports and on
 * devices that self-report low memory (Chromium's navigator.deviceMemory,
 * undefined elsewhere and ignored). Text/CTA content never depends on this —
 * it only gates an optional visual layer.
 */
export function useShouldRender3D() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const isLowMemory = typeof deviceMemory === "number" && deviceMemory < 4;

    const evaluate = () => {
      const isNarrowViewport = window.innerWidth < MOBILE_BREAKPOINT_PX;
      setCapable(!isNarrowViewport && !isLowMemory);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return capable && !prefersReducedMotion;
}
