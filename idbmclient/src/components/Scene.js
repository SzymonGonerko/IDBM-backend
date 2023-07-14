import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { Hero } from './partials/Hero';

import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three-stdlib';

extend({ TextGeometry });

export const Scene = () => {
  const camRef = useRef();
  const [search, setSearch] = useState(false);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    camRef.current.smoothTime = 1;
    camRef.current.setTarget(0, 0, 350).then(() => setIntro(true));
    camRef.current.dollySpeed = 0.02;
  }, []);

  useFrame((s) => {
    if (!search && intro) {
      camRef.current?.setPosition(-0.5 + s.mouse.x * 2, 1, 355 + s.mouse.y, true);
    }
  });

  const goToSearch = () => {
    setSearch(true);
    setTimeout(() => {
      camRef.current.smoothTime = 1.5;
      camRef.current.setLookAt(-5, 1, 320, -5, 1, 315, true).then(() => {
        camRef.current.setTarget(-5, 0, -300);
      });
    }, 10);
  };

  return (
    <>
      <CameraControls ref={camRef} mouseButtons={{ left: 8, middle: 8, right: 2, wheel: 8 }} />
      <Hero onClick={goToSearch} />
    </>
  );
};
