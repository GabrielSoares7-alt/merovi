import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Alternates the section's background between the two surface tones. */
  tone?: "background" | "surface";
  /** Set false for sections that shouldn't animate in on scroll (e.g. above the fold). */
  reveal?: boolean;
  /** Full-bleed decorative layer rendered behind the centered content (e.g. background rays). */
  background?: ReactNode;
};

const TONE_CLASSES: Record<NonNullable<SectionProps["tone"]>, string> = {
  background: "bg-background",
  surface: "bg-surface",
};

export function Section({
  children,
  className,
  id,
  tone = "background",
  reveal = true,
  background,
}: SectionProps) {
  const content = (
    <div className="relative z-20 mx-auto max-w-6xl px-6">{children}</div>
  );

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${TONE_CLASSES[tone]} py-20 md:py-28 ${className ?? ""}`}
    >
      {background}
      {reveal ? <ScrollReveal>{content}</ScrollReveal> : content}
    </section>
  );
}
