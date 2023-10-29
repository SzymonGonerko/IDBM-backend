import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { ActionButton } from './ActionButton.js';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { New } from './New.js';
import { a } from '@react-spring/three';

const genres = [
  'Comedy',
  'Romance',
  'Horror',
  'Thriller',
  'Fantasy',
  'Action',
  'Adventure',
  'Sci-Fi',
  'Drama',
  'War',
  'Family',
  'Mystery',
  'Biography',
  'Musical',
  'Music',
  'Western',
  'Film-Noir',
  'Animation',
  'History',
  'Sport',
  'Music'
];

export const CheckSearcher = (props) => {
  const { goBack, wheelSetting } = props;
  const [boxPosition, setBoxPosition] = useState([]);

  const [onHoverBack, setOnHoverBack] = useState(false);
  const [onHoverSearch, setOnHoverSearch] = useState(false);
  const [jj, setJj] = useState(0);

  const { back, search, pos } = useSpring({
    pos: jj,
    back: onHoverBack ? 1 : 0,
    search: onHoverSearch ? 1 : 0,
    config: { mass: 1, tension: 200, friction: 100, precision: 0.00001 }
  });
  const searchColor = search.to([0, 1], ['#42593e', '#3d5e38']);
  const backColor = back.to([0, 1], ['#62451c', '#64471e']);
  const movee = pos.to([0, 1], [-3.5, -2.5]);

  const onWheel = (e) => {
    if (e.deltaY < 0) {
      setJj((p) => {
        if (p <= -2) return p;
        else {
          return p - 1;
        }
      });
    } else {
      setJj((p) => {
        if (p >= 2) return p;
        else {
          return p + 1;
        }
      });
    }
  };

  useEffect(() => {
    const x = Math.trunc(genres.length / 3);
    const arr = [];
    let bb = 0.5;
    while (arr.length < genres.length) {
      for (let i = 0; i < x; i++) {
        arr.push([i * 1.2, bb, 0.3]);
      }
      bb = bb - 0.5;
    }
    setBoxPosition(arr);
    wheelSetting(null);
    document.addEventListener('mousewheel', onWheel);
    return () => document.removeEventListener('mousewheel', onWheel);
  }, []);

  const onGoBack = () => {
    goBack();
    wheelSetting(8);
  };

  return (
    <>
      <New>
        <a.group position={[-3.5, 0.1, 0]} position-x={movee}>
          {genres.map((el, i) => {
            return (
              <CustomRoundedBox
                key={i}
                color={[0.06, 0.06, 0.06]}
                args={[1, 0.28, 0.2]}
                position={boxPosition[i]}
                portal
                onHover
              >
                <Text
                  color={'black'}
                  font={playBold}
                  position={[0, 0, 0.11]}
                  fontSize={0.19}
                  letterSpacing={-0.06}
                >
                  {el}
                </Text>
              </CustomRoundedBox>
            );
          })}
        </a.group>
      </New>

      <ActionButton
        onClick={onGoBack}
        onPointerOver={() => setOnHoverBack(true)}
        onPointerOut={() => setOnHoverBack(false)}
        color={backColor}
        z={0.6}
        position={[-1.6, -1, -0.5]}
      >
        Back
      </ActionButton>
      <ActionButton
        color={searchColor}
        onPointerOver={() => setOnHoverSearch(true)}
        onPointerOut={() => setOnHoverSearch(false)}
        position={[1.6, -1, -0.5]}
        z={0.6}
      >
        Search
      </ActionButton>
    </>
  );
};
