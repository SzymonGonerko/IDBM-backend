import React, { useState } from 'react';
import { useSpring } from '@react-spring/three';
import { InsertTitle } from './InsertTitle.js';
import { Question } from './Question.js';
import { ActionButton } from './ActionButton.js';

export const TypeSearcher = (props) => {
  const { goBack, answers, searchMovie, shearchBtn, activeInput, question, hints } = props;
  const [onHoverBack, setOnHoverBack] = useState(false);
  const [onHoverSearch, setOnHoverSearch] = useState(false);

  const { back, search, insert } = useSpring({
    back: onHoverBack ? 1 : 0,
    search: onHoverSearch ? 1 : 0,
    insert: activeInput ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const searchColor = search.to([0, 1], ['#42593e', '#3d5e38']);
  const backColor = back.to([0, 1], ['#62451c', '#64471e']);
  const inputColor = insert.to([0, 1], ['#494949', '#495050']);

  return (
    <>
      <Question position={[-1.2, 0.8, 0.1]} args={[1.8, 0.28, 0.2]}>{question}</Question>
      <InsertTitle color={inputColor} word={activeInput ? [answers, '|'] : answers} />
      <ActionButton
        onClick={goBack}
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
        onClick={searchMovie}
        z={shearchBtn}
      >
        Search
      </ActionButton>
    </>
  );
};
