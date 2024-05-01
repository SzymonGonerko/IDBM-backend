import React, { useState, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { Hero } from './partials/Hero';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three-stdlib';
import { SerachBoard } from './partials/SearchBoard';
import { Gallery } from './partials/Gallery';
import { useCameraMove } from '../hook/useCameraMove';
extend({ TextGeometry });
import { useSearch } from '../hook/useSearch';

export const Scene = () => {
  const cameraRef = useRef();
  const { searchByTitle, searchByGenre, searchByDirector } = useSearch();
  const {
    goToSearch,
    goToGallery,
    moveTo,
    setParts,
    focuseOnMovieCard,
    distractedOnMovieCard,
    parts
  } = useCameraMove(cameraRef);

  const [movies, setMovies] = useState([]);
  const [close, setClose] = useState(false);
  const [wheel, setWheel] = useState(8);

  const wheelSetting = (behavior) => {
    setWheel(behavior);
  };

  const backToSearchBoard = () => {
    setClose(false);
    setMovies([]);
    moveTo(-5, 1, 320);
    setTimeout(() => setParts([false, true, false]), 1500);
  };

  const handleSearchByTitle = async (title) => {
    let response = await searchByTitle(title);
    setMovies(response);
    if (response.length > 0)
      setTimeout(() => {
        goToGallery();
        setParts([false, false, true]);
      }, 3000);
    return response.length;
  };

  const handleSearchByGenre = async (genre) => {
    let response = await searchByGenre(genre);
    setMovies(response);
    if (response.length > 0)
      setTimeout(() => {
        goToGallery();
        wheelSetting(8);
        setParts([false, false, true]);
      }, 3000);
    return response.length;
  };

  const handleSearchByDirector = async (director) => {
    let response = await searchByDirector(director);
    setMovies(response);
    if (response.length > 0)
      setTimeout(() => {
        goToGallery();
        wheelSetting(8);
        setParts([false, false, true]);
      }, 3000);
    return response.length;
  };

  return (
    <>
      <CameraControls
        ref={cameraRef}
        mouseButtons={{ left: undefined, middle: 8, right: 2, wheel: wheel }}
      />
      {parts[0] && <Hero onClick={goToSearch} />}

      <SerachBoard
        closeWindow={() => setClose(true)}
        openWindow={() => setClose(false)}
        close={close}
        handleSearchByTitle={handleSearchByTitle}
        handleSearchByGenre={handleSearchByGenre}
        handleSearchByDirector={handleSearchByDirector}
        wheelSetting={wheelSetting}
      />

      {parts[2] && (
        <Gallery
          data={movies}
          wheelSetting={wheelSetting}
          backToSearchBoard={backToSearchBoard}
          focuseOnMovieCard={focuseOnMovieCard}
          distractedOnMovieCard={distractedOnMovieCard}
          position={[-5, 1, 304]}
        />
      )}
    </>
  );
};
