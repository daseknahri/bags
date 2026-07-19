import React, { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei';
import Bag3D from './Bag3D';
import GlbBag from './GlbBag';
import BagErrorBoundary from './BagErrorBoundary';

/** Lights + bag + soft ground shadow. Must live inside a <Canvas>. */
export default function BagStage({ color, modelUrl }) {
  const bag = <Bag3D color={color} />;
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={1.25} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#ffe0b0" />
      <pointLight position={[0, -2, 3]} intensity={0.25} color="#ffffff" />

      <Suspense fallback={bag}>
        {modelUrl ? (
          <BagErrorBoundary fallback={bag}>
            <GlbBag url={modelUrl} />
          </BagErrorBoundary>
        ) : (
          bag
        )}
      </Suspense>

      <ContactShadows position={[0, -0.98, 0]} opacity={0.45} scale={6} blur={2.8} far={3} />
    </>
  );
}
