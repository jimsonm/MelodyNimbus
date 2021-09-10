import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCurrentSong, setCurrentSongState } from '../../store/current';


function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const currState = useSelector(state => state.current);
  // console.log(currState);

  const toProfile = () => {
    // dispatch(setCurrentSongState(currState));
    history.push(`/users/${sessionUser.id}`, currState)
  }

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
          src={sessionUser.avatar_img || 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-avatar-image.webp'}
          alt="profile"
          className="profileButtonImg"
        />
        {sessionUser.display_name}
        {/* <i className="fas fa-user-circle" />Test */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-dropdown-li1">
            {/* <NavLink to={`/users/${sessionUser.id}`} className='ProfileNavLink' activeClassName='whiteActive'> */}
              <div className='ProfileLinkDiv' onClick={() => toProfile()}>
                Profile
              </div>
            {/* </NavLink> */}
          </li>
          <li className="profile-dropdown-li2" onClick={logout}>
            {/* <button onClick={logout} className='logoutButton'>Log Out</button> */}
            Log Out
          </li>
        </ul>
      )
      }
    </>
  );
}

export default ProfileButton;