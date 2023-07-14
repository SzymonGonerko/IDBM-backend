import React from 'react';
import * as THREE from 'three';
import { useTexture, MeshReflectorMaterial } from '@react-three/drei';
import ground from '../../assets/groundTexture.jpg';

export const Ground = (props) => {
  const textures = useTexture({
    roughnessMap: ground,
    map: ground
  });

  textures.roughnessMap.wrapS = THREE.RepeatWrapping;
  textures.roughnessMap.wrapT = THREE.RepeatWrapping;
  textures.roughnessMap.repeat.set(80, 10);

  textures.map.wrapS = THREE.RepeatWrapping;
  textures.map.wrapT = THREE.RepeatWrapping;
  textures.map.repeat.set(80, 10);

  return (
    <mesh {...props} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <planeGeometry args={[800, 100]} />
      <MeshReflectorMaterial
        blur={[200, 100]}
        resolution={1024}
        mirror={0.5}
        // mirror={0.8}
        mixBlur={120}
        mixStrength={15}
        roughness={0.8}
        depthScale={1.2}
        metalness={0.1}
        {...textures}
      />
    </mesh>
  );
};
