import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/AuthContext"
import { getAllQuizzes } from "../../services/quiz.services";
import AllQuizzes from "../AllQuizzes/AllQuizzes";

const Quizzes = ({ isLogged }) => {
//users- all
const [allQuizzes, setAllQuizzes] = useState();
const [openQuizzes, setOpenQuizzes] = useState();
const [privateQuizzes, setPrivateQuizzes] = useState();
const [finishedQuizzes, setFinishedQuizzes] = useState(); // filter all finished quizzes for educator
const [mostPopular, setMostPopular] =useState(); //filter the most solved quizzes
//students view
const [targetedQuizzes, setTargetedQuizzes] = useState(); // needs to filter from the user entity category of most solved quizzes so then we can show some random quizzes of this type
//educator view
const [activeQuizzes, setActiveQuizzes] =useState(); // needs to filter all active quizzes

useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        setAllQuizzes(res);
        const filteredQuizzes = res.filter((quiz) => quiz.selectedOption === "Open");
        setOpenQuizzes(filteredQuizzes);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, [allQuizzes]);

  return (
    <div>
      {!isLogged ? (<AllQuizzes quizzes={openQuizzes}></AllQuizzes>)
      :(<AllQuizzes quizzes={allQuizzes}></AllQuizzes>)}
      {/* <AllQuizzes quizzes={allQuizzes}></AllQuizzes> */}
       {/* <div><AllOngoingQuizzes></AllOngoingQuizzes></div>
       <div><AllTargetedQuizzes quizzes={targetedQuizzes}></AllTargetedQuizzes></div> */}
    </div>

  );
}
export default Quizzes;

    