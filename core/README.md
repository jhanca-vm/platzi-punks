Remember to add the following environment variables in the `.env` file:

```
DEPLOYER_SIGNER_PRIVATE_KEY=""
INFURA_PROJECT_ID=""
CHAINLINK_SUBSCRIPTION_ID=""
CHAINLINK_VRF_COORDINATOR=""
CHAINLINK_KEY_HASH=""
```

Try running some of the following tasks:

```shell
pnpm hardhat help
pnpm hardhat test
REPORT_GAS=true pnpm hardhat test
pnpm hardhat compile
pnpm hardhat run scripts/deploy.ts
```
