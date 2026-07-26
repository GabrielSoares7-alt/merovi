"use client";

import {
  createElement,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical offset (px) the content animates in from. */
  y?: number;
  duration?: number;
  delay?: number;
  /** ScrollTrigger `start` position. */
  start?: string;
  /**
   * Stagger each direct child in individually instead of revealing this
   * element as one block. `true` uses a 0.1s per-item gap; pass a number for
   * a custom gap (seconds).
   */
  stagger?: boolean | number;
  /**
   * Wrapper tag. Matters when `stagger` needs to target semantic direct
   * children correctly — e.g. `as="ul"` so a list's own `<li>`s stagger,
   * instead of staggering across a single wrapping `<div>`.
   */
  as?: ElementType;
};

export function ScrollReveal({
  children,
  className,
  y = 40,
  duration = 1,
  delay = 0,
  start = "top 85%",
  stagger,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets: Element | Element[] = stagger
      ? Array.from(element.children)
      : element;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger
            ? typeof stagger === "number"
              ? stagger
              : 0.1
            : undefined,
          scrollTrigger: {
            trigger: element,
            start,
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [prefersReducedMotion, y, duration, delay, start, stagger]);

  return createElement(Tag, { ref, className }, children);
}
