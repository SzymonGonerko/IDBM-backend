import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { RoundedBox, Text, Image, useProgress, Html } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import axios from 'axios';
import logo from '../../logo.svg';

export const MovieCard = ({ url }) => {
  return (
    <Suspense fallback={null}>
      <Image
        alt="dsa"
        scale={[2, 3]}
        color={'#777777'}
        url={`https://sg-dev.pl/poster/${url}.jpg`}
        position={[0, 0, 0]}
      />
    </Suspense>
  );
};
