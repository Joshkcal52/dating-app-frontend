import "./styles/App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginContainer from "./routing/LoginContainer";
import DefaultContainer from "./routing/DefaultContainer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginContainer} />

        <Redirect exact from="/" to="/login" />

        <Route component={DefaultContainer} />
      </Switch>
    </div>
  );
}
export default App;
