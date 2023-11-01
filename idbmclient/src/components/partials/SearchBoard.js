import React, { useEffect, useState, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { FirstQuestion } from './FirstQuestions';
import { TopBar } from './TopBar';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';
import { Loading } from './Loading';
import { TypeSearcher } from './TypeSearcher';
import { CheckSearcher } from './CheckSearcher';
import { useFocuse } from '../../hook/useFocuse';

export const SerachBoard = ({
  handleSearchByTitle,
  closeWindow,
  openWindow,
  close,
  wheelSetting
}) => {
  const { handleFocuse, text, focuse, enter } = useFocuse();
  const light = useRef();
  const [answers, setAnswers] = useState(['', text]);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const { scale, showSearchBtn } = useSpring({
    showSearchBtn: text.length > 0 ? 1 : 0,
    scale: close ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const scaleBoard = scale.to([0, 1], [1, 0]);
  const shearchBtn = showSearchBtn.to([0, 1], [0, 0.6]);
  const [result, setResult] = useState(false);

  const selectFirstAnswer = (arg) => {
    setAnswers((p) => {
      const [...newState] = p;
      newState[0] = arg;
      return newState;
    });
  };

  useEffect(() => {
    searchMovie();
  }, [enter]);

  const onNext = () => {
    setNextQuestion(true);
  };

  const searchMovie = () => {
    if (answers[0] == 'title' && text.length > 0) {
      closeWindow();
      setLoading(true);
      handleSearchByTitle(text)
        .then((number) => {
          setResult(number);
          if (number === 0)
            setTimeout(() => {
              openWindow();
              setLoading(false);
            }, 2000);
        })
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        });
    }
  };

  const goBack = () => {
    setNextQuestion(false);
  };

  return (
    <>
      <a.group scale={scaleBoard} position={[-5, 1, 315]}>
        <RoundedBox
          name="board"
          onClick={(e) => handleFocuse(e)}
          cloneIfNonIndexed
          position={[0, 0, 0]}
          args={[5, 3, 0.2]}
        >
          <meshStandardMaterial color={[0.05, 0.05, 0.05]} toneMapped={false} />

          <TopBar handleClose={closeWindow} />
          {!nextQuestion && <FirstQuestion onSelect={selectFirstAnswer} onNext={onNext} />}
          {nextQuestion && answers[0] == 'title' && (
            <TypeSearcher
              activeInput={focuse}
              shearchBtn={shearchBtn}
              goBack={goBack}
              answers={text}
              searchMovie={searchMovie}
            />
          )}
          {nextQuestion && answers[0] == 'genre' && (
            <CheckSearcher
              shearchBtn={shearchBtn}
              goBack={goBack}
              searchMovie={searchMovie}
              wheelSetting={wheelSetting}
            />
          )}
        </RoundedBox>
      </a.group>
      {loading && <Loading result={result} />}
    </>
  );
};
