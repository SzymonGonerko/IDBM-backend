import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three-stdlib';
extend({ TextGeometry });

export const useCameraMove = (reff) => {
  const [intro, setIntro] = useState(false);
  const [search, setSearch] = useState(false);
  const [endMoveCamera, setEndMoveCamera] = useState(true);
  const [parts, setParts] = useState([true, false, false])

  const moveTo = (x, y, z) => {
    reff.current.setPosition(x, y, z, true);
  }

  const goToSearch = () => {
    setSearch(true);
    setTimeout(() => {
      reff.current.smoothTime = 1.5;
      reff.current.setLookAt(-5, 1, 320, -5, 1, 315, true).then(() => {
        reff.current.setTarget(-5, 0, -300);
      });
    }, 10);
    setTimeout(() => {
      setEndMoveCamera(false);
      setParts([false, true, false])
    }, 1000);
  };

  useEffect(() => {
    reff.current.smoothTime = 1;
    reff.current.setTarget(0, 0, 350).then(() => setIntro(true));
    reff.current.dollySpeed = 0.02;
  }, []);

  const goToGallery = () => {
    reff.current.setLookAt(-5, 1, 310, -5, 1, -300, true);
  };

  useFrame((s) => {
    if (!search && intro) {
      reff.current?.setPosition(-0.5 + s.mouse.x * 2, 1, 355 + s.mouse.y, true);
    }
    if (reff.current.getPosition().z > 325 && search) {
      reff.current.setPosition(-5, 1, 320, true);
    }
    if (reff.current.getPosition().z < 225 && search) {
      reff.current.setPosition(-5, 1, 320, true);
      console.log(cameraRef.current);
    }
  });

  const goToNextPage = () => {
    reff?.current?.setPosition(-5, 1, 310, true);
  };

  return { goToNextPage, intro, search, endMoveCamera, goToSearch, goToGallery, parts, setParts, moveTo };
};
