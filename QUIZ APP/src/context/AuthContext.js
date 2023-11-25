import { createContext } from "react";

const AppContext = createContext({
    user: null,
    userData: null,
    setContext() {
      // real implementation comes from App.jsx
    },
    users: null,
    setUsers:() =>{

    },
    quzzes: null,
    setQuizzes: () => {
      
    }
});
export default AppContext;