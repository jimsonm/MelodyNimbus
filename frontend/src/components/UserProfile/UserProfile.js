import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import EditUserProfile from './EditUserProfile';
import { useParams } from 'react-router-dom';
import Tracks from '../Tracks/Tracks';

function UserProfilePage() {
    const userId = useParams();
    const dispatch = useDispatch();
    // dispatch(sessionActions.getProfile(userId))
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);
    // const [display_name, setDisplay_Name] = useState("");
    const [avatar_img, setAvatar_Img] = useState(userProfile?.avatar_img);
    const [header_img, setHeader_Img] = useState(userProfile?.header_img);
    console.log('21', sessionUser);
    // const [first_name, setFirst_Name] = useState("");
    // const [last_name, setLast_Name] = useState("");
    // const [city, setCity] = useState("");
    // const [country, setCountry] = useState("");
    // const [bio, setBio] = useState("");
    // const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // console.log('25userId', userId);
    // console.log('26userId', userId.id);
    // console.log('user', user);

    useEffect(() => {
        dispatch(userActions.getUsers(userId.id))
    }, [dispatch, userId.id]);

    useEffect(() => {
        dispatch(sessionActions.editProfile({ avatar_img }))
    }, [dispatch, avatar_img, header_img])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfile({
            // sessionUser
            image : avatar_img,
            id : userId.id,
            display_name : sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
            // avatar_img
        }))
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfile({
            // sessionUser
            image : header_img,
            id : userId.id,
            display_name : sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
    };

    const updateFile = (e) => {
        console.log('46 made it here')
        const file = e.target.files[0];
        if (file) setAvatar_Img(file);
    };
    const updateFile2 = (e) => {
        const file = e.target.files[0];
        if (file) setHeader_Img(file);
    };

    return (
        <div>
            <div className='profileHeader' style={{ backgroundImage: `url(${userProfile?.header_img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
                <div>
                    <img
                        src={userProfile?.avatar_img}
                        alt="profile"
                        className="profileHeaderImg"
                    />
                    <label>
                        {userProfile?.id === sessionUser?.id
                            ? <form onSubmit={handleSubmit}>
                                <input type="file" onChange={updateFile} className='imageInputs' />
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