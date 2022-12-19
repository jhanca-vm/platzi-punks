import type { FunctionComponent } from 'react'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

const Error: FunctionComponent = () => (
  <Alert
    status='error'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='100vh'
  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      Oops! Página no encontrada
    </AlertTitle>
  </Alert>
)

export default Error
