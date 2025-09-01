import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Robot = () => {
  const robotRef = useRef<THREE.Group>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useFrame((state) => {
    if (robotRef.current) {
      // Float animation
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Subtle rotation
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Move based on scroll position
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollPosition / maxScroll;
      robotRef.current.position.x = (scrollPercent * 8) - 4; // Move from -4 to 4 based on scroll
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <group ref={robotRef} position={[0, 0, 0]}>
      {/* Robot Head */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#00CED1" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#00CED1"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.15, 0.9, 0.31]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          emissive="#FF69B4"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.15, 0.9, 0.31]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          emissive="#FF69B4"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial 
          color="#9932CC" 
          metalness={0.7} 
          roughness={0.3}
          emissive="#9932CC"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Robot Arms */}
      <mesh position={[-0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#00CED1" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#00CED1" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Robot Legs */}
      <mesh position={[-0.2, -0.9, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8]} />
        <meshStandardMaterial 
          color="#9932CC" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.2, -0.9, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8]} />
        <meshStandardMaterial 
          color="#9932CC" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          emissive="#FF69B4"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          emissive="#FF69B4"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

const FloatingRobot = () => {
  return (
    <div className="fixed top-1/2 right-8 w-32 h-32 z-40 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#00CED1" />
        <pointLight position={[-2, -2, -2]} intensity={0.4} color="#9932CC" />
        
        <Robot />
      </Canvas>
    </div>
  );
};

export default FloatingRobot;