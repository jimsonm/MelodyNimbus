import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './TrackPage.css';
import { useEffect, useState } from 'react';
import * as userActions from '../../store/users';
import { Modal } from '../../context/Modal';
import EditTrackModal from '../EditTrackModal';
import DeleteTrackModal from '../DeleteTrackModal';
import { GrPlay, GrPause } from "react-icons/gr";
import { setIsSongPlaying, setCurrentSong } from '../../store/current';

function TrackPage({ setShowAudioPlayer}) {
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
    const currentIsPlaying = useSelector((state) => state.current.isPlaying);

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

    const pauseSong = () => {
        dispatch(setIsSongPlaying(false));
    }

    const updateCurrent = (trackId) => {
        setShowAudioPlayer(true);
        dispatch(setCurrentSong(trackId));
        dispatch(setIsSongPlaying(true));
    }

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(id))
        dispatch(userActions.getUsers())
    }, [dispatch])

    return (
        <div>
            {selectedTrack !== undefined && (
                <div className='flexCenter'>
                    <div className='trackPageContainer'>
                        <div className='flexboxBetween'>
                            <div className='block descriptionContainer'>
                                <div className='playContainer'>
                                    <div>
                                        {currentIsPlaying === true
                                            ? <GrPause onClick={pauseSong} className='pauseIcon' />
                                            : <GrPlay onClick={() => updateCurrent(selectedTrack.id)} className='playIcon' />
                                        }
                                        {/* <div ref={waveformRef}></div> */}
                                        {/* <Waveform track={track} /> */}
                                    </div>
                                    <div>
                                        <div className='displayName2'>
                                            {userProfile?.display_name}
                                        </div>
                                        <div className='trackName2'>
                                            {selectedTrack?.track_name}
                                        </div>
                                    </div>

                                </div>
                                <div className='trackDescription2'>
                                    {selectedTrack?.description}
                                </div>
                                {sessionUser?.id === userProfile?.id ? (
                                <button onClick={showEditTrack} value={selectedTrack.id} className='editButton2'>
                                    Edit
                                </button>) : null
                            }
                            {sessionUser?.id === userProfile?.id ? (
                                <button onClick={showConfirmDelete} value={selectedTrack.id} className='deleteButton2'>
                                    Delete Track
                                </button>) : null
                            }
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
                                <div className='flexCenter'>
                                    {userProfile?.display_name}
                                </div>
                            </div>
                            {/* <div>
                                {selectedTrack?.description}
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TrackPage;