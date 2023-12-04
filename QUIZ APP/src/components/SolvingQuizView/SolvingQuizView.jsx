import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../services/quiz.services";
import { getQuestionsByQuizId } from "../../services/quiz.services";
import { setScoreBoards } from "../../services/quiz.services";
import { createQuizState, getQuizState } from "../../services/users.services";
import {
  Box,
  Button,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  StackDivider,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import Timer from "../QuizForm/Timer/Timer";

const SolvingQuizView = () => {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  // const [questions, setQuestions] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer1, setSelectedAnswer1] = useState([]);
  const activeQuestionData = questionIds[activeQuestion];
  const [correctAnswer, question, options] = activeQuestionData || [];
  const [timerUnix, setTimerUnix] = useState();
  const [quizFinished, setQuizFinished] = useState(false);

  const handleTimerFinish = () => {
    setQuizFinished(true);
    setShowResult(true);

    setActiveQuestion(0);
    setQuizState((prev) => {
      return {
        ...prev,
        status: "finished",
        wrongAnswers: prev.wrongAnswers + (questionIds.length - prev.selectedAnswers.length),
      };
    });

  };

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: [],
    wrongAnswers: 0,
    correctAnswers: 0,
    status: "unfinished",
    endTime: timerUnix,
    id: id
  });

  useEffect(() => {
    if (Object.values(quizState).length === 0) {
      setTimerUnix(Date.now() / 1000 + Number(quiz?.timer * 60));
    }
  }, [quiz]);

  useEffect(() => {
    if (userData?.handle && id) {
      getQuizState(userData.handle, id)
        .then((res) => {
          setQuizState(res || {});
          setActiveQuestion(res.currentQuestionIndex + 1 || 0);
        })
        .catch((err) => console.error("Failed to get quizState", err));
    }
  }, [id]);


  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (id) {
      getQuestionsByQuizId(id)
        .then((res) => setQuestionIds(res || []))
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (showResult) {
      setScoreBoards(userData.handle, quiz.id, quiz.title, quizState.score);
    }
  }, [showResult]);

  useEffect(() => {
    if (selectedAnswer !== "") {
      createQuizState(userData.handle, quizState, id);
    }
  }, [activeQuestion]);

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer1(answer);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  useEffect(() => {
    if (quizState.status === "finished") {
      setQuizFinished(true);
    }
  }, [quizState.status]);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);

    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: Math.floor(
            prev.score + quiz.totalPoints / quiz.numQuestions
          ),
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    setQuizState((prev) => {
      const updatedSelectedAnswers = [...(prev?.selectedAnswers || [])];
      updatedSelectedAnswers[activeQuestion] = selectedAnswer1;
      if (selectedAnswer) {
        const pointPerCorrectAnswer = quiz.totalPoints / quiz.numQuestions;
        const updatedScore = (prev.score || 0) + pointPerCorrectAnswer;
        const wrongScoreUpdated = prev.wrongAnswers || 0;
        const updatedCorrectAnswer = prev.correctAnswers || 0;
        return {
          ...prev,
          currentQuestionIndex: activeQuestion,
          score: Math.floor(updatedScore),
          selectedAnswers: updatedSelectedAnswers,
          wrongAnswers: wrongScoreUpdated,
          correctAnswers: updatedCorrectAnswer + 1,
          endTime: Math.floor(timerUnix) || prev.endTime,
        };
      } else {
        const updatedScore = prev.score || 0;
        const wrongScoreUpdated = prev.wrongAnswers || 0;
        return {
          ...prev,
          currentQuestionIndex: activeQuestion,
          score: Math.floor(updatedScore),
          selectedAnswers: updatedSelectedAnswers,
          wrongAnswers: wrongScoreUpdated + 1,
          endTime: Math.floor(timerUnix) || prev.endTime,
        };
      }
    });

    if (activeQuestion !== questionIds.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      setQuizState((prev) => {
        return {
          ...prev,
          status: "finished",
          title: quiz.title,
          id
        };
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const cardBackgroundColor = "brand.100";
  return (
    <Flex align={"center"} justify={"center"} justifySelf={"center"}>
      <div>
        {quiz && !quizFinished && (
          <Timer endTimeUnix={quizState?.endTime ? quizState?.endTime : timerUnix} onTimerFinish={handleTimerFinish} />
        )}
      </div>
      {!quizFinished ? (
        <Box
          align={"center"}
          justify={"center"}
          justifySelf={"center"}
          borderColor="brand.200"
          borderWidth={"thick"}
          borderRadius="1%"
          maxW={"50%"}
          bg="brand.500"
          mx="auto"
          my="auto"
          p={5}
        >
          <VStack align="center" spacing={4}>
            <Flex align="center" justify="space-between" width="100%">
              <Box>
                <Button color={"brand.200"} onClick={() => handleBack()}>
                  Go Back
                </Button>
              </Box>
              <Flex align="center" color={"blue.600"}>
                <Text className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </Text>
                <Text className="total-question">
                  /{addLeadingZero(questionIds.length)}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="xl">{question}</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {options?.map((answer, index) => (
                <GridItem key={answer}>
                  <Button
                    width={"100%"}
                    onClick={() => onAnswerSelected(answer, index)}
                    variant={
                      selectedAnswerIndex === index ? "solid" : "outline"
                    }
                    colorScheme={
                      selectedAnswerIndex === index ? "yellow" : "blue"
                    }
                  >
                    {answer}
                  </Button>
                </GridItem>
              ))}
            </Grid>
            <VStack align="start">
              <Button
                color={"brand.200"}
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questionIds.length - 1 ? "Finish" : "Next"}
              </Button>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Card
          maxW={"60%"}
          align={"center"}
          borderColor={"black"}
          bg={cardBackgroundColor}
        >
          <CardHeader>
            <Heading size="md">Quiz Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider borderColor={"black"} />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" color={"black"} fontSize="sm">
                  Total Question: {questionIds.length}
                </Text>
              </Box>
              <Box>
                <Text pt="2" fontSize="sm">
                  Total Score: {quizState?.score}
                </Text>
              </Box>
              <Box>
                <Text pt="2" fontSize="sm">
                  Correct Answers: {quizState.correctAnswers}
                </Text>
              </Box>
              <Box>
                <Text pt="2" fontSize="sm">
                  Wrong Answers: {quizState.wrongAnswers}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};
export default SolvingQuizView;
