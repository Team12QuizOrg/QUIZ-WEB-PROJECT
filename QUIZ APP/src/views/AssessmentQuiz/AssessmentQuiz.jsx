import { Box, Button, Container, Stack, Text, VStack, Grid, HStack, Heading, useDisclosure } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from '../../context/AuthContext';
import { getQuizScoreBoard } from '../../services/quiz.services';
import GetAvatar from '../../components/GetAvatar/GetAvatar';
import AssessmentForm from '../../components/AssessmentForm/AssessmentForm';
export default function AssessmentQuiz() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userData } = useContext(AppContext)
    const { id } = useParams();
    const [quizState, setQuizState] = useState([])
    const [selected, setSelected] = useState({ quizId: '', student: '', teacher: '' });
    const navigate = useNavigate()
    useEffect(() => {
        getQuizScoreBoard(id)
            .then((res) => {
                setQuizState(res);
            })
            .catch((err) => console.error('Failed to get quizState', err))
    }, [id])

    const handleOpen = (quizId, student, teacher) => {
        setSelected({ quizId, student, teacher });
        onOpen();
    };

    return (
        <>
            <Box>
                <Grid templateColumns={`repeat(2, 1fr)`} gap={4} mt={4} mb={6}>
                    {quizState && quizState.map((quiz) => (
                        <VStack key={quiz.user}
                            style={{
                                border: '2px solid grey', borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                            p={5}
                            _hover={{
                                textDecoration: "none",
                                bg: "brand.200",
                            }}
                            onClick={() => { handleOpen(id, quiz.user, userData.handle) }}
                            cursor={'pointer'}>
                            <Box h={10}
                                w={10} mt={2}>
                                <GetAvatar handle={quiz.user} />
                            </Box>
                            <VStack >
                                <Heading color={'brand.400'} align={'center'} fontSize={['sm', 'sm', '1.5em']}>{quiz.user}</Heading>
                                <Text color={'brand.400'} align={'center'}>{quiz.timestamp}</Text>


                            </VStack>
                        </VStack>

                    ))}
                </Grid>


            </Box>
            {isOpen && (
                <AssessmentForm isOpen={isOpen} onClose={onClose} selected={selected} />
            )}
        </>
    )
}