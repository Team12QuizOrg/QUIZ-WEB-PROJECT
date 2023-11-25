import { useState, useEffect } from 'react'
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Image,
    Flex,
    Spacer,
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { getAllUserData } from "../../services/users.services";
import Slider from 'react-slick'
import { getAllQuizzes } from '../../services/quiz.services';
import { getAllCategories } from '../../services/category.services';

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export default function SliderHome() {

    const [slider, setSlider] = useState()
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [categories, setCategories] = useState([]);
    const top = useBreakpointValue({ base: '90%', md: '50%' })
    const side = useBreakpointValue({ base: '30%', md: '40px' })
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
    // useEffect(() => {
    //     getAllUserData()
    //         .then((res) => setUsers(res))
    //         .catch((err) => console.error(`Problem fetching all posts`, err))
    // }, [users])
    // useEffect(() => {
    //     getAllQuizzes()
    //         .then((res) => setQuizzes(res))
    //         .catch((err) => console.error(`Problem fetching all quizzes`, err))
    // }, [users])

    // useEffect(() => {
    //     getAllCategories()
    //         .then((res) => setCategories(res))
    //         .catch((err) => console.error(`Problem fetching all quizzes`, err))
    // }, [users])
    return (
        <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
            {/* CSS files for react-slick */}
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
                aria-label={"left-arrow"}
                variant={"ghost"}
                position={"absolute"}
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            {/* Right Icon */}
            <IconButton
                aria-label={"right-arrow"}
                variant={"ghost"}
                position={"absolute"}
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt size={"40px"} />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
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
                <Box
                    key={"2"}
                    height={'6xl'}
                    position={"relative"}
                    backgroundPosition={"center"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                    backgroundImage={`assets/back1.png`}>

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
                            <Heading textAlign={"start"} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color={'brand.200'} >

                                Connect with our growing network! {' '}
                                <br />
                                <Text as={'span'} color={'brand.200'} >{users ? users.length : '0'}</Text>
                                <Text as={'span'} color={'brand.400'} > members,</Text>
                                <Text as={'span'} color={'brand.200'} >
                                    {quizzes ? quizzes.length : '0'}{' '}
                                </Text>
                                <Text as={'span'} color={'brand.400'} >
                                    quizzes from{' '}
                                </Text>
                                <Text as={'span'} color={'brand.200'} >
                                    {categories ? categories.length : "0"}{' '}
                                </Text>
                                <Text as={'span'} color={'brand.400'} >
                                    categories and counting!{' '}
                                </Text>

                            </Heading>
                            {/* <Text textAlign={"start"} fontSize={{ base: 'md', lg: 'xl' }} color={"GrayText"}>
                                be  part of us
                            </Text> */}
                        </Stack>

                        <Image src={'assets/logo2.png'} justifyContent={'center'} w={60} h={60} rounded={'full'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

                    </Flex>
                </Box>
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
                                Solve quizzes and master your brain
                            </Heading>
                            <Text textAlign={"start"} fontSize={{ base: 'md', lg: 'xl' }} color={"brand.400"}>
                                Learning has never been more interactive
                            </Text>
                        </Stack>

                        <Image src={'assets/logo2.png'} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={"md"} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

                    </Flex>
                </Box>

            </Slider >
        </Box >
    )
}