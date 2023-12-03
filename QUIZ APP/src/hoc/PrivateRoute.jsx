import { useContext,  } from "react";
import AppContext from "../context/AuthContext";
import { logoutUser } from "../services/auth.services";

export default function PrivateRoute({ children }) {
  const { userData, setContext } = useContext(AppContext);

  const onLogOut = () => {
    logoutUser().then(() => {
      setContext({
        user: null,
        userData: null,
      });
    });
  };

  if (userData && userData.isBlocked) {
    onLogOut();
    return
  }
  return children;
}
