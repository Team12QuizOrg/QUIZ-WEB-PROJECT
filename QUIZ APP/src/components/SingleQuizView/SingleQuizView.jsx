import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuizzes, removePost } from "../../services/quiz.services";
import { getQuizById } from "../../services/quiz.services";
import { useStatStyles } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import SingleQuestion from "../SolvingQuizView/SolvingQuizView";
import AppContext from "../../context/AuthContext";
import { addParticipant, changeState } from "../../services/quiz.services";
import { Card, CardHeader, Flex, Avatar, Checkbox, CardBody, CardFooter, FormControl, StackDivider, FormLabel, Select } from "@chakra-ui/react";
import { Text, Image } from "@chakra-ui/react";
import { addQuizForLater, getUserByHandle, removeQuizForLater } from "../../services/users.services";
import { Grid, GridItem, Center, HStack, Spacer } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import CreateGroup from "../CreateGroup/CreateGroup";
import EditProfile from "../EditProfile/EditProfile";
import GetAvatar from "../GetAvatar/GetAvatar";
import { formatDate } from "../../services/users.services";
import AllQuizzes from "../AllQuizzes/AllQuizzes";
import { DeleteIcon } from "@chakra-ui/icons";
import { areMembersOfSameGroup } from "../../services/groups.services";
import InviteStudents from "../InvitedStudents/InvitedStudents";
import { SingleQuizButtons } from "./SingleQuizButtons/SingleQuizButtons";

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
  const [isChecked, setIsChecked] = useState(false);
  const [areGroupMembers, setAreGroupMembers] = useState('false')
  const getCatName = `Similar Quizzes to "${quiz?.title}":`;

  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res);
        setScoreBoards(res.scoreBoards || []);
      })
      .then((res) => setState(!state))
      .catch((err) => console.error(err));
  }, []);



  useEffect(() => {
    if (quiz) {
      areMembersOfSameGroup(userData?.handle, quiz.author)
        .then((res) => {
          setAreGroupMembers(res);
          if (new Date() > quiz.timeLimit) {
            changeState(id);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [userData?.handle, quiz?.author]);
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


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      addQuizForLater(userData.handle, id, quiz.title);
    } else {
      removeQuizForLater(userData.handle, quiz.title);
    }
  };
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
        p="40px">
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
            <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
              Add  quiz for later
            </Checkbox>
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
                  <Text>Total Points: {quiz.totalPoints * quiz.numQuestions}</Text>
                  <br></br>
                  <Text>Number of Questions: {quiz.numQuestions}</Text>
                  <br></br>
                  <Text>Available till: {formatDate(quiz.endTime)}</Text>
                  <br></br>
                  <Text>Time to solve the quiz: {quiz.timer} min/hours</Text>
                  <br></br>
                  {userData && userData.userType !== "student" && (
                    <HStack width={'50%'} textAlign={'center'}>
                      <InviteStudents quizId={quiz.id} />
                    </HStack>
                  )}
                  <SingleQuizButtons isPrivate={quiz.selectedOption} handleQuizClick={handleQuizClick} handleDelete={handleDelete} quiz={quiz} hasInvite={userData && userData.handle} user={userData}></SingleQuizButtons>
                </>
              )}
              {userData && quiz && userData.handle === quiz.author &&
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

      <GridItem as="aside" colSpan={{ base: 6, lg: 2, xl: 2 }}
        minHeight={{ lg: '100%' }} p={{ base: '20px', lg: '30px' }} mt={2}  >
        <Card>
          <CardHeader>
            <Heading size='md'>SCORE BOARD</Heading>
          </CardHeader>
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

