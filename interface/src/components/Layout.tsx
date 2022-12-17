import type { FunctionComponent } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Box, Container, Flex, Link, Stack, Text } from '@chakra-ui/react'
import Header from './Header'

const Layout: FunctionComponent = () => (
  <>
    <Flex
      direction='column'
      justifyContent='space-between'
      minH='100vh'
      maxW='7xl'
      mx='auto'
      px={4}
    >
      <Header />
      <Box as='main' maxW='6xl' mx='auto' p={4}>
        <Outlet />
      </Box>
      <Box
        as='footer'
        color='gray.600'
        borderTopWidth={1}
        borderTopStyle='solid'
        borderTopColor='gray.300'
        py={4}
      >
        <Container as={Stack} maxW='6xl'>
          <Text>
            © {new Date().getFullYear()} Original designs by
            <Link ml={1} href="https://twitter.com/pablostanley" isExternal>
              Pablo Stanley
            </Link>
          </Text>
        </Container>
      </Box>
    </Flex>
    <ScrollRestoration />
  </>
)

export default Layout
