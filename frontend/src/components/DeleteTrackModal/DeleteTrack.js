import './DeleteTrack.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as userActions from '../../store/users';

function DeleteTrack({setShowDeleteModal, trackId }) {
    const dispatch = useDispatch();
    const deleteTrackId = Number(trackId);
    const { id } = useParams();
    const userProfile = useSelector((state) => state.user[id]);
    const tracksBySelectedUser = useSelector((state) => Object.values(state.user.tracks));
    const selectedTrack = tracksBySelectedUser?.find(track => track.id === deleteTrackId);

    const deleteTrack = async () => {
        await dispatch(userActions.deleteTrack({
            user_id: +id,
            track_id: selectedTrack.id,
        }))
        await setShowDeleteModal(false)
    }

    return (
        <div className='deleteTrackContainer'>
            <div>
                <div className='flexbox'>
                    <div>
                        <img
                            src={selectedTrack?.cover_art}
                            alt="coverArt"
                            className='trackCoverArt'
                        />
                    </div>
                    <div className='descriptionContainer'>
                        <div>
                            {userProfile?.display_name}
                        </div>
                        <div>
                            {selectedTrack?.track_name}
                        </div>
                        <audio controls>
                            <source src={selectedTrack?.track_src} type="audio/mp3" />
                        </audio>
                    </div>
                </div>
                <div className='permDeleteContainer'>
                    <div className='permDeleteDiv'>
                        Permanently delete this track?
                    </div>
                    <div className='confirmDeleteTrack'>
                        <div className='irreversibleDiv'>
                            Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.
                        </div>
                        <div className='buttonsDiv'>
                            <button onClick={ () => setShowDeleteModal(false)} className='cancelButton'>Cancel</button>
                            <button onClick={deleteTrack} className='saveButton'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTrack;