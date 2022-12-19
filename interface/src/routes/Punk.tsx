import type { FunctionComponent } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  Progress,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import useNFTs from '../hooks/useNFTs'
import Card from '../components/Card'

const Punk: FunctionComponent = () => {
  const params = useParams()
  const data = useNFTs()
  const index = Number(params.index)

  if (data === undefined) {
    return (
      <Progress
        size='sm'
        colorScheme='blackAlpha'
        rounded='full'
        isIndeterminate
      />
    )
  }

  if (index >= data.length) return <Navigate to='/' replace />

  return (
    <Stack
      spacing={{ base: 10, lg: 20 }}
      py={{ base: 5, md: 8 }}
      direction={{ base: 'column', md: 'row' }}
      maxW='4xl'
      mx='auto'
    >
      <Card mx={{ base: 'auto', md: 0 }} image={data[index]} index={index} />
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Atributo</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from(new URL(data[index]).searchParams.entries())
            .map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td><Tag>{value}</Tag></Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default Punk
