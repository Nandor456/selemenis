"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

interface ModelProps {
  onLoaded?: () => void;
}

function LoadWatcher({ onLoaded }: ModelProps) {
  const { active, progress } = useProgress();
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (hasFiredRef.current) return;
    if (!active && progress >= 100) {
      hasFiredRef.current = true;
      onLoaded?.();
    }
  }, [active, progress, onLoaded]);

  return null;
}

function Model() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/logo3d.glb");

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function Logo3D({ onLoaded }: { onLoaded?: () => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
      >
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, 3, 2]} intensity={1} />
        <directionalLight position={[0, 5, -5]} intensity={1.2} />

        <LoadWatcher onLoaded={onLoaded} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
