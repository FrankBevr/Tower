import { SubstrateDeployment } from '@scio-labs/use-inkathon'
import { env } from '@/config/environment'

import { address as addressGreeter } from '@inkathon/contracts/deployments/greeter/development'
import abiGreeter from '@inkathon/contracts/deployments/greeter/greeter.json'

import { address as addressTowerOne } from '@inkathon/contracts/deployments/tower_one/development'
import abiTowerOne from '@inkathon/contracts/deployments/tower_one/tower_one.json'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Greeter = 'greeter',
  TowerOne = 'tower_one',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const deployments: SubstrateDeployment[] = []

  deployments.push({
    contractId: 'greeter',
    networkId: 'development',
    abi: abiGreeter,
    address: addressGreeter,
  })

  deployments.push({
    contractId: 'tower_one',
    networkId: 'development',
    abi: abiTowerOne,
    address: addressTowerOne
  })

  return deployments
}
