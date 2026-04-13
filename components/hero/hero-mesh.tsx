'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function AnimatedMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.6, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 1), [geometry]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.4;
    groupRef.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* solid translucent body for subtle mass */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} />
      </mesh>
      {/* clean wireframe edges (independent of lighting) */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#818cf8" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

export default function HeroMesh() {
  return (
    <Canvas
      aria-hidden
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <AnimatedMesh />
    </Canvas>
  );
}
