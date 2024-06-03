import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import SignIn from "../views/pages/SignIn";
import SignUp from "../views/pages/SignUp";


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <SignIn setCurrentUser={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignUp setCurrentUser={handleLogin} />
        </Route>
        {currentUser ? (
          <>
            <div className="container">
              <List />
              <Chat />
              <Detail />
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
};
