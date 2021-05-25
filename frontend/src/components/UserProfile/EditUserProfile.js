import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import * as sessionActions from "../../store/session";
import './EditUserProfile.css';

function EditUserProfile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // const [email, setEmail] = useState("");
    const [display_name, setDisplay_Name] = useState("");
    const [image, setImage] = useState(null);
    // const [image2, setImage2] = useState(null);
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.signup({ display_name, image, first_name, last_name, city, country, bio }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div>
            <div className='editProfileContainer'>
                <div className='editProfileBanner'>
                    Edit Your Profile
            </div>
            </div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Display Name
                    <input>
                        type="text"
                        value={display_name}
                        onChange={(e) => setDisplay_Name(e.target.value)}
                        required
                    </input>
                </label>
                <label>
                    First Name
                    <input>
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirst_Name(e.target.value)}
                    </input>
                </label>
                <label>
                    Last Name
                    <input>
                        type="text"
                        value={last_name}
                        onChange={(e) => setLast_Name(e.target.value)}
                    </input>
                </label>
                <label>
                    City
                    <input>
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    </input>
                </label>
                <label>
                    Country
                    <input>
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    </input>
                </label>
                <label>
                    Bio
                    <textarea>
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    </textarea>
                </label>
            </form>
        </div>
    );
}

export default EditUserProfile;