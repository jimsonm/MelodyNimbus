import './DeleteTrack.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import * as userActions from '../../store/users';
import { GrPlay, GrPause } from "react-icons/gr";
import { setCurrentSong, setIsSongPlaying } from "../../store/current";

function DeleteTrack({ setShowDeleteModal, trackId, setShowAudioPlayer }) {
    const dispatch = useDispatch();
    const deleteTrackId = Number(trackId);
    const { id } = useParams();
    const userProfile = useSelector((state) => state.user[id]);
    const tracksBySelectedUser = useSelector((state) => Object.values(state.user.tracks));
    const selectedTrack = tracksBySelectedUser?.find(track => track.id === deleteTrackId);
    const currentSong = useSelector((state) => state.current.song);
    const currentIsPlaying = useSelector((state) => state.current.isPlaying);

    const deleteTrack = async () => {
        await dispatch(userActions.deleteTrack({
            user_id: +id,
            track_id: selectedTrack.id,
        }))
        await setShowDeleteModal(false)
    }

    const pauseSong = () => {
        dispatch(setIsSongPlaying(false));
    }

    const updateCurrent = (trackId) => {
        setShowAudioPlayer(true);
        dispatch(setCurrentSong(trackId));
        dispatch(setIsSongPlaying(true));
    }

    return (
        <div className='deleteTrackContainer'>
            <div>
                <div className='flexboxDelete'>
                    <div>
                        <img
                            src={selectedTrack?.cover_art}
                            alt="coverArt"
                            className='trackCoverArt'
                        />
                    </div>
                    <div className='descriptionContainer2'>
                        {selectedTrack.id === currentSong?.id && currentIsPlaying === true
                            ? <GrPause onClick={pauseSong} className='pauseIcon' />
                            : <GrPlay onClick={() => updateCurrent(selectedTrack.id)} className='playIcon' />
                        }
                        <div>
                            <div className='displayName'>
                                {userProfile?.display_name}
                            </div>
                            <div className='trackName'>
                                <NavLink to={`/users/${id}/${selectedTrack.id}`}>
                                    {selectedTrack?.track_name}
                                </NavLink>
                            </div>
                        </div>
                    </div>
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
                        <button onClick={() => setShowDeleteModal(false)} className='cancelButton'>Cancel</button>
                        <button onClick={deleteTrack} className='saveButton'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTrack;