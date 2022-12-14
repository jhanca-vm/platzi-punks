import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config()

const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY
const projectId = process.env.INFURA_PROJECT_ID

if (privateKey === undefined || projectId === undefined) {
  throw new Error('Required environment variables are not defined')
}

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  }
}

export default config
