
import { Box, Stack, Heading, Text, Image, Flex, Spacer, HStack, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/color-mode';
export default function Slider3() {
    const navigate = useNavigate()
    const { colorMode } = useColorMode();
    return (

        <Box
            key={"1"}
            height={'6xl'}
            position={"relative"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundImage={colorMode === 'dark' ? 'assets/dark.png' : 'assets/back1.png'}>

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
                    <Heading textAlign={"start"} textStyle='h1' >
                        Solve quizzes and master your brain!
                    </Heading>
                    <HStack textStyle='h3WithLetterStyle' justify={'end'}>
                        <Text color={'brand.200'}>
                            Try your knowledge here
                        </Text>
                        <Text as='span'> {' '}</Text>
                    </HStack>
                </Stack>
                <Box onClick={() => navigate(`/signup`)}>
                    <Image src={'assets/quiz.png'} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={"md"} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />
                </Box>
            </Flex>
        </Box>
    )
}