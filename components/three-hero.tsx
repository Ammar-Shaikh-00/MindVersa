"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453123;
  return x - Math.floor(x);
}

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (pseudoRandom(i + 1) - 0.5) * 16;
      arr[i + 1] = (pseudoRandom(i + 2) - 0.5) * 10;
      arr[i + 2] = (pseudoRandom(i + 3) - 0.5) * 6;
    }
    return arr;
  }, []);

  const linePositions = useMemo(() => {
    const connectionCount = 850;
    const arr = new Float32Array(connectionCount * 6);
    for (let i = 0; i < connectionCount; i++) {
      const baseIdx = i * 6;
      const pIdx = ((i * 7) % 2000) * 3;
      const x = positions[pIdx];
      const y = positions[pIdx + 1];
      const z = positions[pIdx + 2];
      arr[baseIdx] = x;
      arr[baseIdx + 1] = y;
      arr[baseIdx + 2] = z;
      arr[baseIdx + 3] = x + (pseudoRandom(i + 21) - 0.5) * 1.25;
      arr[baseIdx + 4] = y + (pseudoRandom(i + 22) - 0.5) * 1.25;
      arr[baseIdx + 5] = z + (pseudoRandom(i + 23) - 0.5) * 1.25;
    }
    return arr;
  }, [positions]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00E5FF" size={0.012} opacity={0.8} sizeAttenuation depthWrite={false} />
      </Points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.12} />
      </lineSegments>
    </>
  );
}

export function ThreeHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        <fogExp2 attach="fog" args={["#05070F", 0.12]} />
        <ambientLight intensity={0.35} />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
