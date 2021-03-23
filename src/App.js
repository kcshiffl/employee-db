import React, { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';

/** Routing pages **/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

/** Pages **/
import Home from "./components/home/Home";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import NotFoundPage from "./components/error/NotFoundPage";
import UserPage from "./components/userpage/UserPage";

function App() {
  let [user, setUser] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/user/" component={UserPage} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </ Router>
  );
}

// export default withAuthenticator(App);
export default App;
