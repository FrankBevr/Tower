import * as THREE from 'three';
useGLTF.preload("./towerSquare_sampleA.glb");

import { Clone, useGLTF } from "@react-three/drei";
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });

export function Tower() {
  const model = useGLTF("./towerSquare_sampleA.glb");
  return (
    <>
      <mesh
        position={[0, 0.0, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial}
      >
      </mesh>
      <Clone object={model.scene} scale={0.5} />
    </>
  );
}
