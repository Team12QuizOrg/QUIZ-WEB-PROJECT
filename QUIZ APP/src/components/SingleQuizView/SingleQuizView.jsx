import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/quiz.services";
import {  useStatStyles } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import SingleQuestion from "../SolvingQuizView/SolvingQuizView";
import AppContext from "../../context/AuthContext";
import { addParticipant } from "../../services/quiz.services";
import { Card, CardHeader, Flex, Avatar, IconButton, CardBody, CardFooter, } from "@chakra-ui/react";
import { Text,Image } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/users.services";
import { BiLabel } from "react-icons/bi";


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
            <Avatar src={quizAuthor}/>

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
        <Text>
          <label>Paricipants</label>
          <select>
        <option value={""}></option>
        {quiz?.participants.map((participant, index) => (
          <option key={index} value={participant}>
            {participant} {/* Replace with the property containing the user's name */}
          </option>
        ))}
      </select>
        </Text>
        
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
  // return (
  //     <>
  //       {quiz && (
  //         <Box border="2px" borderColor="yellow.400" borderRadius="lg" p={4} mb={4}>
  //           <Button onClick={() => handleQuizClick(quiz.id)}>Enroll</Button>
  //           <Heading as="h1" size="md" mb={2} color="black">
  //             Title: {quiz.author}
  //           </Heading>
  //           <Heading as="h2" size="lg" mb={2} color="black">
  //             Quiz Category: {quiz.category}
  //           </Heading>
  //           <Heading as="h2" size="lg" mb={2} color="black">
  //             Quiz Name: {quiz.title}
  //           </Heading>

  //           <Stack spacing={4}>
  //             <Heading as="h3" size="md" mb={2} color="black">
  //               Number of Questions: {quiz.numQuestions}
  //             </Heading>
  //             <Heading as="h3" size="md" color="black">
  //               Total Points: {quiz.totalPoints}
  //             </Heading>
  //             {/* {Object.entries(quiz).map(([questionId, question]) => {
  //               return (
  //                 <SingleQuestion
  //                   key={questionId}
  //                   question={question.question}
  //                   correctAnswer={question.correctAnswer}
  //                   options={question.options}
  //                 />
  //               );
  //             })} */}
  //           </Stack>
  //         </Box>
  //       )}
  //     </>
  //   );
}
export default SingleQuizView;