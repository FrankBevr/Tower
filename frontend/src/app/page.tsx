'use client'

import { useEffect } from 'react'

import { ContractIds } from '@/deployments/deployments'
import {
  contractQuery,
  contractTx,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { ConnectButton } from '@/components/web3/connect-button'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import Lights from './Lights'
import TowerContract from '@inkathon/contracts/typed-contracts/contracts/tower_two'

export default function HomePage() {
  const { api, activeAccount } = useInkathon()
  const { contract: contractGreeter } = useRegisteredContract(ContractIds.Greeter)
  const { contract: contractTowerFour } = useRegisteredContract(ContractIds.TowerFour)
  const { typedContract } = useRegisteredTypedContract(ContractIds.TowerOne, TowerContract)


  const getGreeter = async () => {
    if (!contractGreeter || !api) return
    const result = await contractQuery(api, '', contractGreeter, 'greet')
    const { output } = decodeOutput(result, contractGreeter, 'greet')
    console.log(output)
  }

  const getTowerOne = async () => {
    if (!contractTowerFour || !api || !typedContract) return
    const typedResult = await typedContract.query.totalSupply()
    console.log('Result from typed contract: ', typedResult.value.ok?.toString())
  }

  const mintTowerOne = async () => {
    if (!activeAccount || !api || !contractTowerFour) return
    try {
      await contractTx(api, activeAccount.address, contractTowerFour, 'psp34Mintable::mint', {}, [1])
    } catch (error) {
      console.log(error)
    }
  }

  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <button onClick={getGreeter}>Get Greeter</button>
      <button onClick={getTowerOne}>Get total Supply</button>
      <button onClick={mintTowerOne}>mint</button>
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
