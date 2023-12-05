
import { Box, Stack, Heading, Text, Image, Flex, Spacer, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
export default function Slider1() {
    const navigate = useNavigate()
    return (

        <Box
            key={"1"}
            height={'6xl'}
            position={"relative"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundImage={'assets/back1.png'}>

            <Flex size={"container.lg"} height={"600px"}
                direction={{ base: 'column', lg: 'row' }}
                justify={"center"}
                align={"center"} >
                <Stack spacing={"20px"}
                    alignItems={"center"}
                    p={"4"}
                    direction={"column"}
                    maxW={{ base: '80%', lg: '50%' }}
                >
                    <Spacer />
                    <Heading textAlign={"start"} textStyle='h1' color={'brand.200'} >
                        Create quizzes in just few steps
                    </Heading>
                    <Text textAlign={"start"} textStyle='h4' color={"brand.400"} ml={10}>
                        Unlock effortless quiz building: the simplest way to make learning interactive
                    </Text>
                </Stack>
                <Box onClick={() => navigate(`/signup`)}>
                    <Image src={'assets/quizForm.png'} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={"md"} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />
                </Box>
            </Flex>
        </Box>


    )
}