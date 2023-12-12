import { useNavigate } from 'react-router-dom'
import { PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, Text, PopoverCloseButton, Spacer, Popover, PopoverTrigger, HStack, Button, useDisclosure, Heading } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import AppContext from '../../context/AuthContext'
import AssessmentForm from '../AssessmentForm/AssessmentForm'
import PropTypes from 'prop-types'
import { RiMapPinTimeFill, RiMapPinTimeLine } from 'react-icons/ri'

const ListQuizzes = ({ user, quizzes, name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected, setSelected] = useState({ quizId: '', student: '', teacher: '' })
  const navigate = useNavigate()
  const { userData } = useContext(AppContext)
  const handleOpen = (quizId, student, teacher) => {
    setSelected({ quizId, student, teacher })
    onOpen()
  }

  return (
    <>

      <Popover>
        <PopoverTrigger preventOverflow>
          <Button flex='1' variant='ghost' fontSize={['xl', 'lg', '1xl']} leftIcon={name === 'On going' || name === 'Currently participating' ? <RiMapPinTimeFill /> : <RiMapPinTimeLine />}>
            {quizzes.length}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader bg="brand.200" rounded='10'>{`${user.handle}'s ${name} quizzes`}</PopoverHeader>
          <PopoverBody >
            {quizzes && quizzes.map((quiz) => (
              <HStack key={`quiz-${quiz.id}`} style={{
                border: '2px solid grey',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} p={3}>
                <Heading cursor={'pointer'}
                  fontSize={['10px', '10px', '20px']}
                  fontWeight={'bold'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'brand.200'
                  }}
                  _active={{
                    bg: 'brand.300',
                    transform: 'scale(0.98)'
                  }} onClick={() => navigate(`/quizzes/AllQuizzes/${quiz.id}`)}> {quiz.title} </Heading>
                <Spacer></Spacer>

                {quiz.educatorsComments &&
                  <Button onClick={() => { handleOpen(quiz.id, userData.handle) }} bg={'blue.400'} color='white'> Assessment  </Button>
                }
                {user.userType === 'teacher' &&
                  <Text bg={'blue.400'} color='white' rounded={'10'} p={'1'}> {quiz.selectedOption}  </Text>
                }
              </HStack>

            ))}

          </PopoverBody>
        </PopoverContent>
      </Popover>
      {
        isOpen && (
          <AssessmentForm isOpen={isOpen} onClose={onClose} selected={selected} />
        )
      }
    </>
  )
}
ListQuizzes.propTypes = {
  user: PropTypes.object,
  quizzes: PropTypes.array,
  name: PropTypes.string
}
export default ListQuizzes
