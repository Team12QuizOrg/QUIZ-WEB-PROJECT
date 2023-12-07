import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuizById, getQuestionsByQuizId } from '../../services/quiz.services'
import { Box, Button, Text, Flex, VStack, Stack, Card, CardBody, CardHeader, Heading, StackDivider, Grid, GridItem, HStack } from '@chakra-ui/react'
import AddButton from '../AddButton/AddButton'

const SolveGuestUser = () => {
  const { userData } = useContext(AppContext)
  const { id } = useParams()
  const [quiz, setQuiz] = useState()
  const navigate = useNavigate()
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  const [questionIds, setQuestionIds] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer1, setSelectedAnswer1] = useState([])
  const activeQuestionData = questionIds[activeQuestion]
  const [correctAnswer, question, options] = activeQuestionData || []
  const [timerUnix, setTimerUnix] = useState()
  const [quizFinished, setQuizFinished] = useState(false)

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  })

  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: [],
    wrongAnswers: 0,
    correctAnswers: 0,
    status: 'unfinished',
    endTime: timerUnix,
    id
  })

  useEffect(() => {
    if (Object.values(quizState).length === 0) {
      setTimerUnix(Date.now() / 1000 + Number(quiz?.timer * 60))
    }
  }, [quiz])

  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (id) {
      getQuestionsByQuizId(id)
        .then((res) => setQuestionIds(res || []))
        .catch((err) => console.error(err))
    }
  }, [])

  useEffect(() => {
    if (quizState.status === 'finished') {
      setQuizFinished(true)
    }
  }, [quizState.status])

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    setSelectedAnswer1(answer)

    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const onClickNext = () => {
    setSelectedAnswerIndex(null)

    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: Math.floor(prev.score + quiz.totalPoints),
            correctAnswers: prev.correctAnswers + 1
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )

    setQuizState((prev) => {
      const updatedSelectedAnswers = [...(prev?.selectedAnswers || [])]
      updatedSelectedAnswers[activeQuestion] = selectedAnswer1
      if (selectedAnswer) {
        const pointPerCorrectAnswer = quiz.totalPoints
        const updatedScore = (prev.score || 0) + pointPerCorrectAnswer
        const wrongScoreUpdated = prev.wrongAnswers || 0
        const updatedCorrectAnswer = prev.correctAnswers || 0
        return {
          ...prev,
          currentQuestionIndex: activeQuestion,
          score: Math.floor(updatedScore),
          selectedAnswers: updatedSelectedAnswers,
          wrongAnswers: wrongScoreUpdated,
          correctAnswers: updatedCorrectAnswer + 1,
          endTime: Math.floor(timerUnix) || prev.endTime
        }
      } else {
        const updatedScore = prev.score || 0
        const wrongScoreUpdated = prev.wrongAnswers || 0
        return {
          ...prev,
          currentQuestionIndex: activeQuestion,
          score: Math.floor(updatedScore),
          selectedAnswers: updatedSelectedAnswers,
          wrongAnswers: wrongScoreUpdated + 1,
          endTime: Math.floor(timerUnix) || prev.endTime
        }
      }
    })

    if (activeQuestion !== questionIds.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
      setQuizState((prev) => {
        return {
          ...prev,
          status: 'finished',
          title: quiz.title,
          id
        }
      })
    }
  }

  const handleBack = () => {
    navigate(-1)
  }
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
        <Grid
            templateColumns={{ base: '1fr', md: 'auto' }}
            align={'center'}
            justify={'center'}
            justifySelf={'center'}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            padding={{ base: 5, md: 20 }}
        >
            {!quizFinished
              ? (
                    <Box
                        align={'center'}
                        justify={'center'}
                        justifySelf={'center'}
                        borderColor="brand.200"
                        borderWidth={'thick'}
                        borderRadius="1%"
                        maxW={{ base: '100%', md: '70%' }}
                        minW={{ base: '100%', md: '70%', xl: '60%' }}
                        boxSizing="border-box"
                        bg="brand.500"
                        mx="auto"
                        my="auto"
                        p={{ base: '2%', md: '3%' }}
                    >
                        <VStack align="center" spacing={4}>
                            <Flex align="center" justify="space-between" width="100%">
                                <Box>
                                    <Button color={'brand.200'} onClick={() => handleBack()}>
                                        Go Back
                                    </Button>
                                </Box>
                                <Flex align="center" color={'blue.600'}>
                                    <Text className="active-question-no">
                                        {addLeadingZero(activeQuestion + 1)}
                                    </Text>
                                    <Text className="total-question">
                                        /{addLeadingZero(questionIds.length)}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight={'bold'}>{question}</Text>
                            <Grid
                                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                                gap={4}
                            >
                                {options?.map((answer, index) => (
                                    <GridItem key={answer}>
                                        <Button
                                            width="100%"
                                            color={'white'}
                                            onClick={() => onAnswerSelected(answer, index)}
                                            variant={
                                                selectedAnswerIndex === index ? 'solid' : 'outline'
                                            }
                                            colorScheme={
                                                selectedAnswerIndex === index ? 'yellow' : 'blue'
                                            }
                                            fontFamily='sans-serif;'
                                            fontSize={{ base: 'sm', md: 'md' }}
                                            _hover={{
                                              boxShadow: 'md',
                                              transform: 'scale(1.05)'
                                            }}
                                            transition="all 0.3s"
                                            bgGradient={
                                                selectedAnswerIndex === index
                                                  ? 'linear(to-r, yellow.400, yellow.600)'
                                                  : 'linear(to-r, blue.400, blue.600)'
                                            }
                                            _active={{
                                              bgGradient:
                                                    selectedAnswerIndex === index
                                                      ? 'linear(to-r, yellow.600, yellow.800)'
                                                      : 'linear(to-r, blue.600, blue.800)'
                                            }}
                                        >
                                            {answer}
                                        </Button>
                                    </GridItem>
                                ))}
                            </Grid>
                            <VStack align="start">
                                <Button
                                    color={'brand.200'}
                                    onClick={onClickNext}
                                    disabled={selectedAnswerIndex === null}
                                >
                                    {activeQuestion === questionIds.length - 1 ? ' Finish' : 'Next'}
                                </Button>
                            </VStack>
                        </VStack>
                    </Box>
                )
              : (<>

              <Text mb={10} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight={'bold'}>Sign in OR Sign  up to explore all of our cool features</Text>

                    <Card
                        maxW={{ base: '100%', md: '60%' }}
                        align={'center'}
                        bg={'blue.400'}
                        justify={'center'}
                        justifySelf={'center'}

                        p={{ base: 3, md: 6 }}
                        borderRadius="lg"
                        boxShadow="xl"
                    >
                        <CardHeader>
                            <Heading size="md">Quiz Report</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider borderColor={'black'} />} spacing="4">
                                <Box>
                                    <Heading size="xs" textTransform="uppercase">
                                        Summary
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        Total Questions: {questionIds.length}
                                    </Text>
                                </Box>

                                <Box>
                                    <Text pt="2" fontSize="sm">
                                        Correct Answers: {quizState.correctAnswers || 0}
                                        {quizState.correctAnswers === questionIds.length && (
                                            <span style={{ color: 'green' }}>
                                                {' '}
                                                🎉 Sage of Infinite Knowledge!
                                            </span>
                                        )}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text pt="2" fontSize="sm">
                                        Wrong Answers: {quizState.correctAnswers ? questionIds.length - quizState.correctAnswers : questionIds.length}
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>

                    </>
                )}
        </Grid>
  )
}
export default SolveGuestUser
