import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/AuthContext"
import { getAllQuizzes } from "../../services/quiz.services";
import AllQuizzes from "../AllQuizzes/AllQuizzes";
import { Text, Box } from "@chakra-ui/react";

const Quizzes = ({ isLogged }) => {
  //users- all
  const [allQuizzes, setAllQuizzes] = useState();
  const [openQuizzes, setOpenQuizzes] = useState();
  const [privateQuizzes, setPrivateQuizzes] = useState();
  const [finishedQuizzes, setFinishedQuizzes] = useState(); // filter all finished quizzes for educator
  const [mostPopular, setMostPopular] = useState(); //filter the most solved quizzes
  //students view
  const [targetedQuizzes, setTargetedQuizzes] = useState(); // needs to filter from the user entity category of most solved quizzes so then we can show some random quizzes of this type
  //educator view
  const [activeQuizzes, setActiveQuizzes] = useState(); // needs to filter all active quizzes

  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        setAllQuizzes(res);
        // Display Open Q
        const filteredOpenQuizzes = res.filter((quiz) => quiz.selectedOption === "Open");
        setOpenQuizzes(filteredOpenQuizzes);
        // Display Ongoing Q
        const filteredOngoingQuizzes = res.filter((quiz) => quiz.state === "ongoing");
        setActiveQuizzes(filteredOngoingQuizzes);
        // Display Popular Q
        const filteredPopularQuizzes = res.filter((quiz) => Object.keys(quiz.scoreBoards).length > 0);
        const sortedPopularQuizzes = filteredPopularQuizzes.sort(
          (quizA, quizB) => Object.keys(quizB.scoreBoards).length - Object.keys(quizA.scoreBoards).length
        );

        const topPopularQuizzes = sortedPopularQuizzes.slice(0, 5);
        setMostPopular(topPopularQuizzes);
        // Add more filtered quizzes
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  return (
    <Box>
      <Box mb="50px">
        {!isLogged ? (
          <AllQuizzes quizzes={openQuizzes} catName={'Open Quizzes'} />
        ) : (
          <AllQuizzes quizzes={allQuizzes} catName={'All Quizzes'} />
        )}
      </Box>
      <Box mb="50px">
        {!isLogged ? (
          <AllQuizzes quizzes={activeQuizzes} catName={'Ongoing Quizzes'} />
        ) : (
          <Text>You need to Log In to view all Ongoing Quizzes</Text>
        )}
      </Box>
      <Box mb="50px">
        {!isLogged ? (
          <AllQuizzes quizzes={mostPopular} catName={'Most Popular Quizzes'} />
        ) : (
          <Text>You need to Log In to view all Popular Quizzes</Text>
        )}
      </Box>
    </Box>
  );
}
export default Quizzes;

