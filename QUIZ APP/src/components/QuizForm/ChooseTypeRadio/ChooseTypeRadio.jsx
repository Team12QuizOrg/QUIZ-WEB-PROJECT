import { RadioGroup, FormLabel, HStack, Text, Radio } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ChooseTypeRadio = ({ setSelectedOption, selectedOption }) => {
  return (
    <RadioGroup
      colorScheme="yellow"
      onChange={setSelectedOption}
      value={selectedOption}
      gridColumn="span 2"
      spacing={4}
    >
      <FormLabel fontSize="lg" w={100}>Type of quiz:</FormLabel>
      <HStack spacing={4} w={200}>
        <Radio value="Private" >
          <Text >Private</Text>
        </Radio>
        <Radio value="Open">
          <Text >Open</Text>
        </Radio>
      </HStack>
    </RadioGroup>
  )
}

ChooseTypeRadio.propTypes = {
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.string
}

export default ChooseTypeRadio
