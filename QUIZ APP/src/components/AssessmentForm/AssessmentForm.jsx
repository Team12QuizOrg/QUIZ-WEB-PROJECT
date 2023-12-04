

import {
    Box, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    Container,
    Stack,
    Text,
    Image,
    Heading,
    Button,
    Input,

} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getQuestionsByQuizId } from '../../services/quiz.services';
import { addEducatorsComments, getQuizState } from '../../services/users.services';

//quizState- това са ми отговорите на ученика - те са масив
//questions = масив от въпросите - с индексите вземам въпроса, правилния отговор и възможните отговори

export default function AssessmentForm({ isOpen, onClose, selected }) {
    const { quizId, student, teacher } = selected
    const [questions, setQuestions] = useState([])
    const [quizState, setQuizState] = useState([])
    const [form, setForm] = useState([]);

    useEffect(() => {
        getQuestionsByQuizId(quizId).then((res) => setQuestions((res)));
    }, [quizId]);

    useEffect(() => {
        getQuizState(student, quizId)
            .then((res) => {

                setQuizState(res.selectedAnswers)

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
        console.log(form)
        addEducatorsComments(student, quizId, form);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={'black'} fontSize={['0.8em', '1em', '1.2em']} align={'center'} justify={'center'} textTransform='uppercase'>
                    {student}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody color={'black'}>
                    {questions.map((question, index) => (
                        <Box key={question[1]} style={{
                            border: '2px solid grey',
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                            p={2}>
                            <Text key={`question-${question[1]}`} style={{
                                border: '2px solid grey',
                                borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                                p={2}> Question: {question[1]}</Text>
                            <Text key={`correct-${question[1]}`}> Correct: {question[0]}</Text>
                            {question[2].map((option, optionIndex) => (
                                <Box key={option}>
                                    {option === question[0] &&
                                        (<Text key={`correct-option-${optionIndex}`}
                                            borderRadius="10px"
                                            border='2px solid green'
                                            bg={'green.100'}
                                            p={2}> {option}</Text>) ||
                                        option === quizState[index] &&
                                        (<Text key={`selected-option-${optionIndex}`} style={{
                                            border: '2px solid red',
                                            borderRadius: "10px",
                                        }}
                                            bg={'red.100'}
                                            p={2}> {option}</Text>) ||
                                        (<Text key={`normal-option-${optionIndex}`} style={{
                                            border: '1px solid grey',
                                            borderRadius: "10px",
                                        }}
                                            p={2}> {option}</Text>)}

                                </Box>
                            ))}
                            <Input key={`input-${index}`}
                                value={form[index] || ''}
                                onChange={updateForm(index)}
                                placeholder="add comment here"
                                bg={'gray.100'}
                                border={0}
                                color={'brand.400'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                mt={3} />
                        </Box>
                    ))}
                    <Button onClick={handleSave}>Save</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}