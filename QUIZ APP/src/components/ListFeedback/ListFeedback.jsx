
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,

} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getAllFeedback } from '../../services/feedback.services'
import GetAvatar from '../GetAvatar/GetAvatar'
import { useNavigate } from "react-router-dom";


export default function ListFeedback() {
    const [feedbacks, setFeedbacks] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        getAllFeedback()
            .then((res) => {
                const shuffledFeedbacks = res.sort(() => Math.random() - 0.5);

                const displayedFeedbacks = shuffledFeedbacks.slice(0, Math.min(shuffledFeedbacks.length, 3));

                setFeedbacks(displayedFeedbacks)
            })
            .catch((err) => console.error(`Problem fetching all users`, err))
    }, [])


    return (


        <Box bg={'brand.100'}>
            <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
                <Stack spacing={0} align={'center'}>
                    <Heading color={'brand.400'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>Our Clients Speak</Heading>
                    <Text color={'brand.200'} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>We have been working with clients around the world</Text>
                </Stack>

                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 10, md: 4, lg: 10 }}>
                    {feedbacks && feedbacks.map((feedback) => (
                        <Box key={feedback.timestamp}>


                            <Stack
                                bg={'gray.200'}
                                boxShadow={'lg'}
                                p={8}
                                rounded={'xl'}
                                align={'center'}
                                pos={'relative'}
                                _after={{
                                    content: `""`,
                                    w: 0,
                                    h: 0,
                                    borderLeft: 'solid transparent',
                                    borderLeftWidth: 16,
                                    borderRight: 'solid transparent',
                                    borderRightWidth: 16,
                                    borderTop: 'solid',
                                    borderTopWidth: 16,
                                    borderTopColor: 'gray.500',
                                    pos: 'absolute',
                                    bottom: '-16px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }}>
                                <Text
                                    textAlign={'center'}
                                    color={'brand.400'}
                                    fontSize={'sm'}>
                                    {feedback.content}
                                </Text>
                            </Stack>

                            <Flex align={'center'} mt={8} direction={'column'}>
                                <GetAvatar handle={feedback.user} />
                                <Stack spacing={-1} align={'center'}>
                                    <Text fontWeight={600} color={'brand.200'} onClick={() => navigate(`/${(feedback.user)}`)}>{feedback.user}</Text>

                                </Stack>
                            </Flex>


                        </Box>
                    ))}
                </Stack>


            </Container>
        </Box>

    )
}