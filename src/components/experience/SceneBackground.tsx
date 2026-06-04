import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouse } from "@/hooks/use-mouse";

function ParticleUniverse() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 2600;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cyan = new THREE.Color("#d4af37");
    const violet = new THREE.Color("#c0c0c0");
    const gold = new THREE.Color("#ffd700");
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      const c = t < 0.55 ? cyan : t < 0.9 ? violet : gold;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.01;
    const tx = mouse.nx * 0.25;
    const ty = mouse.ny * 0.25;
    ref.current.rotation.y += (tx - ref.current.rotation.y * 0) * 0;
    ref.current.position.x += (tx * 1.2 - ref.current.position.x) * 0.04;
    ref.current.position.y += (ty * 1.2 - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function TechnologyCore() {
  const groupRef = useRef<THREE.Group>(null);
  const { positions, colors } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color("#ffd700");
    const silver = new THREE.Color("#c0c0c0");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const col = Math.random() > 0.5 ? gold : silver;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Smooth interactive rotation influenced by mouse
    const targetRotY = time * 0.15 + mouse.nx * 0.3;
    const targetRotX = time * 0.1 + mouse.ny * 0.3;
    
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z = time * 0.05;

    // Pulsate mesh
    const pulse = 1.0 + Math.sin(time * 1.5) * 0.05;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      {/* Outer Data Box */}
      <mesh>
        <boxGeometry args={[2.5, 2.5, 2.5, 2, 2, 2]} />
        <meshStandardMaterial
          color="#c0c0c0"
          emissive="#ffd700"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner Processing Core */}
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Data Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    const targetZ = 9 - scrollRef.current * 3.5;
    camera.position.x += (mouse.nx * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (mouse.ny * 1.0 - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Lights() {
  const cyan = useRef<THREE.PointLight>(null);
  const violet = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (cyan.current) {
      cyan.current.position.x += (mouse.nx * 8 - cyan.current.position.x) * 0.06;
      cyan.current.position.y += (mouse.ny * 8 - cyan.current.position.y) * 0.06;
    }
    if (violet.current) {
      violet.current.position.x += (-mouse.nx * 8 - violet.current.position.x) * 0.06;
      violet.current.position.y += (-mouse.ny * 8 - violet.current.position.y) * 0.06;
    }
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={cyan} color="#d4af37" intensity={60} distance={30} position={[5, 5, 5]} />
      <pointLight ref={violet} color="#c0c0c0" intensity={50} distance={30} position={[-5, -5, 5]} />
    </>
  );
}

export function SceneBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Lights />
        <TechnologyCore />
        <ParticleUniverse />
        <Rig />
      </Canvas>
    </div>
  );
}
