import React, { useEffect, useRef, useState } from 'react';

import { usePagination } from '../../hook/usePagination';
import { MovieCard } from './MovieCard';
import { GalleryBoard } from './GalleryBoard';

export const Gallery = ({
  position,
  data,
  backToSearchBoard,
  focuseOnMovieCard,
  distractedOnMovieCard,
  wheelSetting
}) => {
  const { list, page, nextPage, previousPage } = usePagination(data, 20);
  const [timer, setTimer] = useState(0);
  const [firstInteract, setFirstInteract] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardPosition, setCardPosition] = useState(0);

  useEffect(() => {
    if (list.length > 0) {
      setTimer(0);
      const id = setInterval(() => {
        setTimer((p) => {
          if (list[page][p]) {
            list[page][p].isVisibile = true;
          }
          return p + 1;
        });
      }, 700);
      const arr = list[page].map(() => false);
      setFirstInteract(arr);
      return () => clearInterval(id);
    }
  }, [list, page]);

  useEffect(() => {
    wheelSetting(8);
    return () => wheelSetting(undefined);
  }, []);

  const pos = (num) => {
    if (num % 2 == 0) {
      return [-2.2, 0, -num * 3 - 5];
    } else {
      return [2.2, 0, -num * 3 - 5];
    }
  };
  const rot = (num) => {
    if (num % 2 == 0) {
      return [0, 0.9, 0];
    } else {
      return [0, -0.9, 0];
    }
  };

  const handleChangeClickedMovies = (i, position) => {
    const arr = firstInteract.map((el, index) => (i == index ? !el : el));
    if (!arr[i]) {
      const arr = firstInteract.map(() => false);
      setFirstInteract(arr);
    } else {
      setFirstInteract(arr);
    }
    setCurrentIndex(i);
    setCardPosition(position);
  };

  useEffect(() => {
    if (firstInteract.length !== 0) {
      const howManyOpen = firstInteract.reduce((prev, curr, i) =>
        curr == true ? ++prev : 0 + prev
      );
      if (firstInteract[currentIndex] && howManyOpen == 1) {
        focuseOnMovieCard(cardPosition);
      }
      if (firstInteract[currentIndex] && howManyOpen > 1) {
        focuseOnMovieCard(cardPosition, true);
      }
      if (!firstInteract[currentIndex] || howManyOpen == 0) {
        distractedOnMovieCard().then(() => wheelSetting(8));
      }
      console.log(howManyOpen);
    }
  }, [firstInteract]);

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
                <mesh rotation={rot(i)} key={i} position={pos(i)}>
                  <MovieCard
                    url={el.poster}
                    wheelSetting={wheelSetting}
                    handleChangeClickedMovies={handleChangeClickedMovies}
                    index={i}
                  />
                </mesh>
              )
            );
          })}
      </group>
    </>
  );
};
