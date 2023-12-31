import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ChooseExistingCategory = ({ selectedCategory, func, categories }) => {
  return (
    <FormControl mb={2} gridColumn="span 2">
      <FormLabel fontSize="lg">Choose an existing one:</FormLabel>
      <Select

        value={selectedCategory}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
      >
        <option value="" >
          Choose an existing one
        </option>
        {categories.map((cat) => (
          <option key={cat[1].category}>
            {cat[1].category}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

ChooseExistingCategory.propTypes = {
  selectedCategory: PropTypes.string,
  func: PropTypes.func,
  categories: PropTypes.array
}

export default ChooseExistingCategory
