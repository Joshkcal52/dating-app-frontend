import React, { useState, useEffect } from "react";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Calendar />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
