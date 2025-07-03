
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from 'lucide-react';

function AircraftModel() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Aircraft body */}
      <Box args={[3, 0.5, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4a90e2" />
      </Box>
      
      {/* Wings */}
      <Box args={[0.2, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2c5f87" />
      </Box>
      
      {/* Tail */}
      <Box args={[0.3, 0.8, 0.1]} position={[-1.2, 0.2, 0]}>
        <meshStandardMaterial color="#2c5f87" />
      </Box>
      
      {/* Engine glow */}
      <Sphere args={[0.1]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

export function Aircraft3D() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plane className="h-5 w-5 text-blue-400" />
          3D Aircraft Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[0, 10, 5]} intensity={0.5} />
            
            <AircraftModel />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">Interactive 3D Model - Click and drag to rotate</p>
        </div>
      </CardContent>
    </Card>
  );
}
