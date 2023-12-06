

import {
    Box, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    Container,
    Stack,
    Text,
    Image,
    Heading,
    Button,
    Input,
    HStack,

} from '@chakra-ui/react'
import { useContext } from 'react';
import { useState, useEffect } from 'react'
import AppContext from '../../context/AuthContext';
import { getQuestionsByQuizId } from '../../services/quiz.services';
import { addEducatorsComments, getQuizState } from '../../services/users.services';
import { PiStudentFill } from "react-icons/pi";
import { useColorMode } from '@chakra-ui/color-mode';
//quizState- това са ми отговорите на ученика - те са масив
//questions = масив от въпросите - с индексите вземам въпроса, правилния отговор и възможните отговори

export default function AssessmentForm({ isOpen, onClose, selected }) {
    const { userData } = useContext(AppContext)
    const { quizId, student, teacher } = selected
    const [questions, setQuestions] = useState([])
    const [quizState, setQuizState] = useState([])
    const [quizComments, setQuizComments] = useState([])
    const [form, setForm] = useState([]);
    const { colorMode } = useColorMode();

    useEffect(() => {
        getQuestionsByQuizId(quizId).then((res) => setQuestions((res)));
    }, [quizId]);

    useEffect(() => {
        getQuizState(student, quizId)
            .then((res) => {

                setQuizState(res.selectedAnswers)
                if (res.educatorsComments) {
                    setQuizComments(res.educatorsComments)
                }
            })

            .catch((err) => console.error('Failed to get quizState', err))
    }, [student, quizId])
    const updateForm = (index) => (e) => {
        setForm({
            ...form,
            [index]: e.target.value,
        });
    };

    const handleSave = () => {
        addEducatorsComments(student, quizId, form);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" >
            <ModalOverlay />
            <ModalContent bg={colorMode === 'dark' ? '#718096' : 'white'}>
                <ModalHeader fontSize={['0.8em', '1em', '1.2em']} textTransform='uppercase'>
                    <HStack justify={'center'} align={'center'} >
                        <PiStudentFill />
                        <Text>{student}</Text>
                    </HStack>

                </ModalHeader>
                <ModalCloseButton />
                <ModalBody color={'black'}>
                    {questions.map((question, index) => (
                        <Box key={question[1]} style={colorMode === 'dark' ? {
                            border: '2px solid #EDF2F7',
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        } : {
                            border: '2px solid grey',
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }} color={colorMode === 'dark' ? 'brand.200' : 'black'}
                            p={2} m={2}>
                            <Text key={`question-${question[1]}`} style={colorMode === 'dark' ? {
                                border: '2px solid #EDF2F7',
                                borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            } : {
                                border: '2px solid grey',
                                borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                                p={2} fontWeight={"bold"}  > Question: {question[1]}</Text>

                            {question[2].map((option, optionIndex) => (
                                <Box key={option}>
                                    {option === question[0] &&
                                        (<Text key={`correct-option-${optionIndex}`}
                                            style={colorMode === 'dark' ? {
                                                border: '2px solid #38A169',
                                                borderRadius: "10px",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                            } : {
                                                border: '2px solid grey',
                                                borderRadius: "10px",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                            }} bg={'green.100'}
                                            p={2}> {option}</Text>) ||
                                        option === quizState[index] &&
                                        (<Text key={`selected-option-${optionIndex}`} style={colorMode === 'dark' ? {
                                            border: '2px solid #E53E3E',
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                        } : {
                                            border: '2px solid grey',
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                        }}
                                            bg={'red.100'}
                                            p={2}> {option}</Text>) ||
                                        (<Text key={`normal-option-${optionIndex}`} style={colorMode === 'dark' ? {
                                            border: '2px solid #EDF2F7',
                                            borderRadius: "10px",
                                        } : {
                                            border: '2px solid grey',
                                            borderRadius: "10px",
                                        }}
                                            p={2}> {option}</Text>)}

                                </Box>
                            ))} {userData.userType === 'teacher' ? (<Input key={`input-${index}`}
                                value={form[index] || ''}
                                onChange={updateForm(index)}
                                placeholder="add comment here"
                                bg={'gray.100'}
                                border={0}
                                color={'brand.400'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                mt={3} />)
                                :
                                (quizComments &&
                                    <Box key={`comment-${index}`}>
                                        {quizComments[index] === '' ? (<Text bg={'gray.100'}
                                            border={0}
                                            color={'brand.400'}

                                            mt={3} fontWeight={"bold"} fontSize={['0.8em', '1em', '1.2em']}> Educator did not comment on this answer</Text>) : (<Text bg={'gray.100'}
                                                border={0}
                                                color={'brand.400'}

                                                mt={3} fontWeight={"bold"} fontSize={['0.8em', '1em', '1.2em']}> {quizComments[index]}</Text>)

                                        }

                                    </Box>
                                )

                            }

                        </Box>
                    ))}

                    {userData.userType === 'teacher' && <Button onClick={handleSave} bg={'brand.100'} color="brand.200" m={3} _hover={{ bg: 'brand.200', color: 'brand.100' }}>Save</Button>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}