import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import * as sessionActions from "../../store/session";
import './EditUserProfile.css';
// import { Modal } from '../../context/Modal';

function EditUserProfile({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [display_name, setDisplay_Name] = useState(sessionUser.display_name);
    const [image, setImage] = useState(null);
    // const [image2, setImage2] = useState(null);
    const [first_name, setFirst_Name] = useState(sessionUser.first_name);
    const [last_name, setLast_Name] = useState(sessionUser.last_name);
    const [city, setCity] = useState(sessionUser.city);
    const [country, setCountry] = useState(sessionUser.country);
    const [bio, setBio] = useState(sessionUser.bio);
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { display_name, image, first_name, last_name, city, country, bio, id };
        await dispatch(sessionActions.editProfile(payload))
        setShowModal(false);
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div>
            <div className='editProfileContainer'>
                <div className='editProfileBanner'>
                    Edit Your Profile
            </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                <div class='editProfileImage'>
                    <label>
                        {/* <div class='editProfileImage'> */}
                        <img
                            style={{ width: "150px" }}
                            src={sessionUser?.avatar_img}
                            alt="profile"
                        />
                        <input type="file" onChange={updateFile} />
                        {/* </div> */}
                    </label>
                </div>
                <div class='editProfileDetails'>
                <label>
                    Display Name
                    <input
                        type="text"
                        value={display_name}
                        onChange={(e) => setDisplay_Name(e.target.value)}
                        required
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirst_Name(e.target.value)}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLast_Name(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Bio
                    <textarea
                        value={bio}
                        placeholder='Tell the world a little bit about yourself. The shorter the better.'
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                </div>
                </div>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" onSubmit={handleSubmit}>Save Changes</button>
            </form>
        </div>
    );
}

export default EditUserProfile;