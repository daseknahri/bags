import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BagStage from './BagStage';
import { bagColorFromProduct } from './bagColor';
import './three.css';

export default function Product3DViewer({ product }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const color = bagColorFromProduct(product);
  const modelUrl = product?.model3dUrl || product?.specs?.['3D Model'] || null;

  return (
    <div className="bag3d-viewer">
      {mounted && (
        <Canvas
          camera={{ position: [1.2, 0.3, 4.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <BagStage color={color} modelUrl={modelUrl} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.8}
            enablePan={false}
            enableDamping
            minDistance={2.8}
            maxDistance={6}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      )}
      <span className="bag3d-hint">اسحب باش تدور الصاك 360° ✋ · Drag to rotate</span>
    </div>
  );
}
