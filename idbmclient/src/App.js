import './App.css';
import axios from 'axios';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import { Ground } from './components/partials/Ground';
import { Scene } from './components/Scene';

extend({ UnrealBloomPass });

const App = () => {
  const logOnce = useRef(true);

  useEffect(() => {
    // if (logOnce.current) {
    //   axios.get('https://localhost:7089/Movies').then((r) => {
    //     console.log(r.data), console.log(JSON.parse(r.data[10].actors.replaceAll("'", '"')));
    //   });
    //   logOnce.current = false;
    // }
  }, []);

  return (
    <Canvas camera={{ position: [0.5, 1, 400], fov: 60 }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 30]} />
      <Suspense fallback={null}>
        <Effects disableGamma>
          <unrealBloomPass mipmapBlur strength={2} radius={0.6} />
        </Effects>

        <ambientLight intensity={1.9} />

        <Scene />
        <Ground position={[0, -1, 0]} />
      </Suspense>
    </Canvas>
  );
};

export default App;
