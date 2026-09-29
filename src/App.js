import * as THREE from 'three';
import React, { useEffect , useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import { MeshLine, MeshLineMaterial } from './MeshLine';
import { Scene } from './Scene';
import { palettes, settings } from './palettes';
import './styles.css';


extend({ MeshLine, MeshLineMaterial });

export function App() {
  const [counts, setCounts] = useState({
    dust: settings.dustCount,
    storm: settings.stormCount,
  });

  useEffect(() => {
    const gui = new GUI();
    gui.add(settings, 'palette', Object.keys(palettes)).name('palette');
    gui
      .add(settings, 'dustCount', 0, 10000, 100)
      .name('dust count')
      .onFinishChange((v) => setCounts((c) => ({ ...c, dust: v })));
    gui
      .add(settings, 'stormCount', 0, 3000, 50)
      .name('storm count')
      .onFinishChange((v) => setCounts((c) => ({ ...c, storm: v })));
    return () => gui.destroy();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl, size, camera }) => {
          if (size.width < 600) camera.position.z = 45;
          gl.setClearColor(new THREE.Color('#020207'));
        }}
      >
        <Scene dustCount={counts.dust} stormCount={counts.storm} />
      </Canvas>
    </div>
  );
}