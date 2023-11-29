import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/quiz.services";
import { useStatStyles } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import SingleQuestion from "../SolvingQuizView/SolvingQuizView";
import AppContext from "../../context/AuthContext";
import { addParticipant } from "../../services/quiz.services";
import { Card, CardHeader, Flex, Avatar, IconButton, CardBody, CardFooter,FormControl,FormLabel, Select } from "@chakra-ui/react";
import { Text, Image } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/users.services";
import { BiLabel } from "react-icons/bi";

// Add the timer on the singleQuizView so people now how much time they have left
// CSS - singleQuizView view, SolvingQuizView

const SingleQuizView = () => {
  const { userData } = useContext(AppContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState();
  const [quizAuthor, setQuizAuthor] = useState();


  useEffect(() => {
    getQuizById(id)
      .then((res) => setQuiz(res))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    getUserByHandle(quiz?.author)
      .then((res) => {
        if (res.exists()) {
          const userData = res.val();
          setQuizAuthor(userData.photoURL);
        }
      })
      .catch((err) => console.error('error fetching user: ', err));
  }, []);

  const handleQuizClick = (quizId) => {
    addParticipant(quizId, userData.handle)
      .then((updatedQuiz) => {
        navigate(`/quizzes/AllQuizzes/${id}/${id}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Card maxW='2xl'>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar src={quizAuthor} />

            <Box>
              <Heading size='sm'>{quiz?.author}</Heading>
              <Text>Title: {quiz?.title}</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'

          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{quiz?.numQuestions}</Text>
        <Text>{quiz?.author}</Text>
        <Text>{quiz?.category}</Text>

        <FormControl>
          <FormLabel>Participants</FormLabel>
          <Select maxW={'sm'}>
            <option value={""}></option>
            {quiz?.participants?.map((participant, index) => (
              <option key={index} value={participant}>
                {participant}
              </option>
            ))}
          </Select>
        </FormControl>


      </CardBody>
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button onClick={() => handleQuizClick(quiz.id)}>Enroll</Button>
      </CardFooter>
    </Card>

  )
}
export default SingleQuizView;