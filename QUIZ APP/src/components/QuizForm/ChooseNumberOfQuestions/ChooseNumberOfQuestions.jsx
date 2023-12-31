import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ChooseNumberOfQuestions = ({ numQuestions, func }) => {
  return (
    <FormControl mb={2} flex="1" ml={4} maxW="100%">
      <FormLabel fontSize="medium" h={10}>
        Number of Questions:
      </FormLabel>
      <Input

        type="number"
        value={numQuestions}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="grey"
        placeholder="Min: 5"
      />
    </FormControl>
  )
}

ChooseNumberOfQuestions.propTypes = {
  numQuestions: PropTypes.number,
  func: PropTypes.func
}

export default ChooseNumberOfQuestions
