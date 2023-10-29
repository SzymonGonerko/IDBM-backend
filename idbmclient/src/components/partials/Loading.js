import React, { useEffect, useState, useRef } from 'react';
import { Trail, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import playRegular from '../../assets/fonts/Play-Regular.ttf';

export const Loading = ({ result }) => {
  const ref = useRef();
  const [color, setColor] = useState(new THREE.Color(0, 0.6, 0.5));
  const tail = useRef();

  useEffect(() => {
    if (result === 0) {
      setColor(new THREE.Color(1, 0, 0));
    }
    if (result > 0) {
      setColor(new THREE.Color(0, 0.7, 0.1));
    }
  }, [result]);

  useFrame((state) => {
    let gg = result > 0 || result === 0 ? 2 : 3;
    const t = state.clock.getElapsedTime() * gg;
    ref.current.position.set(Math.sin(t) * 1.2 - 5, Math.cos(t) * 1.2 + 1, 314);
  });

  return (
    <>
      <Trail local width={0.05} length={8} attenuation={(t) => t * t * 20} color={color} ref={tail}>
        <mesh ref={ref} />

        <Text position={[-5, 1, 314]} color={'#888888'} font={playRegular} fontSize={0.2}>
          {result === false && 'Wait'}
          {result === 0 && 'Not found'}
          {result > 0 && `${result} movies`}
        </Text>
      </Trail>
    </>
  );
};
