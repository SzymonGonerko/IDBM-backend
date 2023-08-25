import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const CustomRoundedBox = ({ children, ...props }) => {
  const { color, isSelected } = props;
  const { spring } = useSpring({
    spring: isSelected ? 1 : 0,
    config: { mass: 1, tension: 800, friction: 100, precision: 0.00001 }
  });
  const scale = spring.to([0, 1], [1, 2]);
  const colorSpring = spring.to([0, 1], ['#545454', '#505550']);

  return (
    <a.mesh scale-z={scale}>
      <RoundedBox {...props}>
        <a.meshStandardMaterial color={isSelected ? colorSpring : color} />
        {children}
      </RoundedBox>
    </a.mesh>
  );
};
