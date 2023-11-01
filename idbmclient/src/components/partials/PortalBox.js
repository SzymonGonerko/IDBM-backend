import React, { useState, useRef } from 'react';
import { Mask, useMask } from '@react-three/drei';

export const PortalBox = ({ children }) => {
  const group = useRef();

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <Mask id={1} colorWrite={true} position={[0, 0, 0]}>
          <boxGeometry args={[4.95, 2, 0.2]} />
          <meshStandardMaterial color={[0.05, 0.05, 0.05]} />
        </Mask>

        <mesh position={[0, 0, 0]} scale={1} ref={group}>
          {children}
        </mesh>
      </mesh>
    </>
  );
};
