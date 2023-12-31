import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Center, Text, Stack, List, ListItem, ListIcon, Button, Flex, Tooltip } from '@chakra-ui/react'
import { ChevronRightIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { ITEMS_PER_PAGE } from '../../common/constants'
import AppContext from '../../context/AuthContext'
import { feedbackFormatDate } from '../../services/feedback.services'
import { acceptingInvitation, declineInvitation } from '../../services/users.services'
import { useColorMode } from '@chakra-ui/color-mode'
import PropTypes from 'prop-types'

const AllQuizzes = ({ quizzes, catName, category }) => {
  const [allQuizzes, setAllQuizzes] = useState({})
  const { userData } = useContext(AppContext)
  const [currentPage, setCurrentPage] = useState(1)

  const [currentUser, setCurrentUser] = useState()
  const indexOfLastQuiz = currentPage * ITEMS_PER_PAGE
  const indexOfFirstQuiz = indexOfLastQuiz - ITEMS_PER_PAGE
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  const currentQuizzes = Object.entries(allQuizzes).slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  )
  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.handle)
    }
  }, [])
  useEffect(() => {
    if (category) {
      const filteredQuiz = quizzes && quizzes.filter((quiz) => quiz && quiz.category === category && quiz.state === 'ongoing')
      setAllQuizzes(filteredQuiz || {})
    } else {
      setAllQuizzes(quizzes || {})
    }
  }, [quizzes])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  const acceptInvitation = (handle, quizId) => {
    acceptingInvitation(handle, quizId)
    navigate(`${quizId}`)
  }
  const removeInvitation = (quizId, handle) => {
    declineInvitation(quizId, handle)
    navigate(0)
  }

  return (
    <Box
    >
      <div>
        <Text margin={'90px'} fontSize="xl" fontWeight="bold" mb={4} align={'left'} onClick={() => navigate(`/quizzes/AllQuizzes/Category/${catName}`)}>
          {catName}
        </Text>
        {currentQuizzes && (
          <Flex wrap="wrap" justify="center" flexDirection="row">
            {currentQuizzes.map(([quizId, quizData]) => (
              <Center padding={'10px'} py={6} key={quizId} >
                <Box
                  maxW={'250px'}
                  w={'full'}
                  bg={colorMode === 'dark' ? 'blue.700' : 'white.200'}
                  boxShadow={'2xl'}
                  rounded={'md'}
                  overflow={'hidden'}
                  border={'1px'}
                  borderColor={'brand.200'}
                >
                  <Stack textAlign={'center'} p={6} color={'black'} align={'center'}>
                    <Text fontSize={'xs'} fontWeight={500} bg={'green.50'} p={2} px={3} color={'green.500'} rounded={'full'}>
                      {quizData.category}
                    </Text>
                    <Stack maxW={'250px'} align={'center'} justify={'center'}>
                      <Tooltip label={quizData.title} placement="top">
                        <Text fontSize={'sm'} color={'brand.200'} fontWeight={800} isTruncated>
                          {quizData.title}
                        </Text>
                      </Tooltip>
                    </Stack>
                  </Stack>
                  <Box bg={colorMode === 'dark' ? '#A0AEC0' : 'grey.50'} padding={'25px'}>
                    <List textAlign={'left'} spacing={2}>
                      <ListItem fontSize={'sm'} marginLeft={0}>
                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Author: {quizData.author}
                      </ListItem>
                      <ListItem fontSize={'xs'}>
                        <ListIcon marginLeft={0} as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Created: {feedbackFormatDate(quizData?.createdOn)}
                      </ListItem>
                      <ListItem fontSize={'sm'} marginLeft={0}>
                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Type: {quizData.selectedOption}
                      </ListItem>
                      <ListItem fontSize={'sm'} marginLeft={0}>
                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Availability: {quizData.state}
                      </ListItem>
                      <ListItem fontSize={'sm'} marginLeft={0}>
                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Questions: {quizData.numQuestions}
                      </ListItem>
                      <ListItem fontSize={'sm'} marginLeft={0}>
                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                        Total Points: {quizData.totalPoints * quizData.numQuestions}
                      </ListItem>
                    </List>
                    {userData
                      ? (quizData && quizData.selectedOption === 'Private' && (quizData.invites && quizData.invites[currentUser] && quizData.invites[currentUser]?.inviteStatus === 'false')
                          ? (
                          <>
                            <Button mt={10} w={'full'} bg={'blue.400'}
                              color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                              _hover={{ bg: 'brand.200' }} _focus={{ bg: 'brand.200' }}
                              onClick={() => acceptInvitation(userData.handle, quizData.id)}
                            >
                              Accept
                            </Button>
                            <Button mt={4} w={'full'} bg={'red.400'} color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(255 99 132 / 43%)'}
                              _hover={{ bg: 'red.300' }} _focus={{ bg: 'red.300' }}
                              onClick={() => removeInvitation(quizData.id, userData.handle)}
                            >
                              Reject
                            </Button>
                          </>)
                          : (
                          <Button mt={10} w={'full'} bg={'blue.400'} color={'white'} rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{ bg: 'brand.200' }}
                            _focus={{ bg: 'brand.200' }}
                            onClick={() => navigate(`${quizData.id}`)}
                          > View Quiz Details
                          </Button>
                            ))
                      : (<Button mt={10} w={'full'} bg={'blue.400'} color={'white'} rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{ bg: 'brand.200' }}
                        _focus={{ bg: 'brand.200' }}
                        onClick={() => navigate(`/solve/${quizData.id}`)}
                      >
                        Solve
                      </Button>)
                    }
                  </Box>
                </Box>
              </Center>
            ))}
          </Flex>
        )}
        {currentQuizzes && currentQuizzes.length > 0 && (
          <Flex wrap="wrap" justify="center" alignItems="center">
            {currentPage > 1 && (
              <Button variant="ghost" mx={1} onClick={() => handlePageChange(currentPage - 1)}>
                <ArrowForwardIcon transform="rotate(180deg)" />
              </Button>
            )}
            <Box borderRadius="md" display="flex">
            </Box>
            {currentPage * ITEMS_PER_PAGE < Object.keys(allQuizzes).length && (
              <Button variant="ghost" mx={1} onClick={() => handlePageChange(currentPage + 1)}>
                <ArrowForwardIcon />
              </Button>
            )}
          </Flex>
        )}
        {(!currentQuizzes || currentQuizzes.length === 0) && <Text align={'center'}>No {catName}</Text>}
      </div>
    </Box>
  )
}
AllQuizzes.propTypes = {
  catName: PropTypes.string,
  category: PropTypes.string,
  quizzes: PropTypes.array
}
export default AllQuizzes
