import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

const ASPECT_RATIO = 493 / 462;

/**
 * Official double-"M" + growth-arrow monogram. Source is a trimmed,
 * alpha-extracted PNG (public/logo/merovi-mark.png) so it reads cleanly on
 * any dark surface. Height is set by the caller via `className`; width
 * follows automatically to keep the mark's aspect ratio intact.
 *
 * width/height are declared well below the source PNG's native 493x462 —
 * the largest on-page use is the h-10 footer mark (~43x40 rendered) — so
 * next/image's srcset stays sized for that instead of shipping the full
 * asset at every breakpoint.
 */
export function Logo({ className, priority }: LogoProps) {
  return (
    <Image
      src="/logo/merovi-mark.png"
      alt="Merovi"
      width={140}
      height={131}
      priority={priority}
      style={{ aspectRatio: ASPECT_RATIO }}
      className={`glow-drop w-auto shrink-0 self-start ${className ?? ""}`}
    />
  );
}
