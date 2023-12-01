import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AuthContext";
import {
  createQuestion,
  getAllQuestionsByCategory,
} from "../../services/quiz.services";
import { createQuiz } from "../../services/quiz.services";
import { Box, Grid, Flex, Center, Image, Text } from "@chakra-ui/react";
import {
  createCategory,
  getAllCategories,
} from "../../services/category.services";
import CreateButton from "./CreateButton/CreateButton";
import ChooseTypeRadio from "./ChooseTypeRadio/ChooseTypeRadio";
import QuizName from "./QuizName/QuizName";
import CreateNewCategoryButton from "./CreateNewCategoryButton/CreateNewCategoryButton";
import CreateNewCategory from "./CreateNewCategory/CreateNewCategory";
import ChooseExistingCategory from "./ChooseExistingCategory/ChooseExistingCategory";
import SetTimeLimit from "./SetTimeLimit/SetTimeLimit";
import ChooseNumberOfQuestions from "./ChooseNumberOfQuestions/ChooseNumberOfQuestions";
import ChooseTotalPoints from "./ChooseTotalPoints/ChooseTotalPoints";
import ChooseCategoryButton from "./ChooseCategoryButton/ChooseCategoryButton";
import WriteQuestion from "./WriteQuestion/WriteQuestion";
import ChooseCorrectOption from "./ChooseCorrectOption/ChooseCorrectOption";
import AddQuestionButton from "./AddQuestionButton/AddQuestionButton";
import SubmitButton from "./SubmitButton/SubmitButton";
import CancelButton from "./CancelButton/CancelButton";
import CreateQuestionButton from "./CreateQuestionsButton/CreateQuestionButton";
import CreateOptions from "./CreateOptions/CreateOptions";

const QuizForm = () => {
  const { user, userData } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [totalPoints, setTotalPoints] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);

  const [selectedOption, setSelectedOption] = useState("Open");
  const [timeLimit, setTimeLimit] = useState(30);
  const [availability, setAvailability] = useState(1);
  const [unit, setUnit] = useState("hours");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeButton, setActiveButton] = useState("chose");

  const [showQuestions, setShowQuestions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForChoosingCategory, setIsOpenForChoosingCategory] =
    useState(false);

  const [questions2, setQuestions2] = useState({});

  const handleQuestionsButtonClick = () => {
    setShowQuestions(!showQuestions);
  };

  const handleButtonClick = (button) => {
    setCategory("");
    setActiveButton(button);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    getAllQuestionsByCategory(value).then((res) => setQuestions2(res));
  };

  useEffect(() => {
    getAllCategories().then((res) => setCategories(Object.entries(res)));
  }, [categories]);

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
      unit === "days" ? availability * 24 : availability,
      category ? category : selectedCategory
    )
      .then((quiz) => {
        questions.map((question) => {
          return createQuestion(
            question,
            quiz.id,
            category ? category : selectedCategory
          );
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
    setTimeLimit(30);
    setTotalPoints(1);
    setNumQuestions(1);
    setIsOpen(false);
    setCategory("");
    setShowQuestions(false);
  };

  return (
    <Grid
      templateColumns="1fr"
      alignItems="center"
      margin="auto"
      p={4}
      w={"100%"}
      color="black"
    >
      <Box
        padding={"20px"}
        colorscheme="black"
        variant="solid"
        size="md"
        gridColumn="span 2"
        borderRadius="3%"
        boxShadow="md"
        borderColor="brand.200"
        borderWidth={"thick"}
        alignItems="center"
        maxW="100%"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gridColumn="span 2"
          maxW="100%"
          mb={4}
          alignItems="center"
        >
          <Center>
            <div>
              <QuizName
                quizName={quizName}
                setQuizName={(e) => setQuizName(e.target.value)}
              />
            </div>
          </Center>
          <Center>
            <div>
              <Image
                className="logo-image"
                src="assets\logo2.png"
                alt="logo"
                w={10}
                h={10}
                maxW={40}
                maxH={40}
                rounded={"full"}
              />
            </div>
          </Center>

          <Center>
            <div>
              <ChooseTypeRadio
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </div>
          </Center>
        </Box>
        <CreateNewCategoryButton
          func={() => handleButtonClick("create")}
          label={"Create new category"}
        />
        <ChooseCategoryButton
          func={() => handleButtonClick("choose")}
          label={"Choose category"}
        />

        {activeButton === "create" && (
          <CreateNewCategory
            category={category}
            func={(e) => setCategory(e.target.value)}
          />
        )}

        {activeButton === "choose" && (
          <ChooseExistingCategory
            selectedCategory={selectedCategory}
            func={(e) => handleCategoryChange(e.target.value)}
            categories={categories}
          />
        )}

        <Flex
          flexDirection="row"
          justifyContent="space-between"
          gridColumn="span 2"
          width={"maxWidth"}
        >
          <SetTimeLimit
            timeLimit={availability}
            unit={unit}
            onChangeTime={(value) => setAvailability(value)}
            onChangeUnit={(selectedUnit) => setUnit(selectedUnit)}
          />
          <ChooseNumberOfQuestions
            numQuestions={numQuestions}
            func={(e) => setNumQuestions(Number(e.target.value))}
          />

          <ChooseTotalPoints
            totalPoints={totalPoints}
            func={(e) => setTotalPoints(Number(e.target.value))}
          />
        </Flex>

        <CreateQuestionButton func={handleQuestionsButtonClick} />

        {showQuestions && questionNum <= numQuestions && (
          <>
            {!isOpen && !isOpenForChoosingCategory && (
              <>
                <Box>
                  <WriteQuestion
                    questionNum={questionNum}
                    numQuestions={numQuestions}
                    currentQuestion={currentQuestion}
                    func={(e) => handleQuestionChange(e.target.value)}
                    questions={questions2}
                  />
                  {currentQuestion.options.map(
                    (option, optionIndex, historyOption) => (
                      <CreateOptions
                        key={optionIndex}
                        optionIndex={optionIndex}
                        option={option}
                        value={historyOption[optionIndex]}
                        func={(e) =>
                          handleOptionChange(optionIndex, e.target.value)
                        }
                      />
                    )
                  )}
                </Box>

                <ChooseCorrectOption
                  currentQuestion={currentQuestion}
                  func={(e) => handleCorrectAnswerChange(e.target.value)}
                />
              </>
            )}
            <Box>
              {questionNum <= numQuestions && (
                <AddQuestionButton func={addQuestion} />
              )}
            </Box>
          </>
        )}
        <Box>
          {questionNum === numQuestions + 1 && (
            <SubmitButton func={handleSubmit} />
          )}
        </Box>
        <Box>
          <CancelButton func={() => setShowForm(false)} />
        </Box>
      </Box>
    </Grid>
  );
};

export default QuizForm;
