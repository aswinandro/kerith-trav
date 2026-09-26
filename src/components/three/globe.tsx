"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line, Html } from "@react-three/drei";
import * as THREE from "three";

const CITIES = [
  { name: "Paris", lat: 48.85, lon: 2.35 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Phuket", lat: 7.88, lon: 98.39 },
  { name: "Kyoto", lat: 35.01, lon: 135.76 },
  { name: "Bali", lat: -8.4, lon: 115.2 },
  { name: "Machu Picchu", lat: -13.16, lon: -72.54 },
  { name: "Reef", lat: -16.92, lon: 145.77 },
  { name: "Santorini", lat: 36.4, lon: 25.43 },
];

function latLonToVec3(lat: number, lon: number, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, lift = 0.45) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dist = a.distanceTo(b);
  mid.normalize().multiplyScalar(1 + lift * (0.35 + dist * 0.55));
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return curve.getPoints(64);
}

/* ---------------- rotating globe body ---------------- */
function GlobeBody() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const surfacePoints = useMemo(() => {
    const count = 1600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const amber = new THREE.Color("#ffb547");
    const sky = new THREE.Color("#7dd3fc");
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      positions.set([x, y, z], i * 3);
      const c = i % 7 === 0 ? amber : sky;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  const routes = useMemo(() => {
    const pick = [0, 1, 2, 3, 4, 5, 6, 7];
    const pairs: [number, number][] = [];
    for (let i = 0; i < pick.length; i++) {
      pairs.push([pick[i], pick[(i + 3) % pick.length]]);
    }
    return pairs.map(([i, j]) => {
      const a = latLonToVec3(CITIES[i].lat, CITIES[i].lon, 1.02);
      const b = latLonToVec3(CITIES[j].lat, CITIES[j].lon, 1.02);
      return arcPoints(a, b);
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      state.pointer.x,
      0.06
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      state.pointer.y,
      0.06
    );
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.current.y * 0.22,
      0.08
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.current.x * 0.1,
      0.08
    );
  });

  return (
    <group ref={group}>
      {/* solid core */}
      <mesh>
        <sphereGeometry args={[0.99, 64, 64]} />
        <meshStandardMaterial
          color="#070b16"
          roughness={0.85}
          metalness={0.35}
          emissive="#0d1a33"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* wireframe shell */}
      <mesh>
        <sphereGeometry args={[1, 36, 24]} />
        <meshBasicMaterial
          color="#1e3a63"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* point cloud */}
      <points geometry={surfacePoints}>
        <pointsMaterial
          size={0.016}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* flight routes */}
      {routes.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i % 2 ? "#ff5f8f" : "#ffb547"}
          lineWidth={1.6}
          dashed
          dashSize={0.06}
          gapSize={0.045}
          transparent
          opacity={0.75}
        />
      ))}

      {/* markers */}
      {CITIES.map((c, i) => (
        <Marker key={c.name} city={c} index={i} />
      ))}
    </group>
  );
}

function Marker({ city, index }: { city: (typeof CITIES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(
    () => latLonToVec3(city.lat, city.lon, 1.03),
    [city]
  );

  useFrame((state) => {
    if (!ring.current) return;
    const t = state.clock.elapsedTime + index;
    const s = 1 + Math.sin(t * 2) * 0.25;
    ring.current.scale.setScalar(hovered ? s * 1.5 : s);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = hovered
      ? 0.9
      : 0.45 + Math.sin(t * 2) * 0.2;
  });

  return (
    <group position={pos}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={hovered ? 0.055 : 0.035}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "#ffb547"} />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.062, 32]} />
        <meshBasicMaterial
          color="#ff8a1e"
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {hovered && (
        <Html
          position={[0, 0.14, 0]}
          center
          distanceFactor={4}
          zIndexRange={[40, 0]}
        >
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-black/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-2 backdrop-blur">
            {city.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ---------------- glow atmosphere ---------------- */
function Atmosphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.16 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });
  return (
    <mesh ref={ref} scale={1.28}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshBasicMaterial
        color="#ff8a1e"
        transparent
        opacity={0.16}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Rig() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      state.pointer.x * 0.18,
      0.05
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      state.pointer.y * 0.12,
      0.05
    );
  });
  return (
    <group ref={ref}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 3, 5]} intensity={2.2} color="#ffd7a8" />
      <pointLight position={[-5, -3, -4]} intensity={6} color="#ff5f8f" />
      <GlobeBody />
      <Atmosphere />
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.35, 3.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Stars
        radius={90}
        depth={40}
        count={2600}
        factor={3.4}
        saturation={0}
        fade
        speed={0.6}
      />
      <Rig />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.45}
        autoRotate
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={(Math.PI * 2) / 3.2}
      />
    </Canvas>
  );
}
