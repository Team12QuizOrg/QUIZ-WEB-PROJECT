import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const CreateNewCategory = ({ category, func }) => {
  return (
    <FormControl mb={2} gridColumn="span 2">
      <FormLabel fontSize="lg">Create new category:</FormLabel>
      <Input

        type="text"
        value={category}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="grey"
      />
    </FormControl>
  )
}

CreateNewCategory.propTypes = {
  category: PropTypes.string,
  func: PropTypes.func
}

export default CreateNewCategory
