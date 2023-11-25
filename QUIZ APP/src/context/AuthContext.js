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
});
export default AppContext;