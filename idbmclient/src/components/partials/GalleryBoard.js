import React, { useEffect, useState, useMemo } from 'react';
import { RoundedBox, Text, Image } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox';
import axios from 'axios';
import logo from '../../logo.svg';
import { usePagination } from '../../hook/usePagination';
import { MovieCard } from './MovieCard';
import playBold from '../../assets/fonts/Play-Bold.ttf';

export const GalleryBoard = ({ previousPage, nextPage, info, backToSearchBoard }) => {
  let prevSymbol = '<';
  let nextSymbol = '>';

  const handleClickBack = (e) => {
    e.stopPropagation();
    previousPage();
  };

  const handleClickNext = (e) => {
    e.stopPropagation();
    nextPage();
  };

  return (
    <>
      <CustomRoundedBox position={[0, 0, 1]} args={[2, 1.8, 0.1]} color={[0.05, 0.05, 0.05]}>
        <Text font={playBold} position={[0, 0.4, 0.2]} fontSize={0.4} color={'black'}>
          Gallery
        </Text>
        <CustomRoundedBox
          onClick={(e) => handleClickBack(e)}
          args={[0.3, 0.3, 0.1]}
          color={'#505550'}
          position={[-0.6, -0.2, 0.2]}
        >
          <Text
            color={'black'}
            font={playBold}
            position={[0, 0, 0.11]}
            fontSize={0.19}
            letterSpacing={-0.06}
          >
            {prevSymbol}
          </Text>
        </CustomRoundedBox>
        <CustomRoundedBox args={[0.8, 0.3, 0.1]} color={'#505550'} position={[0, -0.2, 0.2]}>
          <Text
            color={'black'}
            font={playBold}
            position={[0, 0, 0.11]}
            fontSize={0.19}
            letterSpacing={-0.06}
          >
            {info[0]}/{info[1]}
          </Text>
        </CustomRoundedBox>
        <CustomRoundedBox
          onClick={(e) => handleClickNext(e)}
          args={[0.3, 0.3, 0.1]}
          color={'#505550'}
          position={[0.6, -0.2, 0.2]}
        >
          <Text
            color={'black'}
            font={playBold}
            position={[0, 0, 0.11]}
            fontSize={0.19}
            letterSpacing={-0.06}
          >
            {nextSymbol}
          </Text>
        </CustomRoundedBox>
        <CustomRoundedBox
          onClick={backToSearchBoard}
          args={[1.5, 0.3, 0.1]}
          color={'#64471e'}
          position={[0, -0.6, 0.2]}
        >
          <Text
            color={'black'}
            font={playBold}
            position={[0, 0, 0.11]}
            fontSize={0.19}
            letterSpacing={-0.06}
          >
            back to search
          </Text>
        </CustomRoundedBox>
      </CustomRoundedBox>
    </>
  );
};
