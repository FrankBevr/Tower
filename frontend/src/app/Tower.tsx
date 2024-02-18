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
  const [towerLevel, setTowerLevel] = useState(1);
  const [, setTower] = useControls("Tower", () => ({
    towerLevel: {
      value: towerLevel,
      disabled: true,
    },
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
    level_all_tower_up: button(() => level_all_tower_up()),

  }), [row, column, towerLevel])

  const increase_row = () => {
    setRow(row + 1);
    setTower({ row: row })
  }
  const decrease_row = () => {
    if (row > 0) {
      setRow(row - 1)
      setTower({ row: row })
    }
  };
  const increase_column = () => {
    setColumn(column + 1);
    setTower({ column: column })
  }
  const decrease_column = () => {
    if (column > 0) {
      setColumn(column - 1);
      setTower({ column: column })
    }
  }
  const level_all_tower_up = () => {
    if (towerLevel <= 6) {
      setTowerLevel(towerLevel + 1);
      setTower({ towerLevel: towerLevel })
    }
  }

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
            <Clone object={model.scene} scale={0.5 * towerLevel} position-x={i * 4} position-z={j * 4} />
          </group>
        ))
      ))}
    </>
  );
}
