import { Box, HStack, Checkbox, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ChooseOpenEnded = ({ check, func }) => {
  return (
    <Box>
      <HStack spacing={4}>
        <Checkbox
          colorScheme="yellow"
          isChecked={check}
          onChange={func}
        >
          <Text color="black">Find between category questions</Text>
        </Checkbox>
      </HStack>
    </Box>
  )
}

ChooseOpenEnded.propTypes = {
  check: PropTypes.bool,
  func: PropTypes.func
}

export default ChooseOpenEnded
