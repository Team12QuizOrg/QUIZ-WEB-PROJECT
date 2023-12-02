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
        </div>
    );
};

export default QuizzPage;
