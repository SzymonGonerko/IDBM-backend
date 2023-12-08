import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { ActionButton } from './ActionButton.js';
import { PortalList } from './PortalList.js';
import { Question } from './Question.js';

export const CheckSearcher = (props) => {
  const { goBack, wheelSetting, searchMovie, genresDetails, setGeneresDetails } = props;
  const [onHoverBack, setOnHoverBack] = useState(false);
  const [onHoverSearch, setOnHoverSearch] = useState(false);

  const { back, search } = useSpring({
    back: onHoverBack ? 1 : 0,
    search: onHoverSearch ? 1 : 0,
    config: { tension: 200, friction: 100, precision: 0.00001 }
  });
  const searchColor = search.to([0, 1], ['#42593e', '#3d5e38']);
  const backColor = back.to([0, 1], ['#62451c', '#64471e']);

  useEffect(() => {
    wheelSetting(undefined);
  }, []);

  const onGoBack = () => {
    goBack();
    wheelSetting(8);
  };

  return (
    <>
      <PortalList position={[0, -0.2, 0]} data={genresDetails} setParentData={setGeneresDetails} />
      <Question position={[-1.2, 0.8, 0.1]} args={[1.8, 0.28, 0.2]}>
        Choose your genres:
      </Question>

      <ActionButton
        onClick={onGoBack}
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
        onClick={searchMovie}
        position={[1.6, -1.1, -0.5]}
        z={0.6}
      >
        Search
      </ActionButton>
    </>
  );
};
