import React, { useEffect, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import { FirstQuestion } from './FirstQuestions';
import { TopBar } from './TopBar';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';
import { InsertTitle } from './InsertTitle.js';
import { Question } from './Question.js';
import { SearchButton } from './SearchButton';
import { Loading } from './Loading';
import axios from 'axios';

const alphabet = 'abcdefghijklmnopqrstuvwxyzżółćźąęń1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZŻÓŁĆŹĄĘŃ ';

export const SerachBoard = ({ searchByTitle }) => {
  const [answers, setAnswers] = useState(['', '']);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [activeInput, setActiveInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [enter, setEnter] = useState(false);
  const { scale, color, showSearchBtn } = useSpring({
    showSearchBtn: answers[1].length > 0 ? 1 : 0,
    scale: close ? 1 : 0,
    color: activeInput ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const scaleBoard = scale.to([0, 1], [1, 0]);
  const colorr = color.to([0, 1], ['#454545', '#404540']);
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

  const handleClose = () => {
    setClose(true);
  };

  const searchMovie = () => {
    if (answers[0] == 'title' && answers[1].length > 0) {
      setClose(true);
      setLoading(true);
      searchByTitle(answers[1]).then((number) => {
        setResult(number);
        if (number === 0)
          setTimeout(() => {
            setClose(false);
            setLoading(false);
          }, 2000);
      });
    }
  };

  const handleClickBoard = (e) => {
    const [...arr] = e.intersections;
    let isClickedBoard = arr.some((el) => el.object.name == 'board');
    let isClickedInput = arr.some((el) => el.object.name == 'input');
    if (isClickedBoard && isClickedInput) {
      setActiveInput(true);
      const arr = [...alphabet];
      document.onkeydown = (e) => {
        if (arr.includes(e.key)) {
          setAnswers((p) => {
            const [...newState] = p;
            newState[1] = p[1] + e.key;
            return newState;
          });
        }
        if (e.key == 'Backspace') {
          setAnswers((p) => {
            const [...newState] = p;
            newState[1] = p[1].slice(0, -1);
            return newState;
          });
        }
        if (e.key == 'Enter') {
          setEnter((p) => !p);
        }
      };
    } else {
      setActiveInput(false);
      document.onkeydown = () => undefined;
    }
  };

  return (
    <>
      <a.group scale={scaleBoard} position={[-5, 1, 315]}>
        <RoundedBox
          name="board"
          onClick={(e) => handleClickBoard(e)}
          cloneIfNonIndexed
          position={[0, 0, 0]}
          args={[5, 3, 0.2]}
        >
          <meshStandardMaterial color={[0.05, 0.05, 0.05]} toneMapped={false} />
          <TopBar handleClose={handleClose} />
          {!nextQuestion && <FirstQuestion onSelect={selectFirstAnswer} onNext={onNext} />}
          {nextQuestion && answers[0] == 'title' && (
            <>
              <Question args={[2.2, 0.28, 0.2]}>Insert your title:</Question>
              <InsertTitle colorr={colorr} word={activeInput ? [...answers[1], '|'] : answers[1]} />
              {answers[1].length > 0 && (
                <SearchButton onClick={searchMovie} z={shearchBtn}>
                  Search
                </SearchButton>
              )}
            </>
          )}
        </RoundedBox>
      </a.group>
      {loading && <Loading result={result} />}
    </>
  );
};
