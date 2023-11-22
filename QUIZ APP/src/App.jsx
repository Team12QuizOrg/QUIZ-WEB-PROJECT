import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './congif/firebase-config';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import AppContext from './context/AuthContext';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import Profile from './views/Profile/Profile';
import { getUserData } from './services/users.services';
import './App.css'


function App() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
  const [appState, setAppState] = useState({
    user,
    userData: null,
  })
  if (appState.user !== user) {
    setAppState({ user });
  }
  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch(e => alert(e.message));
  }, [user]);
  return (
    <div>
      <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/quizzes" element={<AuthenticatedRoute><Quizzes /></AuthenticatedRoute>} />
        <Route path="/quizzes/:id" element={<AuthenticatedRoute><SingleQuizView /></AuthenticatedRoute>} />
        <Route path="/about" element={<AuthenticatedRoute><About /></AuthenticatedRoute>} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {user === null && <Route path="/signin" element={<SignIn />} />}
          {user === null && <Route path="/signup" element={<SignUp />} />}
          {/* <Route path="/reset" element={<ResetPassword />} />*/}
          <Route path='/:profile' element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
          {/* <Route path='/:profile/usersposts' element={<AuthenticatedRoute><UsersPost /></AuthenticatedRoute>} />
        <Route path='/:profile/userscomments' element={<AuthenticatedRoute><UsersComments /></AuthenticatedRoute>} />
        <Route path='/adminPanel' element={<AuthenticatedRoute><AdminPanel /></AuthenticatedRoute>} />
        <Route path="*" element={<Error />} />  */}
        </Routes>
        {/* <Footer></Footer> */}
      </AppContext.Provider>
    </div>
  )
}


export default App
