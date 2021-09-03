import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './TrackPage.css';
import { useEffect, useState } from 'react';
import * as userActions from '../../store/users';
import { Modal } from '../../context/Modal';
import EditTrackModal from '../EditTrackModal';
import DeleteTrackModal from '../DeleteTrackModal';

function TrackPage() {
    const { id } = useParams();
    const { track_id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => Object.values(state.user));
    const sessionUser = useSelector((state) => state.session.user);
    const userProfile = useSelector((state) => state.user[id]);
    const selectedUser = users[id - 1];
    const tracksBySelectedUser = useSelector((state) => state.user.tracks);
    const [showTrackModal, setShowTrackModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    let selectedTrack;
    if (tracksBySelectedUser) {
        selectedTrack = tracksBySelectedUser[track_id];
    }

    const showEditTrack = (e) => {
        setShowTrackModal(true)
    }

    const showConfirmDelete = (e) => {
        setShowDeleteModal(true)
    }

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(id))
        dispatch(userActions.getUsers())
    }, [dispatch])

    return (
        <div>
            {selectedTrack !== undefined && (
                <div className='flexCenter trackPageContainer'>
                    <div>
                        <div className='flexbox'>
                            <div className='block'>
                                <div>
                                    {userProfile?.display_name}
                                </div>
                                <div>
                                    {selectedTrack?.track_name}
                                </div>
                                {/* </div>
                            <div> */}
                                <audio controls>
                                    <source src={selectedTrack?.track_src} type="audio/mp3" />
                                </audio>
                            </div>
                            <div>
                                <img
                                    src={selectedTrack?.cover_art || userProfile?.avatar_img}
                                    alt="coverArt"
                                    className='trackCoverArt2'
                                />
                            </div>
                        </div>
                        <div className='flexbox'>
                            <img
                                src={userProfile?.avatar_img}
                                alt='profileAvatar'
                                className='userProfileTrackPage1'
                            />
                            <input
                                type='text'
                                placeholder='Write a comment'
                                className='writeComment'
                            />
                        </div>
                        <div>
                            {sessionUser?.id === userProfile?.id ? (
                                <button onClick={showEditTrack} value={selectedTrack.id} className='editButton'>
                                    Edit
                                </button>) : null
                            }
                            {sessionUser?.id === userProfile?.id ? (
                                <button onClick={showConfirmDelete} value={selectedTrack.id} className='deleteButton'>
                                    Delete Track
                                </button>) : null
                            }
                            {showTrackModal && (
                                <Modal onClose={() => setShowTrackModal(false)}>
                                    <EditTrackModal setShowTrackModal={setShowTrackModal} track={selectedTrack} />
                                </Modal>
                            )}
                            {showDeleteModal && (
                                <Modal onClose={() => setShowDeleteModal(false)}>
                                    <DeleteTrackModal setShowDeleteModal={setShowDeleteModal} trackId={id} />
                                </Modal>
                            )}
                        </div>
                        <div className='flexbox'>
                            <div className='block'>
                                <img
                                    src={userProfile?.avatar_img}
                                    alt='profileAvatar'
                                    className='userProfileTrackPage2'
                                />
                                <div>
                                    {userProfile?.display_name}
                                </div>
                            </div>
                            <div>
                                {selectedTrack?.description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TrackPage;