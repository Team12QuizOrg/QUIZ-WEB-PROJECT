import { Box, HStack, Checkbox, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";

const ChooseOpenEnded = ({ isOpen, func }) => {
  return (
    <Box>
      <HStack spacing={4}>
        <Checkbox
          colorScheme="yellow"
          isChecked={isOpen}
          onChange={func}
        >
          <Text color="black">Open ended</Text>
        </Checkbox>
      </HStack>
    </Box>
  );
};

ChooseOpenEnded.propTypes = {
  isOpen: PropTypes.bool,
  func: PropTypes.func,
};

export default ChooseOpenEnded;
