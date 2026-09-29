import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';
import {
  createAttractor,
  updateAttractor,
  dadrasAttractor,
  aizawaAttractor,
  arneodoAttractor,
  dequanAttractor,
  lorenzAttractor,
  lorenzMod2Attractor,
} from './attractor';
import { palettes, settings } from './palettes';

const simulation = () =>
  Random.pick([
    dadrasAttractor,
    aizawaAttractor,
    arneodoAttractor,
    dequanAttractor,
    lorenzAttractor,
    lorenzMod2Attractor,
  ]);

function StormLine({ radius, simulation, width, colorIndex }) {
  const line = useRef();
  const material = useRef();
  const lastPalette = useRef(settings.palette);

  const [positions, currentPosition] = useMemo(() => createAttractor(5), []);

  useFrame(() => {
    // Recolor only when the palette changes
    if (material.current && lastPalette.current !== settings.palette) {
      material.current.uniforms.color.value.set(
        palettes[settings.palette][colorIndex]
      );
      lastPalette.current = settings.palette;
    }

    if (line.current) {
      const nextPosition = updateAttractor(
        currentPosition,
        radius,
        simulation,
        0.005
      );
      line.current.advance(nextPosition);
    }
  });

  return (
    <mesh>
      <meshLine ref={line} attach="geometry" points={positions} />
      <meshLineMaterial
        ref={material}
        transparent
        lineWidth={width}
        color={palettes[settings.palette][colorIndex]}
      />
    </mesh>
  );
}

export function SparkStorm({ count, radius = 20 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => ({
        colorIndex: Random.rangeFloor(0, 6), // fixed slot in the palette
        width: Random.range(0.1, 0.9),
        speed: Random.range(0.01, 0.2),
        simulation: simulation(),
        radius: Random.range(2, 2) * radius,
      })),
    [count, radius]
  );

  return (
    <group>
      {lines.map((props, index) => (
        <StormLine key={index} {...props} />
      ))}
    </group>
  );
}