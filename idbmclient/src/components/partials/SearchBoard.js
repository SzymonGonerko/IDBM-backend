import React, { useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import { FirstQuestion } from './FirstQuestions';
import { TopBar } from './TopBar';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

export const SerachBoard = () => {
  const [answers, setAnswers] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(false)
  const [close, setClose] = useState(false);
  const { scale, show } = useSpring({
    scale: close ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const scaleBoard = scale.to([0, 1], [1, 0]);

  const selectFirstAnswer = (arg) => {
    setAnswers((p) => {
      const [...newState] = p
      newState[0] = arg
      return newState;
    });
  };

  const SecondQuestion = () => {
    switch (answers[0]) {
      case 'title': return <CustomRoundedBox/>
      case 'genre': return <CustomRoundedBox/>
      case 'director': return <CustomRoundedBox/>
    }
  }

  const onNext = () => {
setNextQuestion(true)
  }

  const handleClose = () => {
    setClose(true);
  };

  const ff = () => {
    document.onkeydown = (e) => {
      console.log(e);
    };
  };

  return (
    <a.group scale={scaleBoard} position={[-5, 1, 315]}>
      <RoundedBox cloneIfNonIndexed position={[0, 0, 0]} args={[5, 3, 0.2]}>
        <meshStandardMaterial color={[0.25, 0.25, 0.25]} toneMapped={false} />
        <TopBar handleClose={handleClose} />
        {!nextQuestion && <FirstQuestion onSelect={selectFirstAnswer} onNext={onNext}/>}
        {nextQuestion && <SecondQuestion/>}
      </RoundedBox>
    </a.group>
  );
};
