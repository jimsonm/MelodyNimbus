import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfile/UserProfile";


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
        </Route>
        <Route exact path='/users/:id/:trackid'>
          <h1>Hello</h1>
        </Route>
        <Route exact path='/users/:id'>
          <h1>Hello2</h1>
          <UserProfilePage />
        </Route>
        <Route exact path ='/users'>
          <h1>Hello3</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;