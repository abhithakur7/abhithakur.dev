'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function AnimatedMesh({
  meshColor,
  edgeColor,
}: {
  meshColor: string;
  edgeColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 1), [geometry]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.4;
    groupRef.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={meshColor} transparent opacity={0.04} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={edgeColor} transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}

export default function HeroMesh() {
  const { resolvedTheme } = useTheme();
  // Match the warm-orange accent palette in both themes.
  // Light: darker brick that reads on the off-white bg.
  // Dark : softer apricot that glows on near-black.
  const isDark = resolvedTheme === 'dark';
  const edgeColor = isDark ? '#e58e6d' : '#b8451f';
  const meshColor = isDark ? '#e58e6d' : '#1a1a1a';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AnimatedMesh meshColor={meshColor} edgeColor={edgeColor} />
      </Canvas>
    </div>
  );
}
