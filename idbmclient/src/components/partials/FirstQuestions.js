import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { CustomRoundedBox } from '../partials/CustomRoundedBox';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';
import { Question } from './Question';

export const FirstQuestion = ({ onSelect, onNext }) => {
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { show, hide } = useSpring({
    show: showNextBtn ? 1 : 0,
    hide: isHidden ? 1 : 0,
    config: { mass: 1, tension: 800, friction: 100, precision: 0.00001 }
  });
  const showNext = show.to([0, 1], [0, 0.6]);
  const getHide = hide.to([0, 1], [0, -0.5]);

  const [boxes, setBoxes] = useState([
    {
      title: 'title',
      position: [-1.4, 0, 0.1],
      isSelected: false
    },
    {
      title: 'genre',
      position: [0, 0, 0.1],
      isSelected: false
    },
    {
      title: 'director',
      position: [1.3, 0, 0.1],
      isSelected: false
    }
  ]);

  const handleClickNext = () => {
    setIsHidden(true);
    setTimeout(() => {
      onNext();
    }, 400);
  };

  const handleClick = (arg) => {
    onSelect(arg);
    setShowNextBtn(true);
    setBoxes((p) => {
      const newState = p.map((el) =>
        el.title == arg ? { ...el, isSelected: true } : { ...el, isSelected: false }
      );
      return newState;
    });
  };

  return (
    <mesh name="question">
      <a.group position-z={getHide}>
        <Question args={[3, 0.28, 0.2]}>Do you looking for movies by...?</Question>

        {boxes.map((el, i) => (
          <CustomRoundedBox
            onClick={() => handleClick(el.title)}
            isSelected={el.isSelected}
            key={i}
            color={[0.07, 0.07, 0.07]}
            args={[1, 0.28, 0.2]}
            position={el.position}
          >
            <Text
              color={'black'}
              font={playBold}
              position={[0, 0, 0.11]}
              fontSize={0.19}
              letterSpacing={-0.06}
            >
              {el.title}
            </Text>
          </CustomRoundedBox>
        ))}

        {showNextBtn && (
          <a.group position-z={showNext} onClick={handleClickNext}>
            <CustomRoundedBox
              color={[0.05, 0.09, 0.05]}
              args={[1, 0.28, 0.2]}
              position={[1.6, -1, -0.5]}
            >
              <Text
                color={'black'}
                font={playBold}
                position={[0, 0, 0.11]}
                fontSize={0.19}
                letterSpacing={-0.06}
              >
                next
              </Text>
            </CustomRoundedBox>
          </a.group>
        )}
      </a.group>
    </mesh>
  );
};
