import React, { useState } from 'react';
import { RoundedBox, useMask } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const CustomRoundedBox = ({onHover, portal, children, ...props }) => {
  const { color, isSelected } = props;
  const [hover, setHover] = useState(false)
  const stencil = portal ? useMask(1, false) : null;
  const { spring } = useSpring({
    spring: isSelected || hover ? 1 : 0,
    config: { mass: 1, tension: 500, friction: 100, precision: 0.00001 }
  });
  const scale = spring.to([0, 1], [1, 1.7]);
  const colorSpring = spring.to([0, 1], ['#545454', '#505550']);

  return (
    <a.mesh onPointerLeave={() => onHover? setHover(false):null} onPointerEnter={() => onHover? setHover(true):null} scale-z={scale}>
      <RoundedBox {...props}>
        <a.meshStandardMaterial {...stencil} color={isSelected || hover ? colorSpring : color} />
        {children}
      </RoundedBox>
    </a.mesh>
  );
};
