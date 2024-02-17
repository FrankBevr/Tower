import { OrbitControls } from "@react-three/drei";
import { Tower } from "./Tower";

export default function Experience() {
  return (
    <>
      <color args={['#bdedfc']} attach="background" />
      <OrbitControls makeDefault />
      <Tower />
    </>
  );
}
