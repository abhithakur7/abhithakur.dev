'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.3;
    ref.current.rotation.y = clock.elapsedTime * 0.15;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial wireframe color="#6366f1" opacity={0.35} transparent />
    </mesh>
  );
}

export default function HeroMesh() {
  return (
    <Canvas
      aria-hidden
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <AnimatedMesh />
    </Canvas>
  );
}
