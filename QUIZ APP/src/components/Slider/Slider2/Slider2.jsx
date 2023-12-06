import { useState, useEffect } from 'react'
import { Box, Stack, Heading, Text, Image, Flex, Spacer, } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode';
import { getAllUserData } from '../../../services/users.services';

import { getAllQuizzes } from '../../../services/quiz.services';
import { getAllCategories } from '../../../services/category.services';

export default function Slider2() {

    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [categories, setCategories] = useState([]);
    const { colorMode } = useColorMode();
    useEffect(() => {
        getAllUserData()
            .then((res) => {
                setUsers(res);
                return getAllQuizzes();
            })
            .then((res) => {
                setQuizzes(res);
                return getAllCategories();
            })
            .then((res) => setCategories(res))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (

        <Box
            key={"2"}
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
                    <Heading textAlign={"start"} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}  >

                        Connect with our growing network! {' '}
                        <br />
                        <Text as={'span'} color={'brand.200'} >{users ? users.length : '0'}</Text>
                        <Text as={'span'}  > members,</Text>
                        <Text as={'span'} color={'brand.200'} >
                            {quizzes ? quizzes.length : '0'}{' '}
                        </Text>
                        <Text as={'span'}  >
                            quizzes from{' '}
                        </Text>
                        <Text as={'span'} color={'brand.200'} >
                            {categories ? categories.length : "0"}{' '}
                        </Text>
                        <Text as={'span'}  >
                            categories and counting!{' '}
                        </Text>

                    </Heading>
                </Stack>

                <Image src={'assets/logo2.png'} justifyContent={'center'} w={60} h={60} rounded={'full'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

            </Flex>
        </Box>

    )
}