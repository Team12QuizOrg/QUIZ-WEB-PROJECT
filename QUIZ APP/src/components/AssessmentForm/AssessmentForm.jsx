

import {
    Box, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    Container,
    Stack,
    Text,
    Image,
    Heading,

} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getQuestionsByQuizId } from '../../services/quiz.services';
import { getQuizState } from '../../services/users.services';

//quizState- това са ми отговорите на ученика - те са масив
//questions = масив от въпросите - с индексите вземам въпроса, правилния отговор и възможните отговори

export default function AssessmentForm({ isOpen, onClose, selected }) {
    const { quizId, student, teacher } = selected
    const [questions, setQuestions] = useState([])
    const [quizState, setQuizState] = useState([])

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
    console.log(quizState)
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent >
                <ModalHeader color={'black'} fontSize={['0.8em', '1em', '1.2em']} align={'center'} justify={'center'} textTransform='uppercase'>{student}</ModalHeader>
                <ModalCloseButton />
                <ModalBody color={'black'}>
                    {questions.map((question, index) => (
                        <Box key={question} style={{
                            border: '2px solid grey', borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                            p={5}>
                            <Text style={{
                                border: '2px solid grey', borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                                p={5}> Question: {question[1]}</Text>
                            <Text > Correct: {question[0]}</Text>
                            {question[2].map((option) => (
                                option === question[0] &&
                                (<Text key={option} style={{
                                    border: '2px solid yellow', borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                                    p={5}> {option}</Text>) ||
                                option === quizState[index] &&
                                (<Text key={option} style={{
                                    border: '2px solid blue', borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                                    p={5}> {option}</Text>) ||

                                (<Text key={option} style={{
                                    border: '2px solid grey', borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                                    p={5}> {option}</Text>)

                            ))}

                        </Box>
                    ))}

                </ModalBody>
            </ModalContent >
        </Modal>
    )
}