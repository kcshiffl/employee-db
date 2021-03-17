import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from "./components/home/Home";
import SignIn from "./components/authentication/SignIn";
import NotFoundPage from "./components/error/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </ Router>
  );
}

// export default withAuthenticator(App);
export default App;
