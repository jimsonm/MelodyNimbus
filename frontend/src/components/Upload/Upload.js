import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/users';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import './Upload.css';
import LoginForm from '../LoginFormModal/LoginForm';

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
    const [showLoginModal, setShowLoginModal] = useState(false);
    const tracksBySelectedUser = useSelector((state) => state.user.tracks)
    let lastUpload = null;
    if (tracksBySelectedUser) {
        lastUpload = Object.values(tracksBySelectedUser);
        lastUpload = lastUpload[lastUpload.length - 1]
    }


    useEffect(() => {
        dispatch(userActions.getUsers())
    }, [dispatch]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(userActions.getTracksFromUser(id))
        }
    }, [selectedUser, trackUploaded, id, sessionUser])

    const handleUpload = async (e) => {
        e.preventDefault();
        const track = {
            files: [track_src, cover_art],
            track_name,
            description,
            user_id: id,
        };
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
        <div>
            {sessionUser && (
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
                                    <NavLink to={`/users/${sessionUser.id}/${lastUpload.id}`} className='trackNavLink'>
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
                                        value={`https://melodynimbus.herokuapp.com/users/${sessionUser.id}/${lastUpload.id}`}
                                        className='shareTrackTextbox'
                                        onClick={highlight}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!sessionUser && (
                <div>
                    <div className='flexCenter'>
                        <div className='getStarted'>
                            Get Started
                        </div>
                    </div>
                    <div className='flexJustCenter'>
                        <div className='uploadNoAuth'>
                            <div className='uploadNoAuthText'>
                                <div className='firstUpload'>
                                    First upload to your profile
                                </div>
                                <div className='shareTracks'>
                                    Share your tracks and access the tools you need to break through and build your legacy.
                                </div>
                                <button onClick={() => setShowLoginModal(true)} className='saveButton firstTrackUpload'>Upload your first track</button>
                                {showLoginModal && (
                                    <Modal onClose={() => setShowLoginModal(false)}>
                                        <LoginForm />
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flexJustCenter'>
                        <div className='infoContainer flexbox'>
                            <div className='info1'>
                                <div className='titleText'>
                                    Real-time stats
                                </div>
                                <div className='bodyText'>
                                    See how many people have listened to your tracks and how many people like your tracks, all in real-time.
                                </div>
                            </div>
                            <div className='info2'>
                                <div className='titleText'>
                                    Find your community
                                </div>
                                <div className='bodyText'>
                                    Find similar minded individuals with song preferences similar to your own.
                                </div>
                            </div>
                            <div className='info3'>
                                <div className='titleText'>
                                    Connect with others
                                </div>
                                <div className='bodyText'>
                                    Discover new songs uploaded by others, you can always find something that'll suit your tastes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Upload;