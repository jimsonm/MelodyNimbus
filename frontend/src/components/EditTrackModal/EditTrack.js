import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as userActions from '../../store/users';
import './EditTrack.css';

function EditTrack({ setShowTrackModal, track }) {
    const dispatch = useDispatch();
    const [track_name, setTrack_name] = useState(track.track_name);
    const [description, setDescription] = useState(track.description);
    const [cover_art, setCover_art] = useState();
    const track_src = track.track_src;
    const [cover_art_src, setCover_art_src] = useState(track.cover_art);
    const user_id = track.user_id;
    const track_id = track.id;

    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file) setCover_art(file);
        setCover_art_src(window.URL.createObjectURL(file))
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowTrackModal(false);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const track = {
            file: cover_art || cover_art_src,
            track_name,
            description,
            track_src,
            user_id,
            track_id
        }
        console.log('step 1');
        await dispatch(userActions.editTrack(track));
        await setShowTrackModal(false);
    }

    return (
        <div className='editTrackContainer'>
            <form onSubmit={handleUpload}>
                <div className='uploadContainer2'>
                    <div className='basicInfo'>
                        Basic info
                    </div>
                    <div className='flexBox'>
                        <div className='trackImgContainer'>
                            <img
                                src={cover_art_src}
                                className='albumImg'
                                alt=''
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
                        <button id='cancelButton' className='cancelButton' onClick={closeModal} >Cancel</button>
                        <button type="submit" onSubmit={handleUpload} className='saveButton'>Upload</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditTrack;