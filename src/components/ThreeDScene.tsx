import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingOrb = ({ position, color, ...props }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={mesh} position={position} args={[1, 32, 32]} {...props}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00CED1" transparent opacity={0.6} />
    </points>
  );
};

const ThreeDScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00CED1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9932CC" />
        
        {/* Main Central Orb */}
        <FloatingOrb 
          position={[2, 0, 0]} 
          color="#00CED1" 
          scale={0.8}
        />
        
        {/* Secondary Orbs */}
        <FloatingOrb 
          position={[-3, 1, -2]} 
          color="#9932CC" 
          scale={0.5}
        />
        
        <FloatingOrb 
          position={[1, -2, -1]} 
          color="#FF69B4" 
          scale={0.3}
        />
        
        {/* Particle Field */}
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;