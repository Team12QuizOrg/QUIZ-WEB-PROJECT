import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const QuizName = ({ quizName, setQuizName }) => {
  return (
    <FormControl mb={2} flex="2" paddingRight={4} maxW="100%">
      <FormLabel fontSize="lg" maxW="100%">
        Quiz Name:
      </FormLabel>
      <Input

        type="text"
        value={quizName}
        onChange={setQuizName}
        variant="filled"
        focusBorderColor="black"
        size="md"
        bg="grey"
        w={300}
      />
    </FormControl>
  )
}

QuizName.propTypes = {
  quizName: PropTypes.string,
  setQuizName: PropTypes.func
}

export default QuizName
