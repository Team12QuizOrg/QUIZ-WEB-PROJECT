import { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quiz.services'
import AllQuizzes from '../AllQuizzes/AllQuizzes'
import { Text, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Quizzes = ({ isLogged }) => {
  // users- all
  const [allQuizzes, setAllQuizzes] = useState()
  const [openQuizzes, setOpenQuizzes] = useState()
  const [mostPopular, setMostPopular] = useState()
  const [participatedQuizzes, setParticipatedQuizzes] = useState()
  const [activeQuizzes, setActiveQuizzes] = useState()

  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        setAllQuizzes(res)
        // Display Open Q
        const filteredOpenQuizzes = res.filter((quiz) => quiz.selectedOption && quiz.selectedOption === 'Open' && quiz.state === 'ongoing')
        setOpenQuizzes(filteredOpenQuizzes || [])
        // Display Ongoing Q
        const filteredOngoingQuizzes = res.filter((quiz) => quiz.state && quiz.state === 'ongoing')
        setActiveQuizzes(filteredOngoingQuizzes || [])
        // Display Popular Q
        const filteredPopularQuizzes = res.filter((quiz) => quiz.scoreBoards && Object.keys(quiz.scoreBoards).length > 0)
        const sortedPopularQuizzes = filteredPopularQuizzes.sort(
          (quizA, quizB) => quizA.scoreBoards && quizB.scoreBoards && Object.keys(quizB.scoreBoards).length - Object.keys(quizA.scoreBoards).length
        )

        const topPopularQuizzes = sortedPopularQuizzes.slice(0, 5)
        setMostPopular(topPopularQuizzes || [])

        const filterParticipatedQuizzes = res.filter((quiz) => quiz.participants && Object.keys(quiz.participants).length > 0)
        setParticipatedQuizzes(filterParticipatedQuizzes || [])
        // Add more filtered quizzes
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error)
      })
  }, [])

  // Ongoing
  return (
    <Box>
      <Box>
        {!isLogged &&
          <Box mb="50px">
            <AllQuizzes quizzes={openQuizzes} catName={'Open Quizzes'} />
          </Box>}
      </Box>
      <Box mb="50px">
        {isLogged
          ? (
          <AllQuizzes quizzes={activeQuizzes} catName={'Ongoing Quizzes'} />
            )
          : null}
      </Box>
      <Box mb="50px">
        {isLogged
          ? (
          <AllQuizzes quizzes={participatedQuizzes} catName={'Active Quizzes'} />
            )
          : null}
      </Box>
      <Box mb="50px">
        {isLogged
          ? (
          <AllQuizzes quizzes={mostPopular} catName={'Popular Quizzes'} />
            )
          : (
              null
            )}
      </Box>
      <Box mb="50px">
        {isLogged
          ? (
          <AllQuizzes quizzes={allQuizzes} catName={'All Quizzes'} />
            )
          : (
          <Text>You need to Log In to view all Quizzes</Text>
            )}
      </Box>
    </Box>
  )
}
Quizzes.propTypes = {
  isLogged: PropTypes.bool
}
export default Quizzes
