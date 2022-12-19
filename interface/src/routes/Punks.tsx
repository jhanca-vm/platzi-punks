import type { FunctionComponent } from 'react'
import { Grid, Skeleton, Text } from '@chakra-ui/react'
import useNFTs from '../hooks/useNFTs'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

const Punks: FunctionComponent = () => {
  const data = useNFTs()

  if (data?.length === 0) {
    return (
      <Text color='gray.600' align='center'>
        Aún no tienes PlatziPunks, ve a la página de inicio y obtén uno.
      </Text>
    )
  }

  return (
    <Grid
      templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
      gap={6}
      my={6}
    >
      {data === undefined
        ? Array(4).fill(undefined).map((_, index) => (
          <Skeleton height='320px' rounded='lg' key={`Skeleton#${index}`} />
        ))
        : data.map((image, index) => (
          <Link to={`/punks/${index}`} key={`PlatziPunk#${index}`}>
            <Card image={image} index={index} />
          </Link>
        ))
      }

    </Grid>
  )
}

export default Punks
