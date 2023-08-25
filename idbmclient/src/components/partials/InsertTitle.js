import React from 'react';
import { Text } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import playBold from '../../assets/fonts/Play-Bold.ttf';

export const InsertTitle = ({ colorr, word }) => {
  return (
    <>
      <CustomRoundedBox color={colorr} args={[2, 0.28, 0.2]} position={[0, 0, 0.1]} name="input">
        <Text
          color={'black'}
          font={playBold}
          position={[-0.9, 0, 0.11]}
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
