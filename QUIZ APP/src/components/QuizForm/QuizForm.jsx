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
import SetQuizTimer from "./SetQuizTimer/SetQuizTimer";

const QuizForm = () => {
  const { user, userData } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [totalPoints, setTotalPoints] = useState(5);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);

  const [selectedOption, setSelectedOption] = useState("Open");
  const [availability, setAvailability] = useState(1);
  const [unit, setUnit] = useState("hours");
  const [unitTimer, setUnitTimer] = useState("minutes");
  const [timerLimit, setTimerLimit] = useState(5);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeButton, setActiveButton] = useState("chose");
  const [typeOfTime] =useState();
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
    if(!quizName) {
      alert("You cannot submit an empty quiz title.");
      return
    }
    if(quizName.length < 6 || quizName.length > 50) {
      alert(`Your title should be between 6 to 50 characters. Yours is ${quizName.length}.`);
      return
    }
    if(!numQuestions) {
      alert('You need to add questions in order to submit.');
      return
    }
    if(numQuestions < 5 || numQuestions > 15) {
      alert(`Your questions must be between 5 and 15. Yours are ${numQuestions}.`)
      return
    }
    if(!totalPoints) {
      alert(`You must add total points to the quiz.`)
      return
    }
    if(totalPoints === 0 || totalPoints < numQuestions) {
      alert(`Your points cannot be 0 and they should be equal or more to the number of questions.`)
      return
    }
    if (unit === "days" && availability < 1) {
      alert("Availability cannot be set under a day.");
      return;
    }
    if (unit === "days" && availability > 7) {
      alert("Availability cannot be set be more then a week.");
      return;
    }
    if (unit === "hours" && availability < 1) {
      alert("Availability cannot be set under an hour.");
      return;
    }
    if (unit === "hours" && availability > 24) {
      alert("Availability cannot be set be more then 24 hours.");
      return;
    }
    if(unitTimer === "hours" && timerLimit < 1) {
      alert("Timer cannot be under an hour. Change to minutes if you want a shorter times.")
      return;
    }
    if(unitTimer === "hours" && timerLimit > 24) {
      alert(`Timer cannot be set to more then 24 hours.`)
      return;
    }
    if(unitTimer === "minutes" && timerLimit > 60) {
      alert(`Timer cannot be set to more then 60 minutes. Change to hours if you want longer times.`)
      return;
    }
    if(unitTimer === "minutes" && timerLimit < 5) {
      alert(`Timer cannot be set to less then 5 minutes.`)
      return;
    }
    if(!selectedCategory && (category.length < 4 || category.length > 20 )) {
      alert(`You category name must be between 4 and 20 characters. Yours is ${category.length}`)
      return
    }
    if(!currentQuestion.question) {
      alert(`You must provide a question.`)
      return
    }
    if(currentQuestion.question.length < 6 || currentQuestion.question.length > 45 ) {
      alert(`Your question must be between 6 and 45 characters. Yours is ${currentQuestion.question.length}.`)
      return
    }
    if(!currentQuestion.options) {
      alert(`You must provide options to the question.`)
      return
    }
    if(currentQuestion.options.length < 4) {
      alert(`You must fill all the option fields.`)
      return
    }
    if(!currentQuestion.options[0] || currentQuestion.options[0] === "") {
      alert(`Option 1 cannot be empty.`)
      return
    }
    if(!currentQuestion.options[1] || currentQuestion.options[1] === "") {
      alert(`Option 2 cannot be empty.`)
      return
    }
    if(!currentQuestion.options[2] || currentQuestion.options[2] === "") {
      alert(`Option 3 cannot be empty.`)
      return
    }
    if(!currentQuestion.options[3] || currentQuestion.options[3] === "") {
      alert(`Option 4 cannot be empty.`)
      return
    }
    if(!currentQuestion.correctAnswer || currentQuestion.correctAnswer === "") {
      alert(`You must provide the question with a correct answer.`)
      return
    }
    
    
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
    
  const convertedAvailability = unit === "days" ? availability * 24 : availability;
  const convertedTimerLimit = unitTimer === "hours" ? timerLimit * 60 : timerLimit;

    createQuiz(
      quizName,
      userData.handle,
      numQuestions,
      totalPoints,
      selectedOption,
      convertedAvailability,
      convertedTimerLimit,
      category ? category : selectedCategory,
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
    setTimerLimit(30);
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
          <SetQuizTimer
            time={timerLimit}
            unitTimer={unitTimer}
            onChangeTime={(value) => setTimerLimit(value)}
            onChangeUnit={(selectedUnit) => setUnitTimer(selectedUnit)}
          ></SetQuizTimer>
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
