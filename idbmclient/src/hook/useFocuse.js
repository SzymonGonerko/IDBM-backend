import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { a } from '@react-spring/three';

const alphabet =
  'abcdefghijklmnopqrstuvwxyzżółćźąęń1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZŻÓŁĆŹĄĘŃ-:)()"?!&+=@ ';

export const useFocuse = () => {
  const [focuse, setFocuse] = useState(false);
  const [text, setText] = useState('');
  const { color } = useSpring({
    color: focuse ? 1 : 0,
    config: { mass: 1, tension: 1200, friction: 100, precision: 0.00001 }
  });
  const colorInput = color.to([0, 1], ['#494949', '#495050']);
  const [enter, setEnter] = useState(false);

  const handleFocuse = (e) => {
    const [...arr] = e.intersections;
    let isClickedBoard = arr.some((el) => el.object.name == 'board');
    let isClickedInput = arr.some((el) => el.object.name == 'input');
    if (isClickedBoard && isClickedInput) {
      setFocuse(true);
      const arr = [...alphabet];
      document.onkeydown = (e) => {
        if (arr.includes(e.key)) {
          setText((p) => p + e.key);
        }
        if (e.key == 'Backspace') {
          setText((p) => p.slice(0, -1));
        }
        if (e.key == 'Enter') {
          setEnter((p) => !p);
        }
      };
    } else {
      setFocuse(false);
      document.onkeydown = () => undefined;
    }
  };

  return { handleFocuse, colorInput, enter, text, focuse, setText };
};
