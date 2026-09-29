import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import { MeshLine, MeshLineMaterial } from './MeshLine';
import { Scene } from './Scene';
import { palettes, settings } from './palettes';
import './styles.css';

extend({ MeshLine, MeshLineMaterial });

export function App() {
  useEffect(() => {
    const gui = new GUI();
    gui.add(settings, 'palette', Object.keys(palettes)).name('palette');
    return () => gui.destroy();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl, size, camera }) => {
          if (size.width < 600) {
            camera.position.z = 45;
          }
          gl.setClearColor(new THREE.Color('#020207'));
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}