import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink  } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';

function Tracks() {
    const userId = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[userId.id - 1];
    const tracksBySelectedUser = selectedUser?.tracks;

    useEffect(() => {
        dispatch(userActions.getUsers())
    }, []);

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
    }, [selectedUser]);
    //ask selectedUser in the array works correctly

    return (
        <div>
            {tracksBySelectedUser?.map((track) =>
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
            )}
            {tracksBySelectedUser?.length === 0 ?
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
        </div>

    )
}

export default Tracks;