import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';
import { Modal } from '../../context/Modal';
import EditTrackModal from '../EditTrackModal';
import DeleteTrackModal from "../DeleteTrackModal";

function Tracks() {
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

    let allTracks = null;
    if (users && tracksBySelectedUser) {
        allTracks = Object.values(tracksBySelectedUser)
    }

    const showEditTrack = (e) => {
        const selectedTrack = allTracks?.find(track => track.id === +e.target.value)
        setEditTrack(selectedTrack)
        setShowTrackModal(true);
    }

    const showConfirmDelete = (e) => {
        // const selectedTrack = allTracks?.find(track => track.id === +e.target.value)
        const id = e.target.value;
        setDeleteTrackId(id);
        setShowDeleteModal(true);
    }

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
        dispatch(userActions.getUsers())
    }, [dispatch, userId.id]);

    return (
        <div>
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
                        <div>
                            {selectedUser?.display_name}
                        </div>
                        <div>
                            <NavLink to={`/users/${userId.id}/${track.id}`}>
                                {track?.track_name}
                            </NavLink>
                        </div>
                        <div className='trackDescription'>
                            {track?.description}
                        </div>
                        <div>
                            <audio controls>
                                <source src={track?.track_src} type="audio/mp3" />
                            </audio>
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
                    <DeleteTrackModal setShowDeleteModal={setShowDeleteModal} trackId={deleteTrackId} />
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
                    <img
                        alt='no tracks image'
                        className='noTracksImage'
                        src='https://melody-nimbus.s3.us-west-1.amazonaws.com/no-tracks.png'
                    />
                    <div className='quietDiv'>
                        Nothing to hear here
                    </div>
                    <div className='uploadNavLink'> 
                        {/* <NavLink exact to='/upload'> */}
                            Stay tuned and check back later to see if they share tracks in the future.
                        {/* </NavLink> */}
                    </div>
                </div>
                : null
            }
        </div>

    )
}

export default Tracks;