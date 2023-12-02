import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { CustomRoundedBox } from '../partials/CustomRoundedBox';

export const Question = ({position = [0, 0.6, 0.1], color = [0.05, 0.08, 0.08] ,children, args }) => {
  return (
    <>
      <CustomRoundedBox color={color} args={args} position={position}>
        <Text
          color={'black'}
          font={playBold}
          position={[0, 0, 0.13]}
          fontSize={0.19}
          letterSpacing={-0.06}
        >
          {children}
        </Text>
      </CustomRoundedBox>
    </>
  );
};
