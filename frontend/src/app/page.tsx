'use client'

import { useEffect } from 'react'

import { ContractIds } from '@/deployments/deployments'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { ConnectButton } from '@/components/web3/connect-button'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import Lights from './Lights'

export default function HomePage() {
  const { api } = useInkathon()
  const { contract: contractGreeter } = useRegisteredContract(ContractIds.Greeter)

  const getGreeter = async () => {
    if (!contractGreeter || !api) return
    const result = await contractQuery(api, '', contractGreeter, 'greet')
    const { output, isError, decodedOutput } = decodeOutput(result, contractGreeter, 'greet')
    console.log(output)
    if (isError) throw new Error(decodedOutput)
  }
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <button onClick={getGreeter}>Get Greeter</button>
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
