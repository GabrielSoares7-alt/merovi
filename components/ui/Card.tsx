"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Base surface for service blocks, testimonials, etc. Elevation on hover
 * combines a real offset+blur shadow (depth) with a soft white halo
 * (brand glow accent) — the glow alone would read as decoration.
 */
export function Card({ children, className }: CardProps) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/10 bg-surface p-6 ${className ?? ""}`}
      whileHover={{
        y: -4,
        boxShadow:
          "0 16px 40px -16px rgba(0,0,0,0.65), 0 0 24px rgba(255,255,255,0.08)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
