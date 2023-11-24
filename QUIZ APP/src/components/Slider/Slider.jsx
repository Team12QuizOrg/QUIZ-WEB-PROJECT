import { useState } from 'react'
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
import Slider from 'react-slick'

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
    const top = useBreakpointValue({ base: '90%', md: '50%' })
    const side = useBreakpointValue({ base: '30%', md: '40px' })

    const cards = [

        {
            title: 'Design Projects 2',
            text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
            logo: 'assets/logo2.png',
            image: 'assets/back1.png',
        },
        {
            title: 'Design Projects 3',
            text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
            logo: 'assets/logo2.png',
            image: 'assets/back1.png',
        },
    ]

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

                        <Image src={'assets/logo2.png'} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={"md"} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

                    </Flex>
                </Box>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={'6xl'}
                        position={"relative"}
                        backgroundPosition={"center"}
                        backgroundRepeat={"no-repeat"}
                        backgroundSize={"cover"}
                        backgroundImage={`url(${card.image})`}>

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
                                <Heading textAlign={"start"} fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} color={'brand.400'} >
                                    {card.title}
                                </Heading>
                                <Text textAlign={"start"} fontSize={{ base: 'md', lg: 'xl' }} color={"GrayText"}>
                                    {card.text}
                                </Text>
                            </Stack>

                            <Image src={card.logo} justifyContent={'center'} w={60} h={60} rounded={'full'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"} />

                        </Flex>
                    </Box>
                ))
                }
            </Slider >
        </Box >
    )
}