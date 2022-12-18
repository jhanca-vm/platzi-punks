import type { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useAccount, useContract, useProvider } from 'wagmi'
import { address, abi } from '../artifacts/PlatziPunks'

export default function useLastNFT (balance: BigNumber): string | undefined {
  const [data, setData] = useState<string | undefined>()
  const provider = useProvider()
  const contract = useContract({ address, abi, signerOrProvider: provider })
  const owner = useAccount()

  const getNFT = useCallback(async (): Promise<void> => {
    const dna: BigNumber = await contract?.tokenOfOwnerByIndex(
      owner.address,
      balance.toNumber() - 1
    )
    const image: string = await contract?.imageByDNA(dna)

    setData(image)
  }, [balance, contract, owner.address])

  useEffect(() => {
    getNFT()
      .catch(error => console.error(error))
  }, [getNFT])

  return data
}
