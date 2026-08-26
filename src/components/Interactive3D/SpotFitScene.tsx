import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function SpotFitScene() {
  const torusRef = useRef<THREE.Mesh>(null);
  
  // Use a reduced motion check if we want, but since Drei's Float handles basic bobbing, 
  // we'll just add a slow rotation to the Torus.
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useFrame((_state, delta) => {
    if (!torusRef.current || prefersReducedMotion) return;
    torusRef.current.rotation.x += delta * 0.2;
    torusRef.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#c3f400" />
      
      <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus 
          ref={torusRef}
          args={[3, 0.4, 64, 100]} // radius, tube, radialSegments, tubularSegments
        >
          <MeshDistortMaterial 
            color="#1a1a1a" // surface-container-high
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={prefersReducedMotion ? 0 : 2}
          />
        </Torus>
      </Float>
      
      {/* Inner glowing core representing energy/focus */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#c3f400" 
          emissive="#c3f400"
          emissiveIntensity={0.8}
          roughness={0.5}
        />
      </mesh>
    </>
  );
}
