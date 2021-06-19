import React, { useState } from 'react';
import UserPicture from './UserPicture';
import './UserPicture.css'

function UserPictureModal({imgSrc, setShowPictureModal}) {
    return (
        <UserPicture imgSrc={imgSrc} setShowPictureModal={setShowPictureModal}/>
    );
}

export default UserPictureModal;