"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";

type SceneProps = CanvasProps;

/**
 * Shared entry point for React Three Fiber scenes. Sections add their own
 * meshes/lights as children; this just standardizes the canvas setup.
 */
export function Scene({ children, ...props }: SceneProps) {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true }} {...props}>
      {children}
    </Canvas>
  );
}
