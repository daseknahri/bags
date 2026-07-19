import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BagStage from './BagStage';
import './three.css';

export default function Hero3D({ color = '#a97b4f' }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="hero-3d" />;

  return (
    <div className="hero-3d">
      <Canvas
        camera={{ position: [1.4, 0.5, 4.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <BagStage color={color} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.4}
          enableZoom={false}
          enablePan={false}
          enableDamping
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}
