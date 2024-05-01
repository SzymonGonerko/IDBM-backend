import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { RoundedBox, useTexture } from '@react-three/drei';
import { FirstQuestion } from './FirstQuestions';
import { TopBar } from './TopBar';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';
import { Loading } from './Loading';
import { TypeSearcher } from './TypeSearcher';
import { CheckSearcher } from './CheckSearcher';
import { useFocuse } from '../../hook/useFocuse';
import back from '../../assets/back.jpg';

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

export const SerachBoard = ({
  handleSearchByTitle,
  handleSearchByGenre,
  handleSearchByDirector,
  closeWindow,
  openWindow,
  close,
  wheelSetting
}) => {
  const texture = useTexture(back);
  const { handleFocuse, text, focuse, enter, setText } = useFocuse();
  const [answers, setAnswers] = useState(['', text]);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(1);
  const { scale, showSearchBtn, filters } = useSpring({
    showSearchBtn: text.length > 0 ? 1 : 0,
    filters: filter,
    scale: close ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const scaleBoard = scale.to([0, 1], [1, 0]);
  const shearchBtn = showSearchBtn.to([0, 1], [0, 0.6]);
  const testing = filters.to([0, 1, 2], ['#465046', '#645050', '#505064']);
  const [result, setResult] = useState(false);
  const [genresDetails, setGeneresDetails] = useState(genres);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.19, 0.375);

  useEffect(() => {
    setGeneresDetails((p) => {
      const [...arr] = p;
      const newState = arr.map((el) => {
        return { item: el, isSelected: false };
      });
      return newState;
    });
  }, []);

  const selectFirstAnswer = (arg) => {
    setText('');
    setAnswers((p) => {
      const [...newState] = p;
      newState[0] = arg;
      return newState;
    });
    switch (arg) {
      case 'title':
        return setFilter(0);
      case 'genre':
        return setFilter(1);
      case 'director':
        return setFilter(2);
    }
  };

  useEffect(() => {
    searchMovie();
  }, [enter]);

  const onNext = () => {
    setNextQuestion(true);
  };

  const searchMovie = (exactTitle) => {
    if (answers[0] == 'title' && text.length > 0) {
      closeWindow();
      setLoading(true);
      let content = exactTitle ? exactTitle : text;
      handleSearchByTitle(content)
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
    if (answers[0] == 'genre') {
      closeWindow();
      setLoading(true);
      handleSearchByGenre(genresDetails)
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
    if (answers[0] == 'director' && text.length > 0) {
      closeWindow();
      setLoading(true);
      handleSearchByDirector(text)
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
          <a.meshStandardMaterial attach="material-0" map={texture} color={testing} />
          <meshStandardMaterial attach="material-1" color={[0.06, 0.06, 0.06]} />

          <TopBar handleClose={closeWindow} />
          {!nextQuestion && <FirstQuestion onSelect={selectFirstAnswer} onNext={onNext} />}

          {nextQuestion && answers[0] == 'title' && (
            <TypeSearcher
              titles
              activeInput={focuse}
              shearchBtn={shearchBtn}
              goBack={goBack}
              answers={text}
              wheelSetting={wheelSetting}
              searchMovie={searchMovie}
              question={'Insert your title:'}
            />
          )}
          {nextQuestion && answers[0] == 'genre' && (
            <CheckSearcher
              shearchBtn={shearchBtn}
              goBack={goBack}
              genresDetails={genresDetails}
              setGeneresDetails={setGeneresDetails}
              searchMovie={searchMovie}
              wheelSetting={wheelSetting}
              question={'Choose your genres:'}
            />
          )}
          {nextQuestion && answers[0] == 'director' && (
            <TypeSearcher
              activeInput={focuse}
              shearchBtn={shearchBtn}
              goBack={goBack}
              answers={text}
              wheelSetting={wheelSetting}
              searchMovie={searchMovie}
              director
              question={'Your lovly director is:'}
            />
          )}
        </RoundedBox>
      </a.group>
      {loading && <Loading result={result} />}
    </>
  );
};
