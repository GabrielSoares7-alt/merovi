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
 */
export function Logo({ className, priority }: LogoProps) {
  return (
    <Image
      src="/logo/merovi-mark.png"
      alt="Merovi"
      width={493}
      height={462}
      priority={priority}
      style={{ aspectRatio: ASPECT_RATIO }}
      className={`glow-drop w-auto shrink-0 self-start ${className ?? ""}`}
    />
  );
}
