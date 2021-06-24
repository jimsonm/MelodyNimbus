import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink  } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';

function Tracks() {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userProfile = useSelector((state) => state.user[userId.id]);
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[userId.id - 1];  
    const tracksBySelectedUser = users[users.length-1];

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
        dispatch(userActions.getUsers())
    }, [dispatch]);

    return (
        <div>
            {tracksBySelectedUser?.length > 0 ? tracksBySelectedUser?.map((track) =>
                <div key={track.id} className='trackDiv'>
                    <div>
                        <img
                            src={track?.cover_art}
                            alt="coverArt"
                            className='trackCoverArt'
                        />
                    </div>
                    <div className='descriptionContainer'>
                        <div>
                            {track?.track_name}
                        </div>
                        <div>
                            By: {selectedUser.display_name}
                        </div>
                        <div className='trackDescription'>
                            {track?.description}
                        </div>
                        <div>
                            <audio controls>
                                <source src={track?.track_src} type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            ) : null}
            {tracksBySelectedUser?.length === 0 && userProfile.id === sessionUser.id ?
                <div className='noTrackContainer'>
                    <div className='quietDiv'>
                        Seems a little quiet over here
                    </div>
                    <div className='uploadNavLink'>
                        <NavLink exact to='/Upload'>
                            Upload a track to share it with your followers.
                        </NavLink>
                    </div>
                </div>
                : null
            }
            {tracksBySelectedUser?.length === 0 && userProfile.id !== sessionUser.id ?
                <div className='noTrackContainer'>
                    <div className='quietDiv'>
                        This user has no tracks
                        {/* change whats displayed here to something else */}
                    </div>
                    <div className='uploadNavLink'>
                        <NavLink exact to='/Upload'>
                            Upload a track to share it with your followers.
                        </NavLink>
                    </div>
                </div>
                : null
            }
        </div>

    )
}

export default Tracks;