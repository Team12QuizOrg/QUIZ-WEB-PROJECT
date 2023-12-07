import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const SetTimeLimit = ({ timeLimit, unit, onChangeTime, onChangeUnit }) => {
  const handleTimeChange = (value) => {
    onChangeTime(value)
  }

  const handleUnitChange = (selectedUnit) => {
    onChangeUnit(selectedUnit)
  }

  return (
    <FormControl mb={2} flex="1" maxW="100%">
      <FormLabel fontSize="medium" h={10}>
        Availability:
      </FormLabel>
      <Input
        type="text"
        value={timeLimit}
        onChange={(e) => handleTimeChange(e.target.value)}
        variant="filled"
        focusBorderColor="black"
        bg="grey"
        placeholder="Min: 1 hour, Max: 14 days"
      />
      <Select value={unit} onChange={(e) => handleUnitChange(e.target.value)} mt={2}>
        <option value="hours">Hours</option>
        <option value="days">Days</option>
      </Select>
    </FormControl>
  )
}

SetTimeLimit.propTypes = {
  timeLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.oneOf(['hours', 'days']),
  onChangeTime: PropTypes.func,
  onChangeUnit: PropTypes.func
}

export default SetTimeLimit
