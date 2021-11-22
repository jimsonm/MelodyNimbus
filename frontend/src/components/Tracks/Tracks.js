import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';
import { Modal } from '../../context/Modal';
import EditTrackModal from '../EditTrackModal';
import DeleteTrackModal from "../DeleteTrackModal";
import { GrPlay, GrPause } from "react-icons/gr";
import { setCurrentSong, setIsSongPlaying } from "../../store/current";

function Tracks({ setTrackCount, setShowAudioPlayer }) {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfile = useSelector((state) => state.user[userId.id]);
    const users = useSelector((state) => Object.values(state.user));
    const tracksBySelectedUser = useSelector((state) => state.user.tracks)
    const selectedUser = users[userId.id - 1];
    const [showTrackModal, setShowTrackModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editTrack, setEditTrack] = useState();
    const [deleteTrackId, setDeleteTrackId] = useState();
    const currentSong = useSelector((state) => state.current.song);
    const currentIsPlaying = useSelector((state) => state.current.isPlaying);

    let allTracks = null;
    if (users && tracksBySelectedUser) {
        allTracks = Object.values(tracksBySelectedUser)
    }

    const pauseSong = () => {
        dispatch(setIsSongPlaying(false));
    }

    const updateCurrent = (trackId) => {
        setShowAudioPlayer(true);
        dispatch(setCurrentSong(trackId));
        dispatch(setIsSongPlaying(true));
    }

    const showEditTrack = (e) => {
        const selectedTrack = allTracks?.find(track => track.id === +e.target.value)
        setEditTrack(selectedTrack)
        setShowTrackModal(true);
    }

    const showConfirmDelete = (e) => {
        const id = e.target.value;
        setDeleteTrackId(id);
        setShowDeleteModal(true);
    }

    useEffect(() => {
        setTrackCount(allTracks?.length);
    }, [tracksBySelectedUser])

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
        dispatch(userActions.getUsers())
    }, [dispatch, userId.id]);

    return (
        <>
            <div className='trackContainer'>
                {allTracks?.map((track) =>
                    <div key={track.id} className='trackDiv'>
                        <div>
                            <img
                                src={track?.cover_art || userProfile?.avatar_img}
                                alt="coverArt"
                                className='trackCoverArt'
                            />
                        </div>
                        <div className='descriptionContainer'>
                            <div className='playContainer'>
                                <div>
                                    {track.id === currentSong?.id && currentIsPlaying === true
                                        ? <GrPause onClick={pauseSong} className='pauseIcon' />
                                        : <GrPlay onClick={() => updateCurrent(track.id)} className='playIcon' />
                                    }
                                </div>
                                <div>
                                    <div className='displayName'>
                                        {selectedUser?.display_name}
                                    </div>
                                    <div className='trackName'>
                                        <NavLink to={`/users/${userId.id}/${track.id}`}>
                                            {track?.track_name}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className='trackDescription'>
                                {track?.description}
                            </div>
                            <div>
                                {sessionUser?.id === userProfile?.id ? (
                                    <button onClick={showEditTrack} value={track.id} className='editTrackButton'>
                                        Edit
                                    </button>) : null
                                }
                                {sessionUser?.id === userProfile?.id ? (
                                    <button onClick={showConfirmDelete} value={track.id} className='deleteTrackButton'>
                                        Delete Track
                                    </button>) : null
                                }
                            </div>
                        </div>
                    </div>
                )}
                {showTrackModal && (
                    <Modal onClose={() => setShowTrackModal(false)}>
                        <EditTrackModal setShowTrackModal={setShowTrackModal} track={editTrack} />
                    </Modal>
                )}
                {showDeleteModal && (
                    <Modal onClose={() => setShowDeleteModal(false)}>
                        <DeleteTrackModal setShowDeleteModal={setShowDeleteModal} trackId={deleteTrackId} setShowAudioPlayer={setShowAudioPlayer}/>
                    </Modal>
                )}
                {allTracks?.length === 0 && userProfile?.id === sessionUser?.id ?
                    <div className='noTrackContainer'>
                        <div className='quietDiv'>
                            Seems a little quiet over here
                        </div>
                        <div className='uploadNavLink'>
                            <NavLink exact to='/upload'>
                                Upload a track to share it with your followers.
                            </NavLink>
                        </div>
                    </div>
                    : null
                }
                {allTracks?.length === 0 && userProfile?.id !== sessionUser?.id ?
                    <div className='noTrackContainer'>
                        <div>
                        <img
                            alt='no tracks image'
                            className='noTracksImage'
                            src='https://melody-nimbus.s3.us-west-1.amazonaws.com/no-tracks.png'
                        />
                        </div>
                        <div className='quietDiv'>
                            Nothing to hear here
                        </div>
                        <div className='uploadNavLink'>
                            Stay tuned and check back later to see if they share tracks in the future.
                        </div>
                    </div>
                    : null
                }
            </div>
        </>
    )
}

export default Tracks;