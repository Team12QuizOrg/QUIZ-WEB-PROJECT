import { Box, Container, Stack, Text, Image, Heading } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { useNavigate } from 'react-router-dom'

export default function Footer () {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()

  return (
        <Box
            bg={colorMode === 'dark' ? 'gray.800' : 'brand.100'}
            color={colorMode === 'dark' ? 'white' : 'gray.400'}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>© 2023 Solvr. All rights reserved</Text>
                <Stack direction={'row'} spacing={0}>
                    <Heading fontSize={'4xl'} color={colorMode === 'dark' ? 'white' : 'brand.400'}>
                        Solvr
                    </Heading>
                    <Image
                        className="logo-image"
                        src="assets\logo2.png"
                        alt="logo"
                        w={10}
                        h={10}
                        maxW={40}
                        maxH={40}
                        onClick={() => navigate('/home')}
                        rounded={'full'}
                    />
                </Stack>
            </Container>
        </Box>
  )
}
