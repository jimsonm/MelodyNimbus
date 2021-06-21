import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './DeleteImage.css';
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';

function DeleteImage({ toggle, toggle3, img, setShowDeleteModal }) {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);

    const deleteImg = async (e) => {
        console.log('sdada', img);
        e.preventDefault();
        if (img === 'avatar') {
            deleteAvatar();
        } else if (img === 'header') {
            deleteHeader();
        }
        setShowDeleteModal(false);
    }

    const deleteAvatar = async (e) => {
        await dispatch(sessionActions.editProfileAvatar({
            image: "",
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
        toggle();
    };

    const deleteHeader = async (e) => {
        await dispatch(sessionActions.editProfileHeader({
            image: '',
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
        toggle3();
    };

    return (
        <div>
            <div>Are you sure?</div>
            <form onSubmit={deleteImg}>
            <button className='cancelButton'>Cancel</button>
            <button type='submit' onSubmit={deleteImg} className='saveButton'>Delete</button>
            </form>
        </div>
    )
}

export default DeleteImage;