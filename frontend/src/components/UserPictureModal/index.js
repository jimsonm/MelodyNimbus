import React, { useState } from 'react';
import UserPicture from './UserPicture';
import './UserPicture.css'

function UserPictureModal({imgSrc}) {
    return (
        <UserPicture imgSrc={imgSrc}/>
    );
}

export default UserPictureModal;