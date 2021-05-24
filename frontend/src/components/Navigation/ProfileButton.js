import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const sessionUser = useSelector((state) => state.session.user);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

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

  // const editProfile = (e) => {
  //   e.preventDefault();
  //   return dispatch(sessionActions.createUser());
  // }

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            {/* <button onClick={editProfile}>Link to Profile</button> */}
            <div>
                {user && (
                    <div>
                      {console.log('>>>>>>>>>>>>', user.avatar_img)}
                      {console.log('<<<<<<<<<<', user)}
                        <h1>{user.display_name}</h1>
                        <img
                            style={{ width: "150px" }}
                            src={user.avatar_img}
                            alt="profile"
                        />
                    </div>
                )}
            </div>
          </li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;