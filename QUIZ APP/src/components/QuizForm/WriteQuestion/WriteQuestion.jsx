import { Box, FormControl, FormLabel, Text, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const WriteQuestion = ({
  questionNum,
  numQuestions,
  currentQuestion,
  func,
}) => {
  return (
    <FormControl color="black" mb={2} gridColumn="span 2">
      <Box mb={2} gridColumn="span 2">
        {questionNum  <= numQuestions ? (
          <Text color="black">This is question ℕ {questionNum} </Text>
        ) : (
          <Text color="black"> Go Go!!🎈🎈🎈</Text>
        )}
      </Box>
      <FormLabel fontSize="lg">Question:</FormLabel>
      <Input
        type="text"
        value={currentQuestion.question}
        onChange={func}
        variant="filled"
        focusBorderColor="black"
        bg="brand.300"
      />
    </FormControl>
  );
};

WriteQuestion.propTypes = {
  questionNum: PropTypes.number,
  numQuestions: PropTypes.number,
  func: PropTypes.func,
  currentQuestion: PropTypes.object,
};

export default WriteQuestion;
