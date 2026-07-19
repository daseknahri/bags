import React from 'react';
import { Center, useGLTF } from '@react-three/drei';

/** Loads a .glb model. Suspends while loading; throws on a bad URL
 *  (caught by BagErrorBoundary, which falls back to Bag3D). */
export default function GlbBag({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}
