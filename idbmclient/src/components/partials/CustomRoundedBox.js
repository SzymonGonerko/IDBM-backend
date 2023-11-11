import React, { useState } from 'react';
import { RoundedBox, useMask } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const CustomRoundedBox = ({ onHover, portal, children, ...props }) => {
  const { color, isSelected } = props;
  const [hover, setHover] = useState(false);
  const stencil = portal ? useMask(1, false) : null;
  const { spring, isHover, isClicked } = useSpring({
    spring: isSelected || hover ? 1 : 0,
    isHover: hover ? 1 : 0,
    isClicked: isSelected ? 1 : 0,
    config: { mass: 1, tension: 500, friction: 100, precision: 0.00001 }
  });
  const scale = spring.to([0, 1], [1, 1.7]);

  const clickedColor = isClicked.to([0, 1], ['#545454', '#505650']);
  const hoverColor = isHover.to([0, 1], ['#545454', '#505050']);

  return (
    <a.mesh
      onPointerLeave={() => (onHover ? setHover(false) : null)}
      onPointerEnter={() => (onHover ? setHover(true) : null)}
      scale-z={scale}
    >
      <RoundedBox {...props}>
        <a.meshStandardMaterial
        transparent
        opacity={0.8}
          {...stencil}
          color={isSelected || hover ? (isSelected ? clickedColor : hoverColor) : color}
        />
        {children}
      </RoundedBox>
    </a.mesh>
  );
};
