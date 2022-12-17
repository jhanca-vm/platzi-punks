import type { FunctionComponent } from 'react'
import { useAccount } from 'wagmi'
import { Badge, Flex, Image } from '@chakra-ui/react'

const FallbackNFT: FunctionComponent = () => {
  const { isDisconnected } = useAccount()

  return (
    <Flex flex={1} direction='column' align='center'>
      <Image src='https://avataaars.io' mt={{ base: -4, md: -16 }} />
      {isDisconnected && <Badge mt={2}>Wallet desconectada</Badge>}
    </Flex>
  )
}

export default FallbackNFT
