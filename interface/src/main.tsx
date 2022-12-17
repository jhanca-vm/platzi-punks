import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ChakraProvider } from '@chakra-ui/react'
import router from './router'

const { chains, provider } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_API_KEY })]
)

const client = createClient({
  autoConnect: localStorage.getItem('wagmi.connected') === 'true',
  connectors: [new InjectedConnector({
    chains,
    options: { shimChainChangedDisconnect: false, shimDisconnect: false }
  })],
  provider
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RouterProvider router={router} />
      </WagmiConfig>
    </ChakraProvider>
  </StrictMode>
)
