import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AuthContext";
import { createQuestion } from "../../services/quiz.services";
import { createQuiz } from "../../services/quiz.services";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Button,
  Text,
  Grid,
  Flex,
  HStack,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import {
  createCategory,
  getAllCategories,
} from "../../services/category.services";

const QuizForm = () => {
  const { user, userData } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [totalPoints, setTotalPoints] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);

  const [selectedOption, setSelectedOption] = useState("Open");
  const [timeLimit, setTimeLimit] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeButton, setActiveButton] = useState("chose");

  const [showQuestions, setShowQuestions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleQuestionsButtonClick = () => {
    setShowQuestions(!showQuestions);
  };

  const handleButtonClick = (button) => {
    setCategory("");
    setActiveButton(button);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  //   const handleNewCategoryChange = (e) => {
  //     setNewCategory(e.target.value);
  //     setSelectedCategory(""); // Clear the selected category when a new category is entered
  //   };

  useEffect(() => {
    getAllCategories().then((res) => setCategories(Object.entries(res)));
  }, [categories]);

  const handleTest = (e) => {
    e.preventDefault();
    console.log(categories);
  };

  //   function onValueChange(event) {
  //     setSelectedOption(event.target.value);
  //   }

  const handleQuestionChange = (value) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      question: value,
    }));
  };

  const handleOptionChange = (optionIndex, value) => {
    setCurrentQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions[optionIndex] = value;
      return { ...prevQuestion, options: updatedOptions };
    });
  };

  const handleCorrectAnswerChange = (value) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      correctAnswer: value,
    }));
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setQuestionNum(questionNum + 1);
  };
  const showFormHandler = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createQuiz(
      quizName,
      userData.handle,
      numQuestions,
      totalPoints,
      selectedOption,
      timeLimit,
      category ? category : selectedCategory
    )
      .then((quiz) => {
        const questionPromises = questions.map((question) => {
          return createQuestion(question, quiz.id);
        });

        {
          category
            ? createCategory(category).then((category) => console.log(category))
            : null;
        }
      })
      .then((res) => setQuestions([]))
      .catch((error) => {
        console.error("Error creating quiz:", error.message);
      });
    setQuestionNum(1);
    setQuizName("");
  };

  return (
    <Grid
      templateColumns="1fr"
      alignItems="center" // Corrected attribute name
      maxWidth="800px"
      margin="auto"
      p={4}
      borderRadius="3%"
      boxShadow="md"
      borderColor="brand.200" // Corrected attribute name
      borderWidth={"thick"} // Optional: Set border width
      color="black" // Black text color
    >
      {!showForm ? (
        <Button
          onClick={showFormHandler}
          colorScheme="black"
          variant="solid"
          size="md"
          gridColumn="span 2"
          background={"blue.400"}
        >
          Create Quiz
        </Button>
      ) : (
        <form>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            gridColumn="span 2"
            w={450}
            mb={4}
          >
            <Center>
              <div>
                <FormControl color="black" mb={2} flex="2" paddingRight={4}>
                  <FormLabel fontSize="lg">Quiz Name:</FormLabel>
                  <Input
                    color="black"
                    type="text"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    variant="filled"
                    focusBorderColor="black"
                    size="md"
                    bg="brand.300"
                  />
                </FormControl>
              </div>
            </Center>

            <Center>
              <div>
                <RadioGroup
                  colorScheme="yellow"
                  onChange={setSelectedOption}
                  value={selectedOption}
                  gridColumn="span 2"
                  spacing={4}
                >
                  <FormLabel fontSize="lg">Type of quiz:</FormLabel>
                  <HStack spacing={4}>
                    <Radio value="Private">
                      <Text color="black">Private</Text>
                    </Radio>
                    <Radio value="Open">
                      <Text color="black">Open</Text>
                    </Radio>
                  </HStack>
                </RadioGroup>
              </div>
            </Center>
          </Box>

          {/* Your buttons with added spacing */}
          <Button
            onClick={() => handleButtonClick("create")}
            mr={4}
            background={"blue.400"}
          >
            Create New Category
          </Button>

          <Button
            onClick={() => handleButtonClick("choose")}
            background={"blue.400"}
          >
            Choose Existing Category
          </Button>

          {activeButton === "create" && (
            <FormControl color="black" mb={2} gridColumn="span 2">
              <FormLabel fontSize="lg">Create new category:</FormLabel>
              <Input
                color="black"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="filled"
                focusBorderColor="black"
                bg="brand.300"
              />
            </FormControl>
          )}

          {activeButton === "choose" && (
            <FormControl color="black" mb={2} gridColumn="span 2">
              <FormLabel fontSize="lg">Choose an existing one:</FormLabel>
              <Select
                color="black"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                variant="filled"
                focusBorderColor="black"
              >
                <option value="" color="black">
                  Choose an existing one
                </option>
                {categories.map((cat) => (
                  <option key={cat[1].category} color="black">
                    {cat[1].category}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            gridColumn="span 2"
            width={"maxWidth"}
          >
            <FormControl color="black" mb={2} flex="1" maxW="100%">
              <FormLabel fontSize="medium" h={10}>
                Time limit in hours:
              </FormLabel>
              <Input
                type="text"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                variant="filled"
                focusBorderColor="black"
                bg="brand.300"
                placeholder="Min: 30 minutes, Max: 24 hours"
              />
            </FormControl>

            <FormControl color="black" mb={2} flex="1" ml={4} maxW="30%">
              <FormLabel fontSize="medium" h={10}>
                Number of Questions:
              </FormLabel>
              <Input
                color="black"
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                variant="filled"
                focusBorderColor="black"
                bg="brand.300"
                placeholder="Min: 5"
              />
            </FormControl>

            <FormControl color="black" mb={2} flex="1" ml={4} maxW="30%">
              <FormLabel fontSize="medium" h={10}>
                Total Points:
              </FormLabel>
              <Input
                type="number"
                value={totalPoints}
                onChange={(e) => setTotalPoints(Number(e.target.value))}
                variant="filled"
                focusBorderColor="black"
                bg="brand.300"
                placeholder="Min: 5"
              />
            </FormControl>
          </Flex>

          <Button
            onClick={handleQuestionsButtonClick}
            mb={4}
            background={"blue.400"}
          >
            Show Questions
          </Button>

          {showQuestions && questionNum <= numQuestions && (
            <>
              <Box>
                <HStack spacing={4}>
                  <Checkbox
                    colorScheme="yellow"
                    isChecked={isOpen}
                    onChange={() => setIsOpen(!isOpen)}
                  >
                    <Text color="black">Open ended</Text>
                  </Checkbox>
                </HStack>
              </Box>
              <FormControl color="black" mb={2} gridColumn="span 2">
                <Box mb={2} gridColumn="span 2">
                  {questionNum <= numQuestions ? (
                    <Text color="black">This is question ℕ {questionNum} </Text>
                  ) : (
                    <Text color="black">You should submit now!!🎈🎈🎈</Text>
                  )}
                </Box>
                <FormLabel fontSize="lg">Question:</FormLabel>
                <Input
                  type="text"
                  value={currentQuestion.question}
                  onChange={(e) => handleQuestionChange(e.target.value)}
                  variant="filled"
                  focusBorderColor="black"
                  bg="brand.300"
                />
              </FormControl>

              {!isOpen && (
                <>
                  <Box>
                    {currentQuestion.options.map((option, optionIndex) => (
                      <FormControl key={optionIndex} color="black" mb={2}>
                        <FormLabel fontSize="lg">
                          Option {optionIndex + 1}:
                        </FormLabel>
                        <Input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(optionIndex, e.target.value)
                          }
                          variant="filled"
                          focusBorderColor="black"
                          bg="brand.300"
                        />
                      </FormControl>
                    ))}
                  </Box>
                  <FormControl color="black" mb={2}>
                    <FormLabel fontSize="lg">Correct Answer:</FormLabel>
                    <Input
                      type="text"
                      value={currentQuestion.correctAnswer}
                      onChange={(e) =>
                        handleCorrectAnswerChange(e.target.value)
                      }
                      variant="filled"
                      focusBorderColor="black"
                      bg="brand.300"
                    />
                  </FormControl>
                </>
              )}
              {questionNum <= numQuestions && (
                <Button
                  type="button"
                  w={120}
                  onClick={addQuestion}
                  colorScheme="black"
                  variant="solid"
                  size="md"
                  mt={2}
                  background={"blue.400"}
                >
                  Add Question
                </Button>
              )}
            </>
          )}
          <Box>
            {questionNum > numQuestions && (
              <Button
                w={120}
                onClick={handleSubmit}
                colorScheme="black"
                variant="solid"
                size="md"
                mt={2}
                background={"blue.400"}
              >
                Submit
              </Button>
            )}
          </Box>
          <Box>
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              colorScheme="black"
              variant="solid"
              size="md"
              mt={2}
              background={"blue.400"}
            >
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Grid>
  );
};

export default QuizForm;
