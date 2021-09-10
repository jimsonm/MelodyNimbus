import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded, BottomAudioPlayer }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='buttonDiv'>
          <div className='buttonModalDiv'>
            <LoginFormModal />
          </div>
          <div className='buttonModalDiv'>
            <SignupFormModal />
          </div>

        </div>
      </>
    );
  }

  return (
    <div className='sticky'>
    <header className='navigationBar'>
      <div className='NavBarNavLinkDiv'>
        <NavLink exact to="/" className='NavBarNavLink' activeClassName="active">Home</NavLink>
      </div>
      <div className='NavBarNavLinkDiv'>
        <NavLink exact to='/upload' className='NavBarNavLink' user={sessionUser} activeClassName="active">
          Upload
        </NavLink>
      </div>
      <div className='navigationBarProfile'>
        {isLoaded && sessionLinks}
      </div>
    </header>
    </div>
  );
}

export default Navigation;