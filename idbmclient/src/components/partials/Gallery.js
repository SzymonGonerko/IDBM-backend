import React, { useEffect } from 'react';
import { Text } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox';
import playBold from '../../assets/fonts/Play-Bold.ttf';

import { usePagination } from '../../hook/usePagination';
import { MovieCard } from './MovieCard';
import { GalleryBoard } from './GalleryBoard';

export const Gallery = ({ position, data, goToNextPage, backToSearchBoard, wheelSetting }) => {
  const { list, page, nextPage, previousPage, howManyLeft, showMore } = usePagination(data, 20);

  const handleClickMore = (e) => {
    e.stopPropagation();
    showMore(goToNextPage);
  };

  useEffect(() => {
    console.log(data)
    wheelSetting(8);
    return () => wheelSetting(undefined);
  }, []);

  const pos = (num) => {
    if (num % 2 == 0) {
      return [-2, 0, -num * 3];
    } else {
      return [2, 0, -num * 3];
    }
  };
  const rot = (num) => {
    if (num % 2 == 0) {
      return [0, 0.9, 0];
    } else {
      return [0, -0.9, 0];
    }
  };

  return (
    <>
      <group position={position}>
        <GalleryBoard
          previousPage={previousPage}
          nextPage={nextPage}
          backToSearchBoard={backToSearchBoard}
          info={[page + 1, list.length]}
        />

        {list[page] !== undefined &&
          list[page].map((el, i) => {
            return (
              el?.isVisibile && (
                <mesh key={i}>
                  <mesh rotation={rot(i)} key={i} position={pos(i)}>
                    <MovieCard url={el.poster} />
                  </mesh>
                  {list[page][i + 1]?.isVisibile == undefined && (
                    <CustomRoundedBox
                      onClick={(e) => handleClickMore(e)}
                      color={[0.05, 0.09, 0.05]}
                      args={[1, 0.28, 0.2]}
                      position={[0, 0, -i * 3]}
                    >
                      <Text
                        color={'black'}
                        font={playBold}
                        position={[0, 0, 0.11]}
                        fontSize={0.19}
                        letterSpacing={-0.06}
                      >
                        More ({howManyLeft()})
                      </Text>
                    </CustomRoundedBox>
                  )}
                </mesh>
              )
            );
          })}
      </group>
    </>
  );
};
