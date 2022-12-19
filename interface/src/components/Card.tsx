import type { FunctionComponent } from 'react'
import { Box, Heading, Image, Stack } from '@chakra-ui/react'

interface Props {
  image: string
  index: number
  [key: string]: any
}

const Card: FunctionComponent<Props> = ({ image, index, ...props }) => (
  <Box
    role='group'
    p={6}
    maxW='330px'
    w='full'
    h='fit-content'
    boxShadow='2xl'
    rounded='lg'
    pos='relative'
    zIndex={1}
    border='1px'
    borderColor='blackAlpha.50'
    {...props}
  >
    <Box
      rounded='lg'
      pos='relative'
      height='230px'
      _after={{
        transition: 'all .3s ease',
        content: "''",
        w: 'full',
        h: 'full',
        pos: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: `url(${image})`,
        filter: 'blur(15px)',
        zIndex: -1
      }}
      _groupHover={{
        _after: {
          filter: 'blur(20px)'
        }
      }}
    >
      <Image
        height={230}
        width={282}
        objectFit='contain'
        src={image}
      />
    </Box>
    <Stack pt={10} align='center'>
      <Heading fontSize='xl' fontFamily='body' fontWeight={500}>
        PlatziPunks #{index}
      </Heading>
    </Stack>
  </Box>
)

export default Card
