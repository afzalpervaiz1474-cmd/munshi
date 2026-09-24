"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Cloud({ labels, highlight }: { labels: string[]; highlight?: string[] }) {
  const group = useRef<THREE.Group>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const points = useMemo(() => {
    const n = labels.length;
    const r = 2.3;
    return labels.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
    });
  }, [labels]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.12;
    points.forEach((p, i) => {
      const el = els.current[i];
      if (!el) return;
      tmp.copy(p).applyMatrix4(group.current!.matrixWorld);
      const t = (tmp.z + 2.3) / 4.6; // 0 back → 1 front
      el.style.opacity = String(0.18 + t * 0.82);
      el.style.transform = `scale(${0.75 + t * 0.35})`;
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.3, 24, 16]} />
        <meshBasicMaterial color="#38d6f0" wireframe transparent opacity={0.06} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#1a1f2e" emissive="#7c5cff" emissiveIntensity={0.9} flatShading />
      </mesh>
      {points.map((p, i) => (
        <Html key={labels[i]} position={p} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <span
            ref={(el) => { els.current[i] = el; }}
            className={
              "block whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] backdrop-blur-md transition-colors " +
              (highlight && highlight.includes(labels[i])
                ? "border-[#38d6f0]/60 bg-[#38d6f0]/15 text-[#bff4ff]"
                : "border-white/10 bg-black/40 text-white/80")
            }
          >
            {labels[i]}
          </span>
        </Html>
      ))}
    </group>
  );
}

export default function TechSphere({ labels, highlight, active }: { labels: string[]; highlight?: string[]; active: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 45 }} gl={{ alpha: true }} aria-hidden>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={25} color="#38d6f0" />
      <Cloud labels={labels} highlight={highlight} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  );
}
