import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { type ToastId, useToast } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { address, abi } from '../artifacts/PlatziPunks'

interface Mint {
  isLoading: boolean
  write?: () => void
}

export default function useMint (): Mint {
  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'mint',
    overrides: { gasLimit: BigNumber.from(300000) }
  })

  const onError = (): ToastId => toast({
    title: 'Transacción fallida',
    status: 'error',
    position: 'bottom-right',
    isClosable: true
  })

  const { data, isLoading, write } = useContractWrite({
    ...config,
    onSuccess: ({ hash }) => toast({
      title: 'Transacción enviada',
      description: hash,
      position: 'bottom-right',
      status: 'info'
    }),
    onError
  })
  const { isLoading: isPending } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => toast({
      title: 'Transacción confirmada',
      position: 'bottom-right',
      status: 'success'
    }),
    onError
  })

  return { isLoading: isLoading || isPending, write }
}
