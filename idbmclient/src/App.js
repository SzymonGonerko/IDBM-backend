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
  return (
    <Canvas camera={{ position: [0.5, 1, 400], fov: 60 }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 30]} />
      <ambientLight intensity={1.9} />
      <Suspense fallback={null}>
        <Effects multisamping={0.2} stencilBuffer disableGamma>
          <unrealBloomPass
            threshold={0.089}
            mipmapBlur
            strength={2}
            radius={0.6}
            args={[undefined, 1.1, 1, 0]}
          />
        </Effects>

        <Scene />
        <Ground position={[0, -1, 0]} />
      </Suspense>
    </Canvas>
  );
};

export default App;
