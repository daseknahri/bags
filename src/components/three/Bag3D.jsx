import React from 'react';
import { RoundedBox } from '@react-three/drei';

const GOLD = '#c79a5b';

function darken(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  r = Math.round(r * (1 - amt));
  g = Math.round(g * (1 - amt));
  b = Math.round(b * (1 - amt));
  const h = (v) => v.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Stylized procedural handbag from primitives. Renders a <group>; must live inside a <Canvas>. */
export default function Bag3D({ color = '#8a5a34' }) {
  const flapColor = darken(color, 0.12);

  return (
    <group rotation={[0.05, 0, 0]}>
      {/* body */}
      <RoundedBox args={[2, 1.5, 0.72]} radius={0.16} smoothness={6}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.06} />
      </RoundedBox>

      {/* flap over top-front */}
      <RoundedBox args={[2.04, 0.72, 0.06]} radius={0.05} smoothness={5} position={[0, 0.42, 0.37]}>
        <meshStandardMaterial color={flapColor} roughness={0.55} metalness={0.06} />
      </RoundedBox>

      {/* clasp */}
      <RoundedBox args={[0.26, 0.2, 0.08]} radius={0.04} smoothness={4} position={[0, 0.16, 0.42]}>
        <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.9} />
      </RoundedBox>

      {/* round top handle */}
      <mesh position={[0, 1.12, 0]}>
        <torusGeometry args={[0.5, 0.06, 20, 80]} />
        <meshStandardMaterial color={GOLD} roughness={0.28} metalness={0.9} />
      </mesh>

      {/* feet */}
      {[-0.7, 0.7].map((x) =>
        [-0.22, 0.22].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.78, z]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}
