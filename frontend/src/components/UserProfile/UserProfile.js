import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import EditUserProfile from './EditUserProfile';
import { useParams } from 'react-router-dom';

function UserProfilePage({user}) {
    const userId = useParams();
    const dispatch = useDispatch();
    // dispatch(sessionActions.getProfile(userId))
    const sessionUser = useSelector((state) => state.session.user )
    const userProfile = useSelector((state) => state.user[userId.id]);
    // const [display_name, setDisplay_Name] = useState("");
    const [image, setImage] = useState(null);
    // const [image2, setImage2] = useState(null);
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

    useEffect( () => {
        dispatch(userActions.getUsers(userId.id))
    }, [dispatch]);

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
        if (file) setImage(file);
    };

    return (
        <div>
            <div className='profileHeader'>
                <div>
                    <img
                        style={{ width: "150px" }}
                        src={userProfile?.avatar_img}
                        alt="profile"
                    />
                    {/* make label on hover */}
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>
                </div>
                <div>
                    {userProfile?.display_name}
                </div>
                <div>
                    <label>
                        <input type="file" onChange={updateFile} />
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
            <div>Body</div>
        </div>
    );
}

export default UserProfilePage;