'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function AnimatedMesh() {
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
        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#818cf8" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

export default function HeroMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AnimatedMesh />
      </Canvas>
    </div>
  );
}
