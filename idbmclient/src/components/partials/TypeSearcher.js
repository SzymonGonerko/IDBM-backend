import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { InsertTitle } from './InsertTitle.js';
import { Question } from './Question.js';
import { ActionButton } from './ActionButton.js';
import { useSearch } from '../../hook/useSearch.js';
import { PortalList } from './PortalList.js';

export const TypeSearcher = (props) => {
  const { goBack, answers, searchMovie, shearchBtn, activeInput, question, wheelSetting } = props;
  const {getSomeHints} = useSearch()

  const [onHoverBack, setOnHoverBack] = useState(false);
  const [onHoverSearch, setOnHoverSearch] = useState(false);

  const { back, search, insert } = useSpring({
    back: onHoverBack ? 1 : 0,
    search: onHoverSearch ? 1 : 0,
    insert: activeInput ? 1 : 0,
    config: { tension: 1200, friction: 100, precision: 0.00001 }
  });
  const searchColor = search.to([0, 1], ['#42593e', '#3d5e38']);
  const backColor = back.to([0, 1], ['#62451c', '#64471e']);
  const inputColor = insert.to([0, 1], ['#494949', '#495050']);
  const [timer, setTimer] = useState(2)
  const [hints, setHints] = useState([])
  const [semarator, setSeparator] = useState("|")

  useEffect(() => {
    if (timer == -2 && answers.length > 1) {
      getSomeHints(answers).then(r => {
        setHints(() => {
          const newState = r.map((el) => {
                return { item: el, isSelected: false };
              });
              return newState;
            });
      })
    }
  }, [timer])

  useEffect(() => {
    wheelSetting(undefined)
    const firstId = setInterval(() => {
      setTimer(p => p-1)
    }, [500])
    const secondId = setInterval(() => {
      setSeparator(p => p == "|" ? "" : "|")
    }, 500)
    return () => {
      clearInterval(firstId, secondId)
      wheelSetting(8)
    }
  }, [])


  useEffect(() => setTimer(0), [answers])

  return (
    <>
      <Question position={[-1.2, 0.8, 0.1]} args={[1.8, 0.28, 0.2]}>{question}</Question>
      <PortalList searchMovie={searchMovie} position={[0, -0.2, 0]} data={hints} setParentData={setHints} wheelSetting={wheelSetting}/>
      <InsertTitle color={inputColor} word={activeInput ? [answers, semarator] : answers} />
      <ActionButton
        onClick={goBack}
        onPointerOver={() => setOnHoverBack(true)}
        onPointerOut={() => setOnHoverBack(false)}
        color={backColor}
        z={0.6}
        position={[-1.6, -1.1, -0.5]}
      >
        Back
      </ActionButton>
      <ActionButton
        color={searchColor}
        onPointerOver={() => setOnHoverSearch(true)}
        onPointerOut={() => setOnHoverSearch(false)}
        position={[1.6, -1.1, -0.5]}
        onClick={searchMovie}
        z={shearchBtn}
      >
        Search
      </ActionButton>
    </>
  );
};
