import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadTrack from '../UploadTrack/UploadTrack';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  const redirect = async (e) => {
    <UploadTrack />
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
        <NavLink exact to='/Tracks' onClick={redirect}>
          Upload
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;