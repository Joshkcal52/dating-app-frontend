import { Route, Switch } from "react-router-dom";

import Navbar from "../navigation/Navbar";
import Home from "../pages/Home";
import Contacts from "../pages/Contacts";
import Event from "../pages/Events";
import Categories from "../pages/Categories";

export default function DefaultContainer() {
  return (
    <>
      <div className="body-container">
        <Route component={Navbar} />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/events" component={Event} />
          <Route path="/category" exact component={Categories} />
        </Switch>
      </div>
    </>
  );
}
