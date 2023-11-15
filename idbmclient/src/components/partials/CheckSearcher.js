import React, { useEffect, useState, useContext } from 'react';
import { useSpring } from '@react-spring/three';
import { ActionButton } from './ActionButton.js';
import { New } from './New.js';



export const CheckSearcher = (props) => {
  const { goBack, wheelSetting, searchMovie, genresDetails, setGeneresDetails } = props;
  const [onHoverBack, setOnHoverBack] = useState(false);
  const [onHoverSearch, setOnHoverSearch] = useState(false);

  const { back, search} = useSpring({
    back: onHoverBack ? 1 : 0,
    search: onHoverSearch ? 1 : 0,
    config: { mass: 1, tension: 200, friction: 100, precision: 0.00001 }
  });
  const searchColor = search.to([0, 1], ['#42593e', '#3d5e38']);
  const backColor = back.to([0, 1], ['#62451c', '#64471e']);


  const onGoBack = () => {
    goBack();
    wheelSetting(8);
  };

  const test2 = async (e) => {
    e.stopPropagation()
    searchMovie()
  }

  return (
    <>
    <New wheelSetting={wheelSetting} data={genresDetails} setParentData={setGeneresDetails}/>

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
        onClick={(e) => test2(e)}
        position={[1.6, -1, -0.5]}
        z={0.6}
      >
        Search
      </ActionButton>
    </>
  );
};
