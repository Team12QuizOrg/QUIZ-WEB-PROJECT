import { useState, useEffect } from 'react'
import { HStack, Heading, Spacer } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { getUserScoreBoard } from '../../services/users.services'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserScoreBoard = ({ user }) => {
  const [quizState, setQuizState] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getUserScoreBoard(user.handle)
      .then((res) => {
        setQuizState(res || {})
      })
      .catch((err) => console.error('Failed to get quizState', err))
  }, [])

  return (
        <>

            <HStack align="center" mt={5}>

                <Heading size='xs' textTransform='uppercase' color={'brand.200'}>
                    quiz
                </Heading>
                <Spacer></Spacer>
                <Heading size='xs' textTransform='uppercase' color={'brand.200'} >
                    points
                </Heading>
            </HStack>
            {quizState && quizState.map((quizResult) => (

                <HStack align="center" key={quizResult.quizTitle} mt={5}>
                    <StarIcon size={20} style={{ marginRight: '8px' }} />
                    <Heading size='xs' textTransform='uppercase' cursor={'pointer'} onClick={() => navigate(`/quizzes/AllQuizzes/${quizResult.id}`)}>
                        {quizResult.quizTitle}
                    </Heading>
                    <Spacer></Spacer>
                    <Heading size='xs' textTransform='uppercase' >
                        {quizResult.score}
                    </Heading>
                </HStack>

            ))
            }

        </>
  )
}
UserScoreBoard.propTypes = {
  user: PropTypes.object
}
export default UserScoreBoard
