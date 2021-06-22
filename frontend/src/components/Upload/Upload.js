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
    console.log('track stuff', selectedUser?.tracks);
    // const userProfile = useSelector((state) => state.user[id]);
    // console.log(userProfile);
    const [trackUploaded, setTrackUploaded] = useState(false);
    //change this trackUploaded back to false when done testing
    const [track_name, setTrack_name] = useState();
    const [description, setDescription] = useState();
    const [track_src, setTrack_src] = useState();
    const [cover_art, setCover_art] = useState();

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

    const handleUpload = async (e) => {
        console.log('handleUpload working?')
        e.preventDefault();
        const track = {
            // track_src,
            // cover_art,
            files: [track_src, cover_art],
            track_name,
            description,
            user_id: id,
        };
        console.log(track);
        dispatch(userActions.addTrack(track))
    }

    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file) setCover_art(file);
    }

    const uploadTrack = (e) => {
        const file = e.target.files[0];
        if (file) setTrack_src(file);
        setTrackUploaded(true);
    }

    return (
        <div className='flexCenter'>
            <form onSubmit={handleUpload}>
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
                                <div>
                                    <input type="file" name="cover" id="cover" onChange={uploadImg} className='imageInputs' />
                                    <label htmlFor='cover' className='imageInput'>Upload Image</label>
                                </div>
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
                            <button type="submit" onSubmit={handleUpload} className='saveButton'>Upload</button>
                        </div>
                    </div>
                )}
            </form>
        </div>

    )
}

export default Upload;