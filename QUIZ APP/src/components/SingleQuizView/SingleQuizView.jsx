import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuizzes, removePost } from "../../services/quiz.services";
import { getQuizById } from "../../services/quiz.services";
import { useStatStyles } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import SingleQuestion from "../SolvingQuizView/SolvingQuizView";
import AppContext from "../../context/AuthContext";
import { addParticipant } from "../../services/quiz.services";
import { Card, CardHeader, Flex, Avatar, IconButton, CardBody, CardFooter, FormControl, StackDivider, FormLabel, Select } from "@chakra-ui/react";
import { Text, Image } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/users.services";
import { Grid, GridItem, Center, HStack, Spacer } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import CreateGroup from "../CreateGroup/CreateGroup";
import EditProfile from "../EditProfile/EditProfile";
import GetAvatar from "../GetAvatar/GetAvatar";
import { formatDate } from "../../services/users.services";
import AllQuizzes from "../AllQuizzes/AllQuizzes";
import { DeleteIcon } from "@chakra-ui/icons";


// Add the timer on the singleQuizView so people now how much time they have left
// CSS - singleQuizView view, SolvingQuizView

const SingleQuizView = () => {
  const { userData } = useContext(AppContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState();
  const [quizAuthor, setQuizAuthor] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [scoreBoards, setScoreBoards] = useState([]);
  const [getCat, setGetCat] = useState();
  const [state, setState] = useState("false");
  const getCatName = `Similar Quizzes to "${quiz?.title}":`;

  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res);
        setScoreBoards(res.scoreBoards || []);
      })
      .then((res) => setState(!state))
      .catch((err) => console.error(err));
  }, [quiz]);

  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        const filterSimQuizzes = res.filter((singleQ) => {
          if (singleQ && quiz) {
            const isNotCurrentQuiz = singleQ.id !== quiz.id;
            const isSameCategory = singleQ.category === quiz.category;
            return isNotCurrentQuiz && isSameCategory;
          }
        });
        setGetCat(filterSimQuizzes || {});
      })
  }, [])

  useEffect(() => {
    if (quiz) {
      getUserByHandle(quiz.author)
        .then((res) => {
          if (res.exists()) {
            const userData = res.val();
            setQuizAuthor(userData.photoURL);
            setCurrentUser(userData);
          }
        })
        .catch((err) => console.error('error fetching user: ', err));
    }
  }, [quiz]);

  const handleQuizClick = (quizId) => {
    addParticipant(quizId, userData.handle)
      .then((updatedQuiz) => {
        navigate(`/quizzes/AllQuizzes/${id}/${id}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const scoreBoardsOnQuiz = Object.entries(scoreBoards).map((entry, index) => {
    const [quizId, data] = entry;
    return (
      <Box key={index} mb={2}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' spacing='4' >
          <GetAvatar handle={data.user} />
          <Box justify={'space-between'}>
            <HStack>
              <Heading fontSize={['0.8em', '1em', '1.2em']}>
                {data.user}
              </Heading>
              <Spacer />
              <Heading fontSize={['0.8em', '1em', '1.2em']}>
                {data.score}
              </Heading>
            </HStack>
          </Box>
        </Flex>
      </Box>
    );
  })


  const handleBlock = (handle) => {
    blockUser(handle)
  }
  const handleAdmin = (handle) => {
    makeAdmin(handle);
  }
  const handleUnblock = (handle) => {
    unBlockUser(handle)
  }
  const handleDelete = (quizId) => {
    removePost(quizId);
    navigate(-1);
  }
  const handleEditProfile = (updatedValues) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedValues,
    }));
  };

  return (
    <><Grid minHeight={'100vh'} templateRows='repeat(1, 1fr)' templateColumns='repeat(6, 1fr)'
      gap={4}>
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 4 }}
        bg="brand.100" p="40px">
        <Center >
          <Card maxW='2xl' width={'70%'}>
            <CardHeader>
              <Heading margin={'10px'} size='md'>{quiz?.title}</Heading>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' justify={'center'} flexWrap='wrap'>
                  <Avatar src={quizAuthor} width={70} height={70} />
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody align={'left'}>
              <HStack>
                <Heading textAlign="start" fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
                  Educator: {currentUser && currentUser.firstName + " " + currentUser.lastName}
                </Heading>
                <br></br>
                <Spacer />
              </HStack>
              {currentUser?.caption && (
                <Text textAlign="start">{currentUser.caption}</Text>
              )}
              {quiz && (
                <>
                  <br></br>
                  <Text>Category: {quiz.category}</Text>
                  <br></br>
                  <Text>Total Points: {quiz.totalPoints}</Text>
                  <br></br>
                  <Text>Number of Questions: {quiz.numQuestions}</Text>
                  <br></br>
                  <Text>Available till: {formatDate(quiz.endTime)}</Text>
                  <br></br>
                  <Text>Time to solve the quiz: {quiz.timer} min/hours</Text>
                  <br></br>
                  <Flex justifyContent="center" alignItems="center" gap={4}>
                    {quiz?.state === "ongoing" ? (
                      <Button maxW={'20%'} margin={'5px'} onClick={() => handleQuizClick(quiz.id)}>
                        Enroll
                      </Button>
                    ) : (
                      <Text>You missed the deadline</Text>
                    )}
                    {userData && quiz && (userData.isAdmin || (userData.handle === quiz.author)) && (
                      <Button maxW={'20%'} margin={'5px'} onClick={() => handleDelete(quiz.id)} flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
                      </Button>
                    )}

                  </Flex>
                </>
              )}
              {userData.handle === quiz?.author &&
                <CardFooter
                  justify='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                ><Button onClick={() => navigate(`/quizzes/assessment/${quiz.id}`)} flex='1' variant='ghost' bg={'brand.200'}>
                    Assess
                  </Button>
                </CardFooter>
              }
            </CardBody>
          </Card>
        </Center>
      </GridItem>

      <GridItem as="aside" colSpan={{ base: 6, lg: 2, xl: 2 }} bg="brand.100"
        minHeight={{ lg: '100%' }} p={{ base: '20px', lg: '30px' }} mt={2}  >
        <Card>
          <CardHeader>
            <Heading size='md'>SCORE BOARD</Heading>
          </CardHeader>
          {/* TODO: make it so only show 10 uesrs */}
          <CardBody>
            <Flex direction="column" align="center" justify="center">
              {scoreBoardsOnQuiz.slice(0, 10)}
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
      <AllQuizzes quizzes={getCat} catName={getCatName}></AllQuizzes>
    </>
  );
}
export default SingleQuizView;


// <Text>
// <label>Paricipants</label>
// <select>
//   <option value={""}></option>
//   {quiz?.participants.map((participant, index) => (
//     <option key={index} value={participant}>
//       {participant} {/* Replace with the property containing the user's name */}
//     </option>
//   ))}
// </select>
// </Text>