'use client'

import { useEffect } from 'react'

import { contractQuery, decodeOutput, useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { HomePageTitle } from '@/app/components/home-page-title'
import { ChainInfo } from '@/components/web3/chain-info'
import { ConnectButton } from '@/components/web3/connect-button'
import { ContractIds } from '@/deployments/deployments'

export default function HomePage() {
  const { api } = useInkathon();
  const { contract: contractGreeter } = useRegisteredContract(
    ContractIds.Greeter,
  );

  const getGreeter = async () => {
    if (!contractGreeter || !api) return;
    const result = await contractQuery(api, "", contractGreeter, "greet");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractGreeter,
      "greet",
    );
    console.log(output)
    if (isError) throw new Error(decodedOutput);
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
    </>
  )
}
