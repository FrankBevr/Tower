import { SubstrateDeployment } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'
import abiGreeter from "@inkathon/contracts/deployments/greeter/greeter.json";
import { address as addressGreeter } from "@inkathon/contracts/deployments/greeter/development";

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Greeter = 'greeter',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const deployments: SubstrateDeployment[] = []

  deployments.push({
    contractId: "greeter",
    networkId: "development",
    abi: abiGreeter,
    address: addressGreeter,
  });

  return deployments
}
