"use client";

import { useEffect, useState, type CSSProperties } from "react";

type RayInstance = {
  id: number;
  d: string;
  viewBoxHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
  strokeWidth: number;
  maxOpacity: number;
  delay: number;
  duration: number;
};

const RAY_COUNT = 7;
const VIEWBOX_WIDTH = 100;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * A jagged "lightning bolt" path: a handful of segments walking down the
 * viewBox, each one kicked sideways by a random amount so the trajectory
 * breaks unpredictably instead of drawing a straight line.
 */
function generateBoltPath(viewBoxHeight: number): string {
  const segments = Math.round(randomBetween(4, 7));
  const stepY = viewBoxHeight / segments;
  let x = VIEWBOX_WIDTH / 2 + randomBetween(-10, 10);
  const points: Array<[number, number]> = [[x, 0]];

  for (let i = 1; i <= segments; i++) {
    const y = Math.min(
      viewBoxHeight,
      i * stepY + randomBetween(-stepY * 0.25, stepY * 0.25),
    );
    const kick = randomBetween(10, 32);
    x = Math.max(6, Math.min(VIEWBOX_WIDTH - 6, x + randomBetween(-kick, kick)));
    points.push([x, y]);
  }

  return points
    .map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`)
    .join(" ");
}

function createRay(id: number): RayInstance {
  const viewBoxHeight = Math.round(randomBetween(220, 360));
  return {
    id,
    d: generateBoltPath(viewBoxHeight),
    viewBoxHeight,
    left: randomBetween(3, 93),
    top: randomBetween(-12, 10),
    width: randomBetween(46, 90),
    height: randomBetween(300, 540),
    strokeWidth: randomBetween(2.5, 4.5),
    maxOpacity: randomBetween(0.75, 1),
    // Negative delays start each ray mid-cycle so they don't all flash in
    // sync on first paint.
    delay: -randomBetween(0, 9),
    duration: randomBetween(5, 10),
  };
}

/**
 * Lightning-style background rays behind the hero content: procedurally
 * generated zigzag SVG paths (random per mount, hence the client-only
 * generation in an effect to avoid an SSR/client markup mismatch), each
 * flashing in and fading out on its own random timer so only a couple are
 * ever lit at once. Pure SVG/CSS, no added WebGL geometry.
 */
export function HeroRays() {
  const [rays, setRays] = useState<RayInstance[] | null>(null);

  useEffect(() => {
    setRays(Array.from({ length: RAY_COUNT }, (_, index) => createRay(index)));
  }, []);

  if (!rays) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {rays.map((ray) => (
        <svg
          key={ray.id}
          className="hero-ray"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${ray.viewBoxHeight}`}
          style={
            {
              left: `${ray.left}%`,
              top: `${ray.top}%`,
              width: ray.width,
              height: ray.height,
              animationDelay: `${ray.delay}s`,
              animationDuration: `${ray.duration}s`,
              "--ray-max-opacity": ray.maxOpacity,
            } as CSSProperties
          }
        >
          <path
            d={ray.d}
            fill="none"
            stroke="#ffffff"
            strokeWidth={ray.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
