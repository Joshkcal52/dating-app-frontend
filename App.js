import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Calendar from "./src/pages/Calendar";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Contacts from "./src/pages/Contacts";
import MobileNavbar from "./src/navigation/MobileNavbar";
import { useAuthInfo } from "./context/AuthContext";

function App() {}
const { isLoggedIn } = useAuthInfo();

return (
  <div className="App">
    {isLoggedIn ? <AuthHeader /> : <Header />}

    <Switch>
      <Route component={DefaultContainer} />
      <Route exact path="/" component={LandingPage} />
    </Switch>

    <Footer />
  </div>
);

export default App;
