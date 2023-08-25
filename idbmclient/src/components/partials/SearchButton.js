import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { CustomRoundedBox } from '../partials/CustomRoundedBox';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';
import { Question } from './Question';

export const SearchButton = ({ children, z, onClick }) => {
  return (
    <>
      <a.group position-z={z} onClick={onClick}>
        <CustomRoundedBox
          color={[0.05, 0.07, 0.05]}
          args={[1, 0.28, 0.2]}
          position={[1.6, -1, -0.5]}
        >
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
