import { Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function LoginContainer() {
  return (
    <div className="login-routes-container">
      <Route exact path="/login" component={Login} />
      <Route path="/login/signup" component={Signup} />
    </div>
  );
}
