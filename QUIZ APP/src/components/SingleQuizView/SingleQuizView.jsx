import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllQuizzes, removePost, getQuizById, addParticipant, changeState } from '../../services/quiz.services'
import { Box,Icon, Button, Heading, Card, CardHeader, Flex, Avatar, Checkbox, CardBody, CardFooter, Text, Grid, GridItem, Center, HStack, Spacer } from '@chakra-ui/react'
import AppContext from '../../context/AuthContext'
import { addQuizForLater, getUserByHandle, removeQuizForLater, formatDate } from '../../services/users.services'
import { StarIcon } from '@chakra-ui/icons'
import GetAvatar from '../GetAvatar/GetAvatar'
import AllQuizzes from '../AllQuizzes/AllQuizzes'
import { areMembersOfSameGroup } from '../../services/groups.services'
import InviteStudents from '../InvitedStudents/InvitedStudents'
import { SingleQuizButtons } from './SingleQuizButtons/SingleQuizButtons'
import { InfoIcon, CalendarIcon, TimeIcon, QuestionIcon, CheckIcon } from '@chakra-ui/icons'

const SingleQuizView = () => {
  const { userData } = useContext(AppContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState()
  const [quizAuthor, setQuizAuthor] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [scoreBoards, setScoreBoards] = useState([])
  const [getCat, setGetCat] = useState()
  const [state, setState] = useState('false')
  const [isChecked, setIsChecked] = useState(false)
  const [areGroupMembers, setAreGroupMembers] = useState('false')
  const getCatName = `Similar Quizzes to "${quiz?.title}":`

  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res)
        setScoreBoards(res.scoreBoards || [])
      })
      .then((res) => setState(!state))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (quiz) {
      areMembersOfSameGroup(userData?.handle, quiz.author)
        .then((res) => {
          setAreGroupMembers(res)
          if (new Date() > quiz.timeLimit) {
            changeState(id)
          }
        })
        .catch((err) => console.error(err))
    }
  }, [userData?.handle, quiz?.author])
  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        const filterSimQuizzes = res.filter((singleQ) => {
          if (singleQ && quiz) {
            const isNotCurrentQuiz = singleQ.id !== quiz.id
            const isSameCategory = singleQ.category === quiz.category
            return isNotCurrentQuiz && isSameCategory
          }
        })
        setGetCat(filterSimQuizzes || {})
      })
  }, [])
  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        const filterSimQuizzes = res.filter((singleQ) => {
          if (singleQ && quiz) {
            const isNotCurrentQuiz = singleQ.id !== quiz.id
            const isSameCategory = singleQ.category === quiz.category
            return isNotCurrentQuiz && isSameCategory
          }
        })
        setGetCat(filterSimQuizzes || {})
      })
  }, [])

  useEffect(() => {
    if (quiz) {
      getUserByHandle(quiz.author)
        .then((res) => {
          if (res.exists()) {
            const userData = res.val()
            setQuizAuthor(userData.photoURL)
            setCurrentUser(userData)
          }
        })
        .catch((err) => console.error('error fetching user: ', err))
    }
  }, [])

  const handleQuizClick = (quizId) => {
    addParticipant(quizId, userData.handle)
      .then((updatedQuiz) => {
        navigate(`/quizzes/AllQuizzes/${id}/${id}`)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
  const scoreBoardsOnQuiz = Object.entries(scoreBoards).map((entry, index) => {
    const [quzId, data] = entry
    return (
      <Box key={index}>
        <HStack align="center" mt={5}>
          <StarIcon size={20} style={{ marginRight: '8px' }} />
          <GetAvatar handle={data.user} />
          <Heading size='xs' textTransform='uppercase' cursor={'pointer'}>
            {data.user}
          </Heading>
          <Spacer></Spacer>
          <Heading size='xs' textTransform='uppercase' >
            {data.score}
          </Heading>
        </HStack>
      </Box>
    )
  })

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)

    if (!isChecked) {
      addQuizForLater(userData.handle, id, quiz.title)
    } else {
      removeQuizForLater(userData.handle, quiz.title)
    }
  }
  const handleDelete = (quizId) => {
    removePost(quizId)
    navigate(-1)
  }

  return (
    <><Grid minHeight={'100vh'} templateRows='repeat(1, 1fr)' templateColumns='repeat(6, 1fr)'
      gap={4}>
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 4 }}
        p="40px">
        <Center >
          <Card border={'1px solid'} borderColor={'brand.200'} maxW='2xl' width={'70%'}>
            <CardHeader >
              <Heading textAlign={'center'} margin={'10px'} size='md'>{quiz && quiz.title}</Heading>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' justify={'center'} flexWrap='wrap'>
                  <Avatar src={quizAuthor} width={70} height={70} />
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody align={'left'}>
              <HStack>
                <Heading textAlign="start" fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
                  Educator: {currentUser && currentUser.firstName + ' ' + currentUser.lastName}
                </Heading>
                <br></br>
                <Spacer />
                <Checkbox ml={'20px'} isChecked={isChecked} onChange={handleCheckboxChange}>
                    Add  quiz for later
                  </Checkbox>
              </HStack>
              {currentUser?.caption && (
                <Text color={'brand.200'} textAlign="start">{currentUser.caption}</Text>
              )}
              {quiz && (
                <Box >
                  <Text align={'center'}>
                  <InfoIcon margin={1}>Quiz Information</InfoIcon>
                  Quiz Information
                  </Text>
                  <br></br>
                  <Text color={'orange.500'}>Category: {quiz.category}</Text>
                  <br></br>
                  <Text><QuestionIcon margin={1}></QuestionIcon>Number of Questions: {quiz.numQuestions}</Text>
                  <br></br>
                  <Text><CheckIcon margin={1}></CheckIcon>Total Points: {quiz.totalPoints * quiz.numQuestions}</Text>
                  <br></br>
                  <Text><CalendarIcon margin={1}></CalendarIcon>Available till: {formatDate(quiz.endTime)}</Text>
                  <br></br>
                  <Text><TimeIcon margin={1}></TimeIcon>Time to solve the quiz: {quiz.timer} min/hours</Text>
                  <br></br>
                  {userData && userData.userType !== 'student' && (
                    <HStack width={'50%'} textAlign={'center'}>
                      <InviteStudents quizId={quiz.id} />
                    </HStack>
                  )}
                  <SingleQuizButtons isPrivate={quiz.selectedOption} handleQuizClick={handleQuizClick} handleDelete={handleDelete} quiz={quiz} hasInvite={userData && userData.handle} user={userData}></SingleQuizButtons>
                </Box>
              )}
              {userData && quiz && userData.handle === quiz.author &&
                <CardFooter
                  justify='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px'
                    }
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
        minHeight={{ lg: '100%' }} p={{ base: '20px', lg: '30px' }} mt={2} >
        <Card border={'1px solid'} borderColor={'brand.200'} mb={10}>
          <CardHeader>
            <Heading display="flex" alignItems="center" justifyContent="center" size='md' color={'brand.200'}>SCORE BOARD</Heading>
          </CardHeader>
          <HStack align="center" mt={5}>
            <Heading ml={'6'} size='xs' textTransform='uppercase' color={'brand.200'}>
              user
            </Heading>
            <Spacer></Spacer>
            <Heading mr={'5'} size='xs' textTransform='uppercase' color={'brand.200'} >
              points
            </Heading>
          </HStack>
          <CardBody>
            {scoreBoardsOnQuiz.slice(0, 10)}
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
      <AllQuizzes quizzes={getCat} catName={getCatName}></AllQuizzes>
    </>
  )
}
export default SingleQuizView
