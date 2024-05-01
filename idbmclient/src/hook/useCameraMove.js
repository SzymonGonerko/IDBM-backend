import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export const useCameraMove = (reff) => {
  const [intro, setIntro] = useState(false);
  const [search, setSearch] = useState(false);
  const [endMoveCamera, setEndMoveCamera] = useState(true);
  const [parts, setParts] = useState([true, false, false]);

  const moveTo = (x, y, z) => {
    reff.current.setPosition(x, y, z, true);
  };

  const focuseOnMovieCard = (position, fromAnother) => {
    const ddd = position.x > -5 ? -1.85 : -8.15;
    const cam = reff.current;
    cam.smoothTime = 0.47;
    if (fromAnother == undefined) cam.setTarget(-5, 1, reff.current.getPosition().z - 0.5);
    cam.setLookAt(-5, 1, position.z + 2.5, ddd, 1, position.z, true);
  };

  const distractedOnMovieCard = async () => {
    const cam = reff.current;
    let afterMove = await cam
      .setTarget(-5, 1, reff.current.getPosition().z - 0.5, true)
      .then(() => cam.setTarget(-5, 1, 150));
    return afterMove;
  };

  const goToSearch = () => {
    setSearch(true);
    setTimeout(() => {
      reff.current.smoothTime = 1.1;
      reff.current.setLookAt(-5, 1, 320, -5, 1, 315, true).then(() => {
        reff.current.setTarget(-5, 0, -320);
      });
    }, 10);
    setTimeout(() => {
      setEndMoveCamera(false);
      setParts([false, true, false]);
    }, 1000);
  };

  useEffect(() => {
    reff.current.smoothTime = 1;
    reff.current.setTarget(0, 0, 350).then(() => setIntro(true));
    reff.current.dollySpeed = 0.02;
  }, []);

  const goToGallery = () => {
    reff.current.dollySpeed = 0.1;
    reff.current.setTarget(-5, 1, 150);
    reff.current.setLookAt(-5, 1, 310, -5, 1, 150, true);
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
    }
  });

  return {
    intro,
    search,
    endMoveCamera,
    focuseOnMovieCard,
    distractedOnMovieCard,
    goToSearch,
    goToGallery,
    parts,
    setParts,
    moveTo
  };
};
