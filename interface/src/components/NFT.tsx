import type { FunctionComponent } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { Flex, Image, Spinner } from '@chakra-ui/react'
import * as contract from '../artifacts/PlatziPunks'
import FallbackNFT from './FallbackNFT'

const NFT: FunctionComponent = () => {
  const { address } = useAccount()
  const { data: tokens } = useContractRead({
    ...contract,
    functionName: 'balanceOf',
    args: [address],
    watch: true
  })

  if (tokens === undefined || Number(tokens) === 0) return <FallbackNFT />

  const Picture: FunctionComponent<{ dna: unknown }> = ({ dna }) => {
    const { data, isLoading } = useContractRead({
      ...contract,
      functionName: 'imageByDNA',
      args: [dna]
    })

    if (isLoading) return <Spinner color='green.400' size='xl' />

    return <Image src={String(data)} mt={{ base: -8, md: -20 }} />
  }

  const LastNFT: FunctionComponent = () => {
    const { data, isLoading } = useContractRead({
      ...contract,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, Number(tokens) - 1]
    })

    if (isLoading) return <Spinner color='green.400' size='xl' />

    return <Picture dna={data} />
  }

  return (
    <Flex flex={1} direction='column' align='center'>
      <LastNFT />
    </Flex>
  )
}

export default NFT
