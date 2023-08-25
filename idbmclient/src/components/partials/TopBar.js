import React, { useState } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const TopBar = ({ handleClose }) => {
  const [active, setActive] = useState(false);
  const { spring } = useSpring({
    spring: active ? 1 : 0,
    config: { mass: 1, tension: 800, friction: 100, precision: 0.00001 }
  });
  const colorSpringIn = spring.to([0, 1], ['#545454', '#540000']);
  const colorSpringOut = spring.to([1, 0], ['#540000', '#545454']);

  return (
    <>
      <CustomRoundedBox
        color={[0.07, 0.07, 0.07]}
        args={[4.96, 0.28, 0.05]}
        position={[0, 1.36, 0.1]}
      >
        <Text
          font={playBold}
          color={'black'}
          position={[-2, 0, 0.06]}
          fontSize={0.3}
          letterSpacing={-0.06}
        >
          IDBM
        </Text>

        <RoundedBox
          args={[0.4, 0.27, 0.05]}
          position={[2.259, -0.01, 0.04]}
          onPointerOver={() => setActive(true)}
          onPointerOut={() => setActive(false)}
          onClick={handleClose}
        >
          <a.meshStandardMaterial color={active ? colorSpringIn : colorSpringOut} />
          <Text
            font={playBold}
            color={'black'}
            position={[0, 0, 0.06]}
            fontSize={0.15}
            letterSpacing={-0.06}
          >
            X
          </Text>
        </RoundedBox>
      </CustomRoundedBox>
    </>
  );
};
