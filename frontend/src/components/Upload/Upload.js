import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './Upload.css';

function Upload() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = sessionUser?.id
    // const userProfile = useSelector((state) => state.user[id]);
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[id - 1];
    // console.log('selectedUser', selectedUser);
    // console.log('track stuff', selectedUser?.tracks);
    const [trackUploaded, setTrackUploaded] = useState(false);
    const [track_name, setTrack_name] = useState();
    const [description, setDescription] = useState();
    const [track_src, setTrack_src] = useState();
    const [cover_art, setCover_art] = useState();
    const [cover_art_src, setCover_art_src] = useState();
    const [uploadAnother, setUploadAnother] = useState(false);
    const [lastUpload, setLastUpload] = useState();

    let tracksBySelectedUser = selectedUser?.tracks;
    // setLastUpload(tracksBySelectedUser?.[tracksBySelectedUser.length - 1]);
    console.log('27', lastUpload)

    // const tracksBySelectedUser = selectedUser?.tracks;
    // const lastTrack = tracksBySelectedUser?.[tracksBySelectedUser.length - 1];
    // console.log('27', lastTrack)

    useEffect(() => {
        dispatch(userActions.getUsers())
        setLastUpload(tracksBySelectedUser?.[tracksBySelectedUser.length - 1]);
    }, [dispatch]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(userActions.getTracksFromUser(id))
        }
    }, [selectedUser, trackUploaded])

    // useEffect(() => {
    //     const tracksBySelectedUser = selectedUser?.tracks;
    //     const lastTrack = tracksBySelectedUser?.[tracksBySelectedUser.length - 1];
    //     // console.log('45', lastTrack)
    //     setLastUpload(lastTrack)
    //     console.log('last upload', lastUpload)
    // }, [uploadAnother])

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
        // console.log('61', lastTrack);
        // await setLastUpload(lastTrack);
        // console.log('checking');
        await setUploadAnother(true);
    }

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
                                    src={cover_art_src || 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-avatar-image.webp'}
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
                    <div className='uploadedTrack'>
                        <div>
                            <img
                                src={lastUpload?.cover_art || sessionUser?.avatar_img}
                                alt="coverArt"
                                className='lastTrackCoverArt'
                            />
                        </div>
                        <div>
                            test text
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Upload;