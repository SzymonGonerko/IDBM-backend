import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { FontLoader } from 'three-stdlib';
import playBold from '../../assets/fonts/Play-Bold.ttf';
import playRegular from '../../assets/fonts/Play-Regular.ttf';
import playRegularJson from '../../assets/fonts/Play_Regular.json';
import trailers from '../../assets/trailers.mp4';

export const Hero = ({ onClick }) => {
  const font = new FontLoader().parse(playRegularJson);
  const [bloom, setbloom] = useState(0.1);
  const [hovered, hover] = useState(true);
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: trailers,
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true
    })
  );

  useEffect(() => {
    video.play();
  }, [video]);

  useFrame((s) => {
    if (!hovered) {
      setbloom(Math.abs(Math.cos(s.clock.getElapsedTime()) / 5.5) / 2);
    }
    if (hovered && bloom > 1) {
      setbloom((p) => p - 0.02);
    }
  });

  return (
    <>
      <group position={[0, 0.7, 351]}>
        <Text font={playBold} fontSize={2} letterSpacing={-0.06}>
          IDBM
          <meshLambertMaterial color={[0.3, 0.3, 0.3]} transparent opacity={0.6} toneMapped={false}>
            <videoTexture attach="map" args={[video]} />
          </meshLambertMaterial>
        </Text>

        <group position={[-0.08, -0.16, 0]}>
          <Text color={'#888888'} font={playRegular} position={[0.85, -0.75, 0]} fontSize={0.2}>
            Interactive database movies
          </Text>
          <Text color={'#888888'} font={playRegular} position={[0.555, -1, 0]} fontSize={0.2}>
            with +60 000 records!
          </Text>
        </group>

        <group position={[-1.45, -1.05, 0]}>
          <mesh position={[-0.5, -0.06, 0.05]}>
            <textGeometry args={['get start', { font, size: 0.2, height: 0.1 }]} />
            <meshPhysicalMaterial attach="material" color={'black'} />
          </mesh>

          <RoundedBox
            position={[0, 0, 0]}
            onClick={onClick}
            onPointerOver={() => hover(false)}
            onPointerOut={() => hover(true)}
            args={[1.5, 0.4, 0.2]}
          >
            <meshStandardMaterial
              color={[0.05, bloom + 0.1, bloom + 0.1]}
              // emissive={[0.01, 0.35 + bloom, bloom]}
              toneMapped={false}
            />
          </RoundedBox>
        </group>
      </group>
    </>
  );
};
