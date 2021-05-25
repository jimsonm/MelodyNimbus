import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import EditUserProfile from './EditUserProfile';

function UserProfilePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [display_name, setDisplay_Name] = useState("");
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.editProfile({ display_name, first_name, last_name, city, country, bio, image }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div>
            {/* {console.log('made it to userprofile')}
            {console.log('41', sessionUser)} */}
            <div className='profileHeader'>
                <div>
                    {/* {console.log('43', sessionUser)} */}
                    {/* ask for help on why refreshing loses the picture */}
                    {/* <img
                        style={{ width: "150px" }}
                        src={sessionUser.avatar_img}
                        alt="profile"
                    /> */}
                    {/* make label on hover */}
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>
                </div>
                <div>
                    {/* {sessionUser.display_name} */}
                </div>
                <div>
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>
                </div>
            </div>
            <div>
                Banner
                {/* <button onClick={openProfileModal}>Edit</button> */}
                <button onClick={() => setShowModal(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        {/* <EditUserProfile /> */}
                    </Modal>
                )}
            </div>
            <div>Body</div>
        </div>
    );
}

export default UserProfilePage;