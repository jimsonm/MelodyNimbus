import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
    }, [dispatch]);

    useEffect(() => {
        dispatch(sessionActions.editProfile({ avatar_img, header_img }))
    }, [avatar_img, header_img])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     return dispatch(sessionActions.editProfile({ display_name, first_name, last_name, city, country, bio, image }))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         });
    // };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar_Img(file);
    };
    const updateFile2 = (e) => {
        const file = e.target.files[0];
        if (file) setHeader_Img(file);
    };

    return (
        <div>
            <div className='profileHeader' style={{ backgroundImage: `url(${userProfile?.header_img})`, objectFit: 'cover', backgroundRepeat: "no-repeat" }}>
                <div>
                    <img
                        src={userProfile?.avatar_img}
                        alt="profile"
                        className="profileHeaderImg"
                    />
                    {/* make label on hover */}
                    <label>
                        {userProfile?.id === sessionUser?.id
                            ? <input type="file" onChange={updateFile} className='imageInputs'/>
                            : null
                        }
                    </label>
                </div>
                <div className='profileNameContainer'>
                <div className='profileDisplayName'>
                    {userProfile?.display_name}
                </div>
                <div className='profileName'>
                    {userProfile?.first_name} {userProfile?.last_name}
                </div>
                </div>
                <div>
                    <label>
                        {userProfile?.id === sessionUser?.id
                            ? <input type="file" onChange={updateFile2} className='imageInputs'/>
                            : null
                        }
                    </label>
                </div>
            </div>
            <div>
                Banner
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
            <div>
                All Tracks
                <div>
                    <Tracks />
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;