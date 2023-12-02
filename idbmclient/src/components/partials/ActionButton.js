import React from 'react';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { CustomRoundedBox } from './CustomRoundedBox';
import { a } from '@react-spring/three';

export const ActionButton = ({
  children,
  z,
  onClick,
  position,
  color,
  onPointerOver,
  onPointerOut
}) => {

  const click = (e) => {
    e.stopPropagation()
    onClick()
  }



  return (
    <>
      <a.group
        position-z={z}
        onClick={(e) => click(e)}
        onPointerOut={onPointerOut}
        onPointerOver={onPointerOver}
      >
        <CustomRoundedBox color={color} args={[1, 0.28, 0.2]} position={position}>
          <Text
            color={'black'}
            font={playBold}
            position={[0, 0, 0.11]}
            fontSize={0.19}
            letterSpacing={-0.06}
          >
            {children}
          </Text>
        </CustomRoundedBox>
      </a.group>
    </>
  );
};
