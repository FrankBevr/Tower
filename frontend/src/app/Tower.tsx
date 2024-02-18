import * as THREE from 'three';
useGLTF.preload("./towerSquare_sampleA.glb");
useGLTF.preload("./towerSquare_sampleB.glb");
useGLTF.preload("./towerSquare_sampleC.glb");
useGLTF.preload("./towerSquare_sampleD.glb");
useGLTF.preload("./towerSquare_sampleE.glb");

import { Clone, useGLTF } from "@react-three/drei";
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
import { button, useControls } from "leva";
import { useState } from 'react';

export function Tower() {
  const towerA = useGLTF("./towerSquare_sampleA.glb");
  const towerB = useGLTF("./towerSquare_sampleB.glb");
  const towerC = useGLTF("./towerSquare_sampleC.glb");
  const towerD = useGLTF("./towerSquare_sampleD.glb");
  const towerE = useGLTF("./towerSquare_sampleE.glb");

  const towerModels = [towerA, towerB, towerC, towerD, towerE];

  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(1);
  const [towerLevel, setTowerLevel] = useState(1);
  const [towerModel, setTowerModel] = useState(towerModels[0]);
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [, setTower] = useControls("Tower", () => ({
    upgradeLevel: {
      value: upgradeLevel,
      disabled: true,
    },
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
    upgrade_all_tower: button(() => upgrade_all_tower()),
  }), [row, column, towerLevel, towerModel, upgradeLevel])

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
    setTower({ towerLevel: towerLevel })
    setTower({ upgradeLevel: upgradeLevel })
  }
  const upgrade_all_tower = () => {
    if (upgradeLevel < towerModels.length - 1) {
      setUpgradeLevel(upgradeLevel + 1);
      setTowerModel(towerModels[upgradeLevel]);
      setTower({ towerLevel: towerLevel })
      setTower({ upgradeLevel: upgradeLevel })
    } else if (upgradeLevel !== 4) {
      setTowerLevel(1);
      setTower({ towerLevel: towerLevel })
      setTower({ upgradeLevel: upgradeLevel })
    } else {
      setTower({ towerLevel: towerLevel })
      setTower({ upgradeLevel: upgradeLevel })
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
            <Clone object={towerModel.scene} scale={0.5 * towerLevel} position-x={i * 4} position-z={j * 4} />
          </group>
        ))
      ))}
    </>
  );
}
