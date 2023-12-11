import { useState, useEffect } from 'react'
import { Spinner, Text, Tooltip, Box, Button } from '@chakra-ui/react'
import { SiLevelsdotfyi } from "react-icons/si"
import { getEducatorsQuizzes } from '../../services/quiz.services'
import ListQuizzes from '../ListQuizzes/ListQuizzes'
import PropTypes from 'prop-types'

const EducatorsQuizzes = ({ user }) => {
  const [quizState, setQuizState] = useState([])
  const [currentQuizzes, setCurrentQuizzes] = useState([])
  const [finishedQuizzes, setFinishedQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getEducatorsQuizzes(user.handle)
      .then((res) => {
        setQuizState(res || [])
        const finished = res.filter((quiz) => quiz.state === 'too late')
        setFinishedQuizzes(finished)
        return res
      })
      .then((res) => {
        const current = res.filter((quiz) => !quiz.state || quiz.state !== 'too late')
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
          align={'center'}
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px'
            }
          }}>
          <ListQuizzes user={user} quizzes={currentQuizzes} name={'On going'} />

          <ListQuizzes user={user} quizzes={finishedQuizzes} name={'Finished'} />
          <Tooltip label={`${user.handle}'s creating Rank `} fontSize="md">
            <Button color={'brand.200'} flex='1' variant='ghost' leftIcon={<SiLevelsdotfyi />}>
              {quizState.length < 10 && 'Novice'}
              {quizState.length >= 10 && quizState.length <= 20 && 'Experienced'}
              {quizState.length > 21 && 'Master'}
            </Button>
          </Tooltip>
        </Box>
      </>
    )
  }
}
EducatorsQuizzes.propTypes = {
  user: PropTypes.object
}
export default EducatorsQuizzes
