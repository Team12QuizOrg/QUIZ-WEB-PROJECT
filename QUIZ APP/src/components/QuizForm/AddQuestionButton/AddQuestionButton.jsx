import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const AddQuestionButton = ({ func }) => {
  return (
    <Button
      type="button"
      w={120}
      onClick={func}
      colorScheme="black"
      variant="solid"
      size="md"
      mt={2}
      background={'blue.400'}
    >
      Add Question
    </Button>
  )
}

AddQuestionButton.propTypes = {
  func: PropTypes.func
}
export default AddQuestionButton
