import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/users';
import { NavLink } from 'react-router-dom';
import './Upload.css';

function Upload() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = sessionUser?.id
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[id - 1];
    const [trackUploaded, setTrackUploaded] = useState(false);
    const [track_name, setTrack_name] = useState();
    const [description, setDescription] = useState();
    const [track_src, setTrack_src] = useState();
    const [cover_art, setCover_art] = useState();
    const [cover_art_src, setCover_art_src] = useState();
    const [uploadAnother, setUploadAnother] = useState(false);
    // change back to false
    const tracksBySelectedUser = users[users.length - 1];
    const lastUpload = tracksBySelectedUser?.[tracksBySelectedUser.length - 1]

    useEffect(() => {
        dispatch(userActions.getUsers())
    }, [dispatch]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(userActions.getTracksFromUser(id))
        }
    }, [selectedUser, trackUploaded])

    const handleUpload = async (e) => {
        console.log('handleUpload working?')
        e.preventDefault();
        const track = {
            files: [track_src, cover_art],
            track_name,
            description,
            user_id: id,
        };
        console.log('56', track);
        await dispatch(userActions.addTrack(track));
        await setTrackUploaded(false);
        await setUploadAnother(true);
    }

    const albumImg = document.querySelector('.albumImg')
    if (albumImg?.src === 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-track-cover-img.png') {
        albumImg?.classList.add('objContain');
    }

    useEffect(() => {
        if (albumImg?.src !== 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-track-cover-img.png') {
            albumImg?.classList.remove('objContain');
        }
    }, [cover_art_src])

    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file) setCover_art(file);
        setCover_art_src(window.URL.createObjectURL(file))
    }

    const uploadTrack = (e) => {
        const file = e.target.files[0];
        if (file) setTrack_src(file);
        setTrackUploaded(true);
    }

    const uploadTrack2 = (e) => {
        const file = e.target.files[0];
        if (file) setTrack_src(file);
        setUploadAnother(false);
        resetFields();
        setTrackUploaded(true);
    }

    const resetFields = () => {
        setTrackUploaded(false)
        setTrack_name();
        setDescription();
        setCover_art();
        setCover_art_src();
    }

    const highlight = (event) => {
        event.target.select();
    }

    return (
        <div className='flexCenter'>
            <form onSubmit={handleUpload}>
                {trackUploaded === false && uploadAnother === false && (
                    <div className='uploadContainer'>
                        <div className='uploadTitle flexCenter'>
                            Get started on uploading tracks
                        </div>
                        <div className='uploadButtonDiv flexCenter'>
                            <input type='file' name='track' id='track' onChange={uploadTrack} />
                            <label htmlFor='track' className='uploadInput saveButton flexCenter'>Choose a file to upload</label>
                        </div>
                    </div>
                )}
                {trackUploaded && (
                    <div className='uploadContainer2'>
                        <div className='basicInfo'>
                            Basic info
                        </div>
                        <div className='flexBox'>
                            <div className='trackImgContainer'>
                                <img
                                    src={cover_art_src || 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-track-cover-img.png'}
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
                            <button id='cancelButton' className='cancelButton' onClick={resetFields} >Cancel</button>
                            <button type="submit" onSubmit={handleUpload} className='saveButton'>Upload</button>
                        </div>
                    </div>
                )}
            </form>
            {uploadAnother && lastUpload && (
                <div>
                    <div className='uploadContainer3'>
                        <div className='uploadTitle3 flexCenter'>
                            Choose another file to upload
                        </div>
                        <div className='flexCenter'>
                            <input type='file' name='track' id='track' onChange={uploadTrack2} />
                            <label htmlFor='track' className='uploadInput3 saveButton flexCenter'>Upload a file</label>
                        </div>
                    </div>
                    <div className='uploadedTrack flexbox'>
                        <div className='flexCenter uploadedTrackImgDiv'>
                            <img
                                src={lastUpload?.cover_art || sessionUser?.avatar_img}
                                alt="coverArt"
                                className='lastTrackCoverArt'
                            />
                        </div>
                        <div className='block uploadedTrackTextDiv'>
                            <div className='uploadedTrackUser'>
                                {sessionUser.first_name} {sessionUser.last_name}
                            </div>
                            <div className='uploadedTrackName'>
                                {lastUpload.track_name}
                            </div>
                            <div className='uploadedTrackDescription'>
                                {lastUpload.description}
                            </div>
                            <div className='uploadedTrackComplete'>
                                Upload Complete.
                            </div>
                            <NavLink to={`/users/${sessionUser.id}/${lastUpload.track_name}`} className='trackNavLink'>
                                Go to your track.
                            </NavLink>
                            {/* add functionality to go to the track's page */}
                        </div>
                        <div className='shareTrackDiv'>
                            <div className='shareTrackText'>
                                Share your track
                            </div>
                            <input
                                type='text'
                                value={`http://localhost:3000/users/${sessionUser.id}/${lastUpload.track_name}`}
                                className='shareTrackTextbox'
                                onClick={highlight}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Upload;