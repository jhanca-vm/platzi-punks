import { ethers } from 'hardhat'

const chainlink = new Set([
  process.env.CHAINLINK_VRF_COORDINATOR,
  process.env.CHAINLINK_SUBSCRIPTION_ID,
  process.env.CHAINLINK_KEY_HASH
])

async function main (): Promise<void> {
  if (chainlink.has(undefined)) {
    throw new Error('Required environment variables are not defined')
  }

  const chainlinkIterator = chainlink.values()
  const PlatziPunksFactory = await ethers.getContractFactory('PlatziPunks')
  const PlatziPunks = await PlatziPunksFactory.deploy(
    chainlinkIterator.next().value,
    chainlinkIterator.next().value,
    chainlinkIterator.next().value,
    10000
  )

  await PlatziPunks.deployed()

  console.log(`PlatziPunks is deployed at: ${PlatziPunks.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
