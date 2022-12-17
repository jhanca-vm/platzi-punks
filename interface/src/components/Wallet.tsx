import type { FunctionComponent } from 'react'
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork
} from 'wagmi'
import { Link } from 'react-router-dom'
import {
  Badge,
  Button,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'

const Wallet: FunctionComponent = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const { data } = useBalance({ address })
  const { chain } = useNetwork()
  const { connect, connectors: [connector] } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = connector.chains[0].id

  return (
    <Flex alignItems='center'>
      {isConnected && chain?.unsupported === false
        ? (
            <Tag colorScheme='green' borderRadius='full'>
              <TagLabel>
                <Link to='/punks'>
                  {address?.substring(0, 5)}
                  ...
                  {address?.substring(address.length - 4)}
                </Link>
              </TagLabel>
              <Badge
                display={{ base: 'none', sm: 'block' }}
                variant='solid'
                fontSize='0.8rem'
                ml={1}
              >
                ~{data !== undefined ? Number(data.formatted).toFixed(3) : ''} Ξ
              </Badge>
              <TagCloseButton onClick={() => disconnect()} />
            </Tag>
          )
        : (
            <Button
              variant='solid'
              colorScheme='green'
              size={{ base: 'xs', sm: 'sm' }}
              leftIcon={isConnecting ? undefined : <LinkIcon />}
              disabled={isConnecting || chain?.unsupported}
              onClick={() => connect({ connector, chainId })}
            >
              {chain?.unsupported === true
                ? 'Red no soportada'
                : isConnecting ? 'Conectando...' : 'Conectar wallet'
              }
            </Button>
          )
      }
    </Flex>
  )
}

export default Wallet
