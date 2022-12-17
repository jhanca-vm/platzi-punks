import type { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import Wallet from './Wallet'

const Header: FunctionComponent = () => {
  const links = [['Home', '/'], ['Punks', '/punks']]
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Flex
        as='header'
        color='gray.600'
        minH='60px'
        py={2}
        px={{ base: 0, sm: 4 }}
        borderBottom={1}
        borderBottomStyle='solid'
        borderBottomColor='gray.200'
      >
        <Container
          as={Flex}
          alignItems='center'
          justifyContent='space-between'
          maxW='6xl'
        >
          <IconButton
            size='sm'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={5} />}
            aria-label='Open Menu'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems='center'>
            <Flex alignItems='center'>
              <Image src='/images/logo.svg' width='80px' />
              <Heading size='md' color='purple' mt={0.2} ml={1}>Punks</Heading>
            </Flex>
            <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map(([name, to]) => (
                <Link to={to} key={name}>{name}</Link>
              ))}
            </HStack>
          </HStack>
          <Wallet />
        </Container>
      </Flex>
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} pt={4} spacing={4}>
            {links.map(([name, to]) => (
              <Link to={to} key={name} onClick={onClose}>{name}</Link>
            ))}
          </Stack>
        </Box>
      )}
    </>
  )
}

export default Header
