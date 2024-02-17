import { SubstrateDeployment } from '@scio-labs/use-inkathon'
import { env } from '@/config/environment'

import { address as addressGreeter } from '@inkathon/contracts/deployments/greeter/development'
import abiGreeter from '@inkathon/contracts/deployments/greeter/greeter.json'

import { address as addressTowerOne } from '@inkathon/contracts/deployments/tower_one/development'
import abiTowerOne from '@inkathon/contracts/deployments/tower_one/tower_one.json'

import { address as addressTowerTwo } from '@inkathon/contracts/deployments/tower_two/development'
import abiTowerTwo from '@inkathon/contracts/deployments/tower_two/tower_two.json'

import { address as addressTowerThree } from '@inkathon/contracts/deployments/tower_three/development'
import abiTowerThree from '@inkathon/contracts/deployments/tower_three/tower_three.json'

import { address as addressTowerFour } from '@inkathon/contracts/deployments/tower_four/development'
import abiTowerFour from '@inkathon/contracts/deployments/tower_four/tower_four.json'


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

  deployments.push({
    contractId: 'tower_two',
    networkId: 'development',
    abi: abiTowerTwo,
    address: addressTowerTwo
  })

  deployments.push({
    contractId: 'tower_three',
    networkId: 'development',
    abi: abiTowerThree,
    address: addressTowerThree
  })

  deployments.push({
    contractId: 'tower_four',
    networkId: 'development',
    abi: abiTowerFour,
    address: addressTowerFour
  })

  return deployments
}
