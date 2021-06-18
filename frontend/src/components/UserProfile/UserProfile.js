import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import EditUserProfile from './EditUserProfile';
import UserPictureModal from '../UserPictureModal';
import { useParams } from 'react-router-dom';
import Tracks from '../Tracks/Tracks';

function UserProfilePage() {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);
    const [avatar_img, setAvatar_Img] = useState(userProfile?.avatar_img);
    const [header_img, setHeader_Img] = useState(userProfile?.header_img);
    // const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPictureModal, setShowPictureModal] = useState(false);
    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [opacity, setOpacity] = useState(false);
    // console.log('25userId', userId);
    // console.log('26userId', userId.id);
    // console.log('user', user);

    useEffect(() => {
        dispatch(userActions.getUsers(userId.id))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfile({
            // sessionUser
            image: avatar_img,
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
            // avatar_img
        }))
        dispatch(userActions.getUsers(userId.id))
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfile({
            // sessionUser
            image: header_img,
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
    };

    const updateFile = (e) => {
        console.log('64 made it here')
        const file = e.target.files[0];
        if (file) setAvatar_Img(file);
    };
    const updateFile2 = (e) => {
        const file = e.target.files[0];
        if (file) setHeader_Img(file);
    };

    const expandImage = () => {
        setShowPictureModal(true)
    }
    
    const toggle = () => {
        setToggleDisplay(hidden => !hidden)
        setOpacity(invis => !invis)
        const button = document.querySelector(".updateImage");
        if(opacity===false) {
            button.classList.add("opacity1")
        } else {
            button.classList.remove("opacity1")
        }
    }

    return (
        <div>
            <div className='profileHeader' style={{ backgroundImage: `url(${userProfile?.header_img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
                <div>
                    <div className='profileHeaderImgDiv'>
                    <img
                        src={userProfile?.avatar_img}
                        alt="profile"
                        className="profileHeaderImg"
                        onClick={expandImage}
                    />
                    <button class='updateImage' onClick={toggle}>Update Image</button>
                    {toggleDisplay && (
                    <div className='replaceDiv'>asddsaasdasdsadf</div>
                    )}
                    {toggleDisplay && (
                    <div className='deleteDiv'>zzzzzzzz</div>
                    )}
                    </div>
                    {showPictureModal === true ?
                        <Modal onClose={() => setShowPictureModal(false)}>
                            <UserPictureModal />
                        </Modal> : null}
                    <label>
                        {userProfile?.id === sessionUser?.id
                            ? <form onSubmit={handleSubmit}>
                                <input type="file" name="file" id="file" onChange={updateFile} className='imageInputs' />
                                <label for='file' className='imageUpload'>Update Image</label>
                                <br></br>
                                <br></br>
                                <button type="submit" onSubmit={handleSubmit}>Save Changes</button>
                            </form>
                            : null
                        }
                    </label>
                </div>
                <div className='profileNameContainer'>
                    <div className='profileDisplayName'>
                        {userProfile?.display_name}
                    </div>
                    {(userProfile?.first_name || userProfile?.last_name) && (userProfile.first_name !== "null" && userProfile.last_name !== "null")
                        ? <div className='profileName'>
                            {userProfile?.first_name} {userProfile?.last_name}
                        </div>
                        : null
                    }
                </div>
                <div className='rightDiv'>
                    {/* <label> */}
                    {userProfile?.id === sessionUser?.id
                        ? <form onSubmit={handleSubmit2} className='headerImgForm'>
                            <input type="file" onChange={updateFile2} className='imageInputs' />
                            <br></br>
                            <br></br>
                            <button type="submit" onSubmit={handleSubmit2}>Save Changes</button>
                        </form>
                        : null
                    }
                    {/* </label> */}
                </div>
            </div>
            <div className='editButtonDiv'>
                {userProfile?.id === sessionUser?.id
                    ? <button onClick={() => setShowModal(true)}>Edit</button>
                    : null
                }
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditUserProfile setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
            <div className='allTracksDiv'>
                All Tracks
                <div>
                    <Tracks />
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;