"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

type Quality = "full" | "lite";

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!group.current || !inner.current) return;
    group.current.rotation.y += dt * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.25, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.15, 0.05);
    inner.current.rotation.y -= dt * 0.35;
    inner.current.rotation.x += dt * 0.2;
  });
  return (
    <group ref={group}>
      {/* glass shell */}
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial color="#1a2030" metalness={0.2} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} transparent opacity={0.35} flatShading />
      </mesh>
      {/* glowing edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.36, 1)]} />
        <lineBasicMaterial color="#38d6f0" transparent opacity={0.55} />
      </lineSegments>
      {/* inner energy core */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#a084ff" emissive="#7c5cff" emissiveIntensity={1.4} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 8, 160]} />
        <meshBasicMaterial color="#38d6f0" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 160]} />
        <meshBasicMaterial color="#a084ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y -= dt * 0.02; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9fe8ff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Satellites() {
  const items: { pos: [number, number, number]; geo: "box" | "torus" | "tetra"; color: string }[] = [
    { pos: [-2.6, 1.2, -0.5], geo: "box", color: "#38d6f0" },
    { pos: [2.5, -1.1, 0.3], geo: "torus", color: "#a084ff" },
    { pos: [2.2, 1.6, -1], geo: "tetra", color: "#38d6f0" },
    { pos: [-2.1, -1.5, 0.6], geo: "tetra", color: "#a084ff" },
  ];
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.2 + i * 0.2} rotationIntensity={0.8} floatIntensity={1.1}>
          <mesh position={it.pos} scale={0.22}>
            {it.geo === "box" && <boxGeometry args={[1, 1, 1]} />}
            {it.geo === "torus" && <torusGeometry args={[0.8, 0.28, 16, 48]} />}
            {it.geo === "tetra" && <tetrahedronGeometry args={[1]} />}
            <meshStandardMaterial color="#141824" emissive={it.color} emissiveIntensity={0.35} metalness={0.7} roughness={0.25} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function CodeTags() {
  const tags: { text: string; pos: [number, number, number] }[] = [
    { text: "<App />", pos: [-2.9, 0.1, 0] },
    { text: "GET /api/v1", pos: [2.6, 0.4, 0.4] },
    { text: "db.connect()", pos: [0.2, -2.1, 0.5] },
  ];
  return (
    <>
      {tags.map((t) => (
        <Float key={t.text} speed={1} floatIntensity={0.6} rotationIntensity={0}>
          <Html position={t.pos} center distanceFactor={7} zIndexRange={[1, 0]} style={{ pointerEvents: "none" }}>
            <span className="whitespace-nowrap rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[11px] text-[#9fe8ff] backdrop-blur-md">{t.text}</span>
          </Html>
        </Float>
      ))}
    </>
  );
}

export default function HeroScene({ quality, active }: { quality: Quality; active: boolean }) {
  const lite = quality === "lite";
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#38d6f0" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#a084ff" />
      <directionalLight position={[0, 5, 5]} intensity={0.6} />
      <Core />
      <Particles count={lite ? 260 : 700} />
      {!lite && <Satellites />}
      {!lite && <CodeTags />}
    </Canvas>
  );
}
