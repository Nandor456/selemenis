"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
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

  scene.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

// 3. Update the main export to accept the prop and pass it down
export default function Logo3D({ onLoaded }: { onLoaded?: () => void }) {
  return (
    // Note: We move the Canvas to the parent 'home' or keep it here.
    // If you keep Canvas here, the fade needs to apply to the wrapper div inside this component.
    // For this example, I will apply the fade to the Canvas wrapper itself.
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <directionalLight position={[5, 5, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 3, 2]} intensity={1} />
      <directionalLight position={[0, 5, -5]} intensity={1.2} />

      <LoadWatcher onLoaded={onLoaded} />

      {/* 4. Wrap in Suspense to handle the async loading gracefully */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
