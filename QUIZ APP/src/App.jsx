import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AppContext from "./context/AuthContext";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./views/Profile/Profile";
import About from "./views/About/About";
import Footer from "./components/Footer/Footer";
import AdminPanel from "./views/AdminPanel/AdminPanel";
import Error from "./views/Error/Error";
import { getUserData } from "./services/users.services";
import QuizzPage from "./views/QuizzPage/QuizzPage";
import SingleQuizView from "./components/SingleQuizView/SingleQuizView";
import SolvingQuizView from "./components/SolvingQuizView/SolvingQuizView";
import QuizForm from "./components/QuizForm/QuizForm";
import PrivateRoute from "./hoc/PrivateRoute";
import AssessmentQuiz from "./views/AssessmentQuiz/AssessmentQuiz";
import { AllCategoriesPage } from "./views/AllCategoriesPage/AllCategoriesPage";
import ToggleColorMode from "./components/ToggleColorMode/ToggleColorMode";

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: null,
  });
  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <div>
      <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
        <PrivateRoute>
          <ToggleColorMode></ToggleColorMode>
          <NavBar></NavBar>
        </PrivateRoute>
        <Routes>
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute> <Home /></PrivateRoute>} />
          <Route path="/QuizForm" element={<AuthenticatedRoute> <QuizForm /> </AuthenticatedRoute>} />
          <Route path="/quizzes/AllCategories" element={<AuthenticatedRoute><AllCategoriesPage /></AuthenticatedRoute>} />
          <Route path="/quizzes/AllCategories/:id" element={<AuthenticatedRoute><SingleQuizView /></AuthenticatedRoute>} />
          <Route path="/quizzes/AllCategories/:id/:id" element={<AuthenticatedRoute><SolvingQuizView /></AuthenticatedRoute>} />
          <Route path="/quizzes/AllQuizzes" element={<QuizzPage />} />
          <Route path="/quizzes/AllQuizzes/:id" element={<AuthenticatedRoute> <SingleQuizView /> </AuthenticatedRoute>} />
          <Route path="/quizzes/AllQuizzes/:id/:id" element={<AuthenticatedRoute><SolvingQuizView /></AuthenticatedRoute>} />
          <Route path="/About" element={<AuthenticatedRoute> <About /> </AuthenticatedRoute>} />
          <Route path="/quizzes/assessment/:id" element={<AuthenticatedRoute><AssessmentQuiz /></AuthenticatedRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {user === null && <Route path="/signin" element={<SignIn />} />}
          {user === null && <Route path="/signup" element={<SignUp />} />}
          {/* <Route path="/reset" element={<ResetPassword />} />*/}
          <Route path="/:profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
          {/* <Route path='/:profile/usersposts' element={<AuthenticatedRoute><UsersPost /></AuthenticatedRoute>} />
        <Route path='/:profile/userscomments' element={<AuthenticatedRoute><UsersComments /></AuthenticatedRoute>} />*/}
          <Route path="/adminPanel" element={<AuthenticatedRoute><AdminPanel /></AuthenticatedRoute>} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer></Footer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
