import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const WriteQuestion = ({
  questionNum,
  numQuestions,
  currentQuestion,
  func,
  questions,
}) => {
  const uniqueQuestions = new Set();
  return (
    <>
      <FormControl mb={2} gridColumn="span 2">
        <FormLabel fontSize="lg">Choose an existing one:</FormLabel>
        <Select

          value={currentQuestion.question}
          onChange={func}
          variant="filled"
          focusBorderColor="black"
        >
          <option value="" >
            Choose a question
          </option>
          {Object.entries(questions).map((cat, index) => {
            const question = cat[1].question;

            if (!uniqueQuestions.has(question)) {
              uniqueQuestions.add(question);

              return (
                <option key={cat[0]} >
                  {question}
                </option>
              );
            }
            return null;
          })}
        </Select>
      </FormControl>

      <FormControl mb={2} gridColumn="span 2">
        <Box mb={2} gridColumn="span 2">
          {questionNum <= numQuestions ? (
            <Text>This is question ℕ {questionNum} </Text>
          ) : (
            <Text > Go Go!!🎈🎈🎈</Text>
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
    </>
  );
};

WriteQuestion.propTypes = {
  questionNum: PropTypes.number,
  numQuestions: PropTypes.number,
  func: PropTypes.func,
  currentQuestion: PropTypes.object,
  questions: PropTypes.object,
};

export default WriteQuestion;
