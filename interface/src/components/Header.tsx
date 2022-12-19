import type { FunctionComponent } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image
} from '@chakra-ui/react'
import Wallet from './Wallet'

const Header: FunctionComponent = () => {
  const { isConnected } = useAccount()

  return (
    <Flex
      as='header'
      color='gray.600'
      minH='60px'
      py={2}
      px={{ base: 0, xl: 4 }}
      borderBottom={1}
      borderBottomStyle='solid'
      borderBottomColor='gray.200'
    >
      <Container
        as={Flex}
        alignItems='center'
        justifyContent='space-between'
        maxW='6xl'
        px={{ base: 0, sm: 4 }}
      >
        <HStack as='nav' spacing={8} alignItems='center'>
          <Link to='/'>
            <Flex alignItems='center' mb={1}>
              <Image src='/images/logo.svg' width='80px' />
              <Heading size='md' color='purple' mt={0.2} ml={1}>Punks</Heading>
            </Flex>
          </Link>
          {isConnected && (
            <Box display={{ base: 'none', sm: 'block' }}>
              <Link to='/punks'>Mis Punks</Link>
            </Box>
          )}
        </HStack>
        <Wallet />
      </Container>
    </Flex>
  )
}

export default Header
