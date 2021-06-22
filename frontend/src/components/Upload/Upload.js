import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './Upload.css';

function Upload() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = sessionUser?.id
    const users = useSelector((state) => Object.values(state.user));
    console.log('users', users)
    const selectedUser = users[id - 1];
    console.log('selectedUser', selectedUser);
    // const userProfile = useSelector((state) => state.user[id]);
    // console.log(userProfile);
    const [trackUploaded, setTrackUploaded] = useState(true);
    const [track_name, setTrack_name] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        dispatch(userActions.getUsers())
    }, []);

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(id))
    }, [id])

    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     if (file) setTrack(file);
    // };

    const uploadTrack = () => {
        setTrackUploaded(true)
    }

    return (
        <div className='flexCenter'>
            {trackUploaded === false && (
                <div className='uploadContainer'>
                    <div className='uploadTitle flexCenter'>
                        Get started on uploading tracks
                    </div>
                    <div className='uploadButtonDiv flexCenter'>
                        <input type='file' name='track' id='track' onChange={uploadTrack} />
                        <label htmlFor='track' className='uploadInput saveButton flexCenter'>Choose file to upload</label>
                    </div>
                </div>
            )}
            {trackUploaded && (
                <div className='uploadContainer2'>
                    <div className='basicInfo'>
                        Basic info
                    </div>
                    <div className='flexBox'>
                        <div className='trackImgContainer flexCenter'>
                            <img
                                src='https://melody-nimbus.s3.us-west-1.amazonaws.com/default-avatar-image.webp'
                                className='albumImg'
                            />
                        </div>
                        <div className='block maxWidth'>
                            <div className='input'>
                                <label>
                                    Title
                                    <input
                                        type="text"
                                        value={track_name}
                                        onChange={(e) => setTrack_name(e.target.value)}
                                        required
                                        className='textfield'
                                    />
                                </label>
                            </div>
                            <div className='input'>
                                <label>
                                    Description
                                    <textarea
                                        value={description}
                                        placeholder='Describe the track.'
                                        onChange={(e) => setDescription(e.target.value)}
                                        className='textfield trackTextField'
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='editProfileButtonsDiv'>
                        <button id='cancelButton' className='cancelButton'>Cancel</button>
                        <button type="submit" className='saveButton'>Save</button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Upload;