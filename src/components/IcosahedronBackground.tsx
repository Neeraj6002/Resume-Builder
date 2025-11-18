import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

function Icosahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color="#4c6ef5"
        wireframe
        emissive="#4c6ef5"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Torus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-4, 2, -3]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        emissive="#7c3aed"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function Octahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, -2, -2]}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#ec4899"
        wireframe
        emissive="#ec4899"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function IcosahedronBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
        <Icosahedron />
        <Torus />
        <Octahedron />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
