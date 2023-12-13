import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ChooseTotalPoints = ({ totalPoints, func }) => {
  return (

    <FormControl mb={2} flex="1" ml={4} maxW="100%">
      <FormLabel fontSize="medium" h={10}>
        Points Per Question:
      </FormLabel>
      <Input
        type="number"
        value={totalPoints}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="grey"
        placeholder="Min: 5"
      />
    </FormControl>
  )
}

ChooseTotalPoints.propTypes = {
  totalPoints: PropTypes.number,
  func: PropTypes.func
}

export default ChooseTotalPoints
