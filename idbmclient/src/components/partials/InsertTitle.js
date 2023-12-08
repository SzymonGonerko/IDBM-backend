import React from 'react';
import { Text } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import playBold from '../../assets/fonts/Play-Bold.ttf';

export const InsertTitle = ({ color, word }) => {
  return (
    <>
      <CustomRoundedBox color={color} args={[2, 0.28, 0.2]} position={[1, 0.8, 0.1]} name="input">
        <Text
          color={'black'}
          font={playBold}
          position={[-0.95, 0, 0.11]}
          fontSize={0.19}
          letterSpacing={-0.04}
          anchorX="left"
        >
          {word}
        </Text>
      </CustomRoundedBox>
    </>
  );
};
