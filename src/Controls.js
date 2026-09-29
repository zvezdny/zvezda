import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

export function Controls() {
  const { camera, gl, size } = useThree();
  const controls = useRef();

  useEffect(() => {
    const c = new TrackballControls(camera, gl.domElement);

    c.rotateSpeed = 2;             // how fast dragging spins the scene
    c.zoomSpeed = 0.3;             // smaller = gentler zoom steps
    c.dynamicDampingFactor = 0.04; // smoothness/inertia (lower = floatier)
    c.staticMoving = false;        // keep damping on
    c.noPan = true;                // remove if you want right-click panning
    c.minDistance = 5;             // don't zoom inside the storm
    c.maxDistance = 150;           // don't zoom out into nothing

    controls.current = c;
    return () => c.dispose();
  }, [camera, gl]);

  useEffect(() => {
    controls.current?.handleResize(); // keep it correct when the window resizes
  }, [size]);

  useFrame(() => controls.current?.update());

  return null;
}