import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  const { abi, wasm } = await getDeploymentData('tower')
  const tower = await deployContract(api, account, abi, wasm, 'default', [])

  await writeContractAddresses(chain.network, {
    tower,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
