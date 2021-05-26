import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfile/UserProfile";
import UsersContainer from "./components/UsersContainer/UsersContainer"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          <h1>Home</h1>
          <UsersContainer />
        </Route>
        <Route exact path='/users/:id/:trackid'>
          <h1>users/:id/:trackid</h1>
        </Route>
        <Route exact path='/users/:id'>
          <h1>users/:id</h1>
          <UserProfilePage />
        </Route>
        <Route exact path ='/users'>
          <h1>users</h1>
          <UsersContainer />
        </Route>
      </Switch>
    </>
  );
}

export default App;