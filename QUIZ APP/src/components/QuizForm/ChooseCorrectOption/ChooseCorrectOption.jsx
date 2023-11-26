import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ChooseCorrectOption = ({ currentQuestion, func }) => {
  return (
    <FormControl color="black" mb={2}>
      <FormLabel fontSize="lg">Correct Answer:</FormLabel>
      <Input
        type="text"
        value={currentQuestion.correctAnswer}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="brand.300"
      />
    </FormControl>
  );
};

ChooseCorrectOption.propTypes = {
  currentQuestion: PropTypes.object,
  func: PropTypes.func,
};

export default ChooseCorrectOption;
