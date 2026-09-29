import React, { useEffect, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Planet = () => {
  const gltf = useLoader(GLTFLoader, '/models/granny.glb'); // your real filename

  const mixer = useMemo(() => new AnimationMixer(gltf.scene), [gltf]);

  useEffect(() => {
    console.log('animations:', gltf.animations); // check this in the console
    if (gltf.animations.length) {
      mixer.clipAction(gltf.animations[0]).play(); // loops forever by default
    }
    return () => mixer.stopAllAction();
  }, [gltf, mixer]);

  useFrame((_, delta) => mixer.update(delta)); // without this, it stays frozen

  return <primitive object={gltf.scene} scale={10} />;
};