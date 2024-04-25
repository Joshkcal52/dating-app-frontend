import {
  useContext,
  createContext,
  useState,
  useCallback,
  useReducer,
} from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");

  const login = useCallback(
    (payload) => {
      const loginPromise = new Promise((resolve, reject) => {
        fetch("http://localhost:8089/user/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              return console.log("Error while logging in");
            }
          })
          .then((data) => {
            if (data) {
              console.log("data: ", data);
              Cookies.set("user_id", data?.auth_info?.user?.user_id);
              history.push("/home");
            }
          })
          .catch((error) => console.error(error));
      });

      loginPromise
        .then(() => {
          history.push("/home");
        })
        .catch(console.error);
    },
    [history]
  );

  const logout = useCallback(() => {
    const authToken = Cookies.get("auth_token");
    // awaitAPICall(
    //   "/user/logout",
    //   "PUT",
    //   { auth_token: authToken },
    //   null,
    //   null,
    //   (error) => console.error("Logout Error: ", error),
    //   signal
    // );

    Cookies.remove("auth_token");
    Cookies.remove("auth_expires");

    history.push("/login");
  }, [history]);

  const values = {
    // userInfo: state.auth.user,
    // authInfo: state.auth,
    errorMsg,
    login,
    logout,
    // hasPermission,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => {
  return useContext(AuthContext);
};
