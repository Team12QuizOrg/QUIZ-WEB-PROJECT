import { useState, useEffect } from 'react'
import { Spinner, Text, Tooltip, Box, Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { getUsersQuizzes } from '../../services/users.services'
import ListQuizzes from '../ListQuizzes/ListQuizzes'
import PropTypes from 'prop-types'

const UsersQuizzes = ({ user }) => {
  const [quizState, setQuizState] = useState([])
  const [currentQuizzes, setCurrentQuizzes] = useState([])
  const [finishedQuizzes, setFinishedQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsersQuizzes(user.handle)
      .then((res) => {
        setQuizState(res || [])
        const finished = res.filter((quiz) => quiz.status === 'finished')
        setFinishedQuizzes(finished)
        return res
      })
      .then((res) => {
        const current = res.filter((quiz) => !quiz.status || quiz.status !== 'finished')
        setCurrentQuizzes(current)
      })
      .catch((err) => console.error('Failed to get quizState', err))
      .finally(() => {
        setLoading(false)
      })
  }, [user.handle])

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    )
  } else {
    return (
      <>
        <Box justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px'
            }
          }}>
          <ListQuizzes user={user} quizzes={currentQuizzes} name={'Currently participating'} />

          <ListQuizzes user={user} quizzes={finishedQuizzes} name={'Participated'} />
          <Tooltip label={`${user.handle}'s Rank`} fontSize="md">
            <Button color={'brand.200'} flex='1' variant='ghost' leftIcon={<CheckCircleIcon />}>
              {quizState.length < 10 && 'Beginner'}
              {quizState.length >= 10 && quizState.length <= 20 && 'Intermediate'}
              {quizState.length > 21 && 'Advanced'}
            </Button>
          </Tooltip>
        </Box>
      </>
    )
  }
}

UsersQuizzes.propTypes = {
  user: PropTypes.object
}
export default UsersQuizzes
