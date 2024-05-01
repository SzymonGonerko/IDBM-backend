import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Image, Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const MovieCard = ({
  url,
  wheelSetting,
  handleChangeClickedMovies,
  index
}) => {
  const [size, setSize] = useState(false);
  const image = useRef();
  const box = useRef();
  const { scale } = useSpring({
    scale: size ? 1 : 0,
    config: {tension: 1200, friction: 50}
  });
  const scaleBoard = scale.to([0, 1], ['#304545', '#305555']);

  const clickOnImage = (e) => {
    e.stopPropagation();
    const x = box.current.matrixWorld.elements[12];
    const y = box.current.matrixWorld.elements[13];
    const z = box.current.matrixWorld.elements[14];
    const position = { x, y, z };
    wheelSetting(undefined);
    handleChangeClickedMovies(index, position);
  };

  const onPointerEnter = (e) => {
    e.stopPropagation();
    setSize(true);
  };

  const onPointerLeave = (e) => {
    e.stopPropagation();
    setSize(false);
    image.current.material.zoom = 1;
  };

  return (
    <>
      <Box ref={box} args={[2.1, 3.1, 0.05]} position={[0, 0, -0.05]}>
        <a.meshStandardMaterial color={scaleBoard} />
      </Box>
      <Suspense fallback={null}>
        <Image
          onPointerEnter={(e) => onPointerEnter(e)}
          onPointerLeave={(e) => onPointerLeave(e)}
          onClick={(e) => clickOnImage(e)}
          ref={image}
          scale={[2, 3]}
          zoom={1}
          color={'#777777'}
          url={`https://sg-dev.pl/poster/${url}.jpg`}
          position={[0, 0, 0]}
        />
      </Suspense>
    </>
  );
};
