import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useContract, useProvider } from 'wagmi'
import { address, abi } from '../artifacts/PlatziPunks'

type NFTs = string[] | undefined

export default function useNFTs (): NFTs {
  const [data, setData] = useState<NFTs>()
  const owner = useAccount()
  const navigate = useNavigate()
  const provider = useProvider()
  const contract = useContract({ address, abi, signerOrProvider: provider })

  const getNFTs = useCallback(async () => {
    const balance: BigNumber = await contract?.balanceOf(owner.address)

    if (balance.isZero()) {
      setData([])
    } else {
      const tokens: BigNumber[] = await Promise.all(
        Array(balance.toNumber()).fill(undefined).map((_, index) => {
          return contract?.tokenOfOwnerByIndex(owner.address, index)
        })
      )
      const images: string[] = await Promise.all(
        tokens.map((dna) => contract?.imageByDNA(dna))
      )

      setData(images)
    }
  }, [contract, owner.address])

  useEffect(() => {
    if (owner.isConnected) {
      getNFTs()
        .catch(error => console.error(error))
    } else {
      navigate('/', { replace: true })
    }
  }, [getNFTs, navigate, owner.isConnected])

  return data
}
