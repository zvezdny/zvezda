import React, { Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import { Sparks } from './Sparks';
import { SparkStorm } from './SparkStorm';
import { SpaceDust } from './SpaceDust';
import { Planet } from './Planet';
import { Controls } from './Controls';

const colors = {
  malevolentIllusion: ['#c06995', '#de77c7', '#df86df', '#d998ee', '#ceadf4', '#c6bff9'],
  sunnyRainbow: ['#fbe555', '#fb9224', '#f45905', '#be8abf', '#ffeed0', '#feff89'],

  toxicNebula: ['#0b3d2e', '#14a06f', '#39ff88', '#b6ff3b', '#f4ffb0', '#7af5e0'],
  deepOcean: ['#03045e',
    '#0077b6', '#00b4d8', '#48cae4', '#90e0ef', '#caf0f8'],
  emberFall: ['#370617',
    '#9d0208', '#dc2f02', '#f48c06', '#ffba08', '#ffe8a3'],
  cyberpunkNeon: ['#ff00c8', '#ff2079', '#7d12ff', '#00e5ff', '#00ffa3', '#f9f871'],
  auroraBorealis: ['#0d1b2a', '#1b998b', '#2de1a2', '#80ffdb', '#a78bfa', '#e0aaff'],
  candyCosmos: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#070808', '#f368e0'],
  voidGold: ['#0a0a0f', '#2b2d42', '#8d99ae', '#edf2f4', '#ffd166', '#ef8354'],
  frostbite:     ['#e0fbfc', '#c2dfe3', '#9db4c0', '#5c6b73', '#7ae7ff', '#ffffff'],
};

export function Scene() {
  return (
    <Suspense fallback={null}>
      <>
        <Controls />
        <pointLight distance={100} intensity={10} color="white" />
        <ambientLight intensity={1} />
        <group>
          {/* <Planet /> */}
          <SpaceDust count={3000} />
          <Sparks count={20} />
          <SparkStorm count={1000} />
        </group>
      </>
    </Suspense>
  );
}