import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './EditUserProfile.css';
// import { Modal } from '../../context/Modal';

function EditUserProfile({ setShowModal }) {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // const userProfile = useSelector((state) => state.user[userId.id]);
    const [display_name, setDisplay_Name] = useState(sessionUser.display_name);
    const [image, setImage] = useState(sessionUser.avatar_img);
    const [first_name, setFirst_Name] = useState(sessionUser.first_name === "null" ? "" : sessionUser.first_name);
    const [last_name, setLast_Name] = useState(sessionUser.last_name === "null" ? "" : sessionUser.last_name);
    const [city, setCity] = useState(sessionUser.city === "null" ? "" : sessionUser.city);
    const [country, setCountry] = useState(sessionUser.country === "null" ? "" : sessionUser.country);
    const [bio, setBio] = useState(sessionUser.bio === "null" ? "" : sessionUser.bio);
    const { id } = useParams();
    const [imgSrc, setImgSrc] = useState();
    const [toggleDisplay2, setToggleDisplay2] = useState(false);
    // console.log('sessionUser', sessionUser)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { display_name, image, first_name, last_name, city, country, bio, id };
        await dispatch(sessionActions.editProfile(payload))
        dispatch(userActions.getUsers(userId.id))
        setShowModal(false);
    }

    useEffect(() => {
        dispatch(sessionActions.getProfile(id))
    }, [])

    const updateFile = (e) => {
        const file = e.target.files[0];
        console.log('file', file)
        if (file) setImage(file);
        setImgSrc(window.URL.createObjectURL(file))
        setToggleDisplay2(false);
        const button = document.querySelector(".updateImage2");
        if (button.classList.contains("opacity1")) {
            button.classList.remove("opacity1")
        } else {
            button.classList.add("opacity1")
        }
    };

    const toggle2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setToggleDisplay2(hidden => !hidden)
        const button = document.querySelector(".updateImage2");
        if (button.classList.contains("opacity1")) {
            button.classList.remove("opacity1")
        } else {
            button.classList.add("opacity1")
        }
    }

    return (
        <div className='editProfileContainer'>
            <div>
                <div className='editProfileBanner'>
                    Edit Your Profile
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='editProfileBody'>
                    <div className='editProfileImage'>
                        <div>
                            <img
                                style={{ 'border-radius': '50%', 'object-fit': 'cover', height: '240px', width: '240px' }}
                                src={imgSrc || sessionUser.avatar_img}
                                alt="profile"
                            />
                            <button className='updateImage2' onClick={toggle2}>Update Image</button>
                            {toggleDisplay2 && (
                                <div className='replaceDiv2'>
                                    <input type="file" name="file" id="file" onChange={updateFile} className='imageInputs' />
                                    <label htmlFor='file' className='imageUpload'>Replace Image</label>
                                    <button type="submit" onSubmit={handleSubmit}>Save Changes</button>
                                </div>
                            )}
                            {toggleDisplay2 && (
                                <div className='deleteDiv2'>zzzzzzzz</div>
                            )}
                            {/* about to import the toggle for the button to display */}
                            {/* <input type="file" onChange={updateFile} value="" title=" " /> */}
                        </div>
                    </div>
                    <div className='editProfileDetails'>
                        <div className='input'>
                            <label>
                                Display Name
                                <input
                                    type="text"
                                    value={display_name}
                                    onChange={(e) => setDisplay_Name(e.target.value)}
                                    required
                                    className='textfield'
                                />
                            </label>
                        </div>
                        <div className='input2'>
                            <div className='halfField'>
                                <label>
                                    First Name
                                    <input
                                        type="text"
                                        value={first_name}
                                        onChange={(e) => setFirst_Name(e.target.value)}
                                        className='textfield'
                                    />
                                </label>
                            </div>
                            <div className='halfField'>
                                <label>
                                    Last Name
                                    <input
                                        type="text"
                                        value={last_name}
                                        onChange={(e) => setLast_Name(e.target.value)}
                                        className='textfield'
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='input2'>
                            <div className='halfField'>
                                <label>
                                    City
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className='textfield'
                                    />
                                </label>
                            </div>
                            <div className='halfField'>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className='textfield'
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='input'>
                            <label>
                                Bio
                                <textarea
                                    value={bio}
                                    placeholder='Tell the world a little bit about yourself. The shorter the better.'
                                    onChange={(e) => setBio(e.target.value)}
                                    className='textfield'
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='editProfileButtonsDiv'>
                    <button onClick={() => setShowModal(false)} id='cancelButton'>Cancel</button>
                    <button type="submit" onSubmit={handleSubmit}>Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditUserProfile;