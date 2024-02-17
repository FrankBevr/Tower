'use client'

import { useEffect } from 'react'

import { useInkathon, } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { ConnectButton } from '@/components/web3/connect-button'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import Lights from './Lights'
import LevaGreeter from './components/LevaGreeter'
import LevaTowerFour from './components/LevaTowerFour'

export default function HomePage() {

  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <LevaGreeter />
      <LevaTowerFour />
      <ConnectButton />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Lights />
        <Experience />
      </Canvas>
    </>
  )
}
