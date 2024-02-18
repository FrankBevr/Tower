import * as THREE from 'three';
useGLTF.preload("./towerSquare_sampleA.glb");

import { Clone, useGLTF } from "@react-three/drei";
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
import { button, useControls } from "leva";
import { useState } from 'react';

export function Tower() {
  const model = useGLTF("./towerSquare_sampleA.glb");
  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(1);
  const [, setTower] = useControls("Tower", () => ({
    row: {
      value: row,
      disabled: true,
    },
    column: {
      value: row,
      disabled: true,
    },
    increase_row: button(() => increase_row()),
    decrease_row: button(() => decrease_row()),
    increase_column: button(() => increase_column()),
    decrease_column: button(() => decrease_column()),
  }));

  const increase_row = () => { }
  const decrease_row = () => { }
  const increase_column = () => { }
  const decrease_column = () => { }

  return (
    <>
      {[...Array(row)].map((_, i) => (
        [...Array(column)].map((_, j) => (
          <group key={`${i}-${j}`}>
            <mesh
              position={[i * 4, 0, j * 4]}
              receiveShadow
              geometry={boxGeometry}
              scale={[4, 0.2, 4]}
              material={floorMaterial}
            >
            </mesh>
            <Clone object={model.scene} scale={0.5} position-x={i * 4} position-z={j * 4} />
          </group>
        ))
      ))}
    </>
  );
}
