import React, { useState } from 'react';
import UserPicture from './UserPicture';
import './UserPicture.css'

function UserPictureModal({imgSrc, setShowPictureModal, avatar_img}) {
    return (
        <UserPicture imgSrc={imgSrc} setShowPictureModal={setShowPictureModal} avatar_img={avatar_img}/>
    );
}

export default UserPictureModal;