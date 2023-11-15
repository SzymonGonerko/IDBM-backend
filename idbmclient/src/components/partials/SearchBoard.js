import React, { useEffect, useState, useRef } from 'react';
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
import { useSearch } from '../../hook/useSearch';

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
  closeWindow,
  openWindow,
  close,
  wheelSetting
}) => {
  const texture = useTexture(back)
  const {getInitData} = useSearch()
  const { handleFocuse, text, focuse, enter } = useFocuse();
  const [answers, setAnswers] = useState(['', text]);
  const [initData, setInitData] = useState()
  const [nextQuestion, setNextQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(1)
  const { scale, showSearchBtn, filters } = useSpring({
    showSearchBtn: text.length > 0 ? 1 : 0,
    filters: filter,
    scale: close ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const scaleBoard = scale.to([0, 1], [1, 0]);
  const shearchBtn = showSearchBtn.to([0, 1], [0, 0.6]);
  const testing = filters.to([0, 1, 2], ["#465046", "#645050", "#505064"]);
  const [result, setResult] = useState(false);
  const [genresDetails, setGeneresDetails] = useState(genres);


  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.19, 0.375);

  useEffect(() => {
    setGeneresDetails((p) => {
      const [...arr] = p;
      const newState = arr.map((el) => {
            return { genre: el, isSelected: false };
          });
          return newState;
        });
    getInitData().then(r => {
      let newState = {};
      Object.entries(r).forEach(([key, value]) => {
        newState[key] = value.map(el => {return {genre: el, isSelected: false}})
      })
      setInitData(newState)
    })
  }, [])

  const selectFirstAnswer = (arg) => {
    setAnswers((p) => {
      const [...newState] = p;
      newState[0] = arg;
      return newState;
    });
    switch (arg) {
      case 'title': return setFilter(0)
      case 'genre': return setFilter(1)
      case 'director': return setFilter(2)
    }
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
    if (answers[0] == 'genre') {
      closeWindow();
      setLoading(true);
      handleSearchByGenre(genresDetails).then((number) => {
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
              activeInput={focuse}
              shearchBtn={shearchBtn}
              goBack={goBack}
              answers={text}
              searchMovie={searchMovie}
              hints={initData.titles}
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
            />
          )}
          {nextQuestion && answers[0] == 'director' && (
            <TypeSearcher
              activeInput={focuse}
              shearchBtn={shearchBtn}
              goBack={goBack}
              answers={text}
              hints={initData.directors}
              searchMovie={searchMovie}
              question={'Your lovly director is:'}
            />
          )}
        </RoundedBox>
      </a.group>
      {loading && <Loading result={result} />}
    </>
  );
};
