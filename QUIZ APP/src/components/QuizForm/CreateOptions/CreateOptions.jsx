import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const CreateOptions = ({ optionIndex, option, func }) => {
  return (
    <FormControl key={optionIndex} mb={2}>
      <FormLabel fontSize="lg">Option {optionIndex + 1}:</FormLabel>
      <Input
        type="text"
        value={option}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="grey"
      />
    </FormControl>
  )
}

CreateOptions.propTypes = {
  optionIndex: PropTypes.number,
  option: PropTypes.string,
  func: PropTypes.func
}
export default CreateOptions
