import { useEffect, useState } from 'react';

function EditTrack({ setShowTrackModal, track }) {
    const [track_name, setTrack_name] = useState(track.track_name);
    const [description, setDescription] = useState(track.description);
    const [cover_art, setCover_art] = useState();
    const [cover_art_src, setCover_art_src] = useState(track.cover_art);
    // console.log(cover_art_src);
    // console.log('qqqqqq', track);

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
        await setShowTrackModal(false);
    }

    return (
        <div>
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
                <button onClick={() => setShowTrackModal(false)}>ok</button>
            </form>
        </div>
    )
}

export default EditTrack;