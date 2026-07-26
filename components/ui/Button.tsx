"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-foreground text-background shadow-[0_0_20px_rgba(255,255,255,0.28)] hover:shadow-[0_0_36px_rgba(255,255,255,0.5)]",
  secondary:
    "border border-white/25 text-foreground hover:border-white/50 hover:bg-white/5",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[box-shadow,background-color,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 disabled:cursor-not-allowed disabled:opacity-40";

const HOVER_MOTION = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 420, damping: 26 },
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

// onDrag/onAnimation* are omitted because framer-motion's gesture props use
// an incompatible signature from the native DOM event handlers of the same name.
type LinkProps = BaseProps &
  Omit<
    ComponentProps<typeof Link>,
    | "className"
    | "children"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
  >;

type ButtonElProps = BaseProps & {
  href?: undefined;
} & Omit<
    ComponentProps<"button">,
    | "className"
    | "children"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
  >;

export type ButtonProps = LinkProps | ButtonElProps;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className ?? ""}`;

  if (props.href) {
    const { href, ...rest } = props as LinkProps;
    return (
      <MotionLink href={href} className={classes} {...HOVER_MOTION} {...rest}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      {...HOVER_MOTION}
      {...(props as ButtonElProps)}
    >
      {children}
    </motion.button>
  );
}
