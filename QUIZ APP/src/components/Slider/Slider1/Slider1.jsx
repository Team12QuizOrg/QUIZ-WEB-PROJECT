
import { Box, Stack, Heading, Text, Image, Flex, Spacer, } from '@chakra-ui/react'
export default function Slider1() {

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
                    <Heading textAlign={"start"} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color={'brand.400'} >
                        Create quizzes in just few steps
                    </Heading>
                    <Text textAlign={"start"} fontSize={{ base: 'md', lg: 'xl' }} color={"brand.400"}>
                        Unlock effortless quiz building: the simplest way to make learning interactive
                    </Text>
                </Stack>

                <Image src={'assets/quizForm.png'} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={"md"} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

            </Flex>
        </Box>


    )
}