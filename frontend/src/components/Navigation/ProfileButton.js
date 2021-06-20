import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    const profileButton = document.querySelector(".profileButton");
    if (showMenu) return;
    setShowMenu(true);
    profileButton.classList.add("active");
  };

  useEffect(() => {
    const profileButton = document.querySelector(".profileButton");
    if (!showMenu) return profileButton.classList.remove("active");
    
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} className='profileButton'>
        <img
          src={sessionUser.avatar_img}
          alt="profile"
          className="profileButtonImg"
        />
        {sessionUser.display_name}
        {/* <i className="fas fa-user-circle" />Test */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-dropdown-li">
            <NavLink to={`/users/${sessionUser.id}`} className='ProfileNavLink' activeClassName='whiteActive'>
              Profile
            </NavLink>
          </li>
          <li className="profile-dropdown-li">
            <button onClick={logout} className='logoutButton'>Log Out</button>
          </li>
        </ul>
      )
      }
    </>
  );
}

export default ProfileButton;