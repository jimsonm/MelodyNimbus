import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfile/UserProfile";
import UsersContainer from "./components/UsersContainer/UsersContainer";
import HomePage from "./components/HomePage/HomePage";
import Tracks from "./components/Tracks/Tracks";
import Upload from './components/Upload/Upload';
import TrackPage from './components/TrackPage/TrackPage';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <HomePage isLoaded={isLoaded}/>
        </Route>
        <Route exact path='/users/:id/tracks'>
          <Navigation isLoaded={isLoaded} />
          <Tracks />
        </Route>
        <Route exact path='/users/:id/:track_id'>
          <Navigation isLoaded={isLoaded} />
          <TrackPage />
        </Route>
        <Route exact path='/users/:id'>
          <Navigation isLoaded={isLoaded} />
          <UserProfilePage />
        </Route>
        <Route exact path='/users'>
          <Navigation isLoaded={isLoaded} />
          <UsersContainer />
        </Route>
        <Route exact path='/upload'>
          <Navigation isLoaded={isLoaded} />
          <Upload />
        </Route>
      </Switch>
    </>
  );
}

export default App;