import React, { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { CustomRoundedBox } from './CustomRoundedBox.js';
import { Text } from '@react-three/drei';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import { PortalBox } from './PortalBox.js';
import { a } from '@react-spring/three';

export const New = ({data, setParentData, wheelSetting}) => {
    const [jj, setJj] = useState(0);
    const [boxPosition, setBoxPosition] = useState([]);
    
    const { pos } = useSpring({
      pos: jj,
      config: { mass: 1, tension: 200, friction: 100, precision: 0.00001 }
    });
    const movee = pos.to([0, 1], [-3.5, -2.5]);


    const onWheel = (e) => {
        if (e.deltaY < 0) {
          setJj((p) => {
            if (p <= -2) return p;
            else {
              return p - 1;
            }
          });
        } else {
          setJj((p) => {
            if (p >= 2) return p;
            else {
              return p + 1;
            }
          });
        }
      };

    useEffect(() => {
        wheelSetting(undefined)
        const x = Math.trunc(data.length / 3);
        const arr = [];
        let bb = 0.5;
        while (arr.length < data.length) {
          for (let i = 0; i < x; i++) {
            arr.push([i * 1.2, bb, 0.3]);
          }
          bb = bb - 0.5;
        }
        setBoxPosition(arr);
        document.addEventListener('mousewheel', onWheel);
        return () => document.removeEventListener('mousewheel', onWheel);
    }, [])


    const test = (event, i) => {
        event.stopPropagation();
        setParentData((p) => {
          const [...arr] = p;
          arr[i].isSelected = !arr[i].isSelected;
          return arr;
        });
      };



    return <>      
    <PortalBox>
    <a.group position={[-3.5, 0.1, 0]} position-x={movee}>
      {data?.map((el, i) => {
        return (
          <CustomRoundedBox
            key={i}
            color={[0.06, 0.06, 0.06]}
            args={[1, 0.28, 0.2]}
            position={boxPosition[i]}
            onClick={(e) => test(e, i)}
            isSelected={data[i]?.isSelected}
            portal
            onHover
          >
            <Text
              color={'black'}
              font={playBold}
              position={[0, 0, 0.11]}
              fontSize={0.19}
              letterSpacing={-0.06}
            >
              {el?.genre}
            </Text>
          </CustomRoundedBox>
        );
      })}
    </a.group>
  </PortalBox></>
}