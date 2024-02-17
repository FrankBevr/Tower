import * as THREE from 'three';
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
export function Tower() {
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
    </>
  );
}
