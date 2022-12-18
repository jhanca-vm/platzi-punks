import type { BigNumber } from 'ethers'
import { type FunctionComponent, memo } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { Flex, Image, Skeleton } from '@chakra-ui/react'
import useLastNFT from '../hooks/useLastNFT'
import * as contract from '../artifacts/PlatziPunks'

interface PictureProps {
  balance: BigNumber
}

const CustomSkeleton: FunctionComponent = () => (
  <Skeleton
    width='264px'
    height='280px'
    rounded={20}
    mt={{ base: -4, md: -16 }}
  />
)

const Picture = memo(function Picture ({ balance }: PictureProps) {
  const image = useLastNFT(balance)

  if (image === undefined) return <CustomSkeleton />

  return <Image mt={{ base: -8, md: -20 }} src={image} />
})

const NFT: FunctionComponent = () => {
  const { address } = useAccount()
  const { data: balance, isLoading } = useContractRead({
    ...contract,
    functionName: 'balanceOf',
    args: [address],
    watch: true
  })

  if (isLoading) {
    return (
      <Flex flex={1} direction='column' align='center'><CustomSkeleton /></Flex>
    )
  }

  return (
    <Flex flex={1} direction='column' align='center'>
      {Number(balance) === 0
        ? <Image mt={{ base: -8, md: -20 }} src='https://avataaars.io/' />
        : <Picture balance={balance as BigNumber} />
      }
    </Flex>
  )
}

export default NFT
