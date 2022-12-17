import type { FunctionComponent } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { Link } from 'react-router-dom'
import { Button, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import useMint from '../hooks/useMint'
import FallbackNFT from '../components/FallbackNFT'
import NFT from '../components/NFT'

const Home: FunctionComponent = () => {
  const { isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { isLoading, write } = useMint()

  return (
    <Stack
      align='center'
      spacing={{ base: 8, md: 10 }}
      py={16}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
        >
          <Text
            as='span'
            position='relative'
            _after={{
              content: "''",
              width: 'full',
              height: '30%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'green.400',
              zIndex: -1
            }}
          >
            Un PlatziPunk
          </Text>
          <br />
          <Text as='span' color='green.400'>nunca para de aprender</Text>
        </Heading>
        <Text color='gray.500'>
          PlatziPunks es una colección de Avatares randomizados cuya metadata es
          almacenada on-chain. Poseen características únicas y sólo hay 10.000
          en existencia.
        </Text>
        <Text color='green.500'>
          Cada PlatziPunk se genera de forma aleaotira, usa el previsualizador
          para averiguar cuál sería tu PlatziPunk si lo generas en este momento.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button
            rounded='full'
            size='lg'
            fontWeight='normal'
            px={6}
            colorScheme='green'
            bg='green.400'
            _hover={{ bg: 'green.500' }}
            disabled={
              isDisconnected || isConnecting || isLoading || chain?.unsupported
            }
            onClick={() => write?.()}
          >
            {isLoading ? <Spinner color='white' /> : 'Obtén tu punk'}
          </Button>
          <Link to="/punks">
            <Button rounded='full' size='lg' fontWeight='normal' px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      {isConnected ? <NFT /> : <FallbackNFT /> }
    </Stack>
  )
}

export default Home
