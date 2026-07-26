"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { Scene } from "@/components/3d/Scene";
import { LOGO_PATH_D, LOGO_PATH_VIEWBOX } from "@/components/3d/logo-path";

const TARGET_SIZE = 2.6;
const BASE_ROTATION = { x: 0.15, y: -0.3 };

function useLogoGeometry() {
  return useMemo(() => {
    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_PATH_VIEWBOX.width} ${LOGO_PATH_VIEWBOX.height}"><path d="${LOGO_PATH_D}" /></svg>`;
    const { paths } = new SVGLoader().parse(svgText);
    const shapes = paths.flatMap((path) => path.toShapes());

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 28,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2,
      bevelSegments: 3,
      curveSegments: 12,
    });

    geometry.computeBoundingBox();
    const box = geometry.boundingBox as THREE.Box3;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = TARGET_SIZE / Math.max(size.x, size.y);
    // Flip Y: SVG's y-axis points down, three's points up. This inverts
    // triangle winding, so the material below must render both sides.
    geometry.scale(scale, -scale, scale);

    return geometry;
  }, []);
}

/**
 * The official double-"M" + growth-arrow monogram, extruded from its own
 * traced outline (scripts/trace-logo.mjs -> logo-path.ts) so the 3D piece
 * stays recognizably the brand mark rather than an abstract stand-in. Motion
 * swings freely with the pointer around a resting tilt (BASE_ROTATION) so it
 * still reads as the mark at any point in the swing, without ever flipping
 * fully upside down or edge-on.
 */
function LogoMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useLogoGeometry();

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { pointer, clock } = state;
    const idleSway = Math.sin(clock.elapsedTime * 0.4) * 0.15;
    const targetY = BASE_ROTATION.y + idleSway + pointer.x * 0.7;
    const targetX = BASE_ROTATION.x - pointer.y * 0.5;
    mesh.rotation.y += (targetY - mesh.rotation.y) * 0.08;
    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[BASE_ROTATION.x, BASE_ROTATION.y, 0]}
    >
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={1.4}
        roughness={0.3}
        metalness={0.05}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function HeroMark() {
  return (
    <Scene
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={60} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={35} color="#ffffff" />
      <LogoMesh />
    </Scene>
  );
}
