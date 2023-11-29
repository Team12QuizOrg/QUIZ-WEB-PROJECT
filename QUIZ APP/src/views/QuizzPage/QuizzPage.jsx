import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AuthContext";
import QuizForm from "../../components/QuizForm/QuizForm";
import Quizzes from "../../components/Quizzes/Quizzes";
const QuizzPage = () => {
    const { user } = useContext(AppContext);
    const [isLoggedIn, setIsLoggedIn] =useState();
    useEffect(() => {
        setIsLoggedIn(user !== null);
    }, [user]);

    return (
        <div>
            <div><Quizzes isLogged={isLoggedIn} /></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default QuizzPage;
 //TODO
    //check if a user is logged in
    // IF no user logged In : Display only Open Quizzes
    // IF logged display all quizzes
    //Quizzes accepts prop isLogged to do that