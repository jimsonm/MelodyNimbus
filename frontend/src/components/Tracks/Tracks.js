import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';

function Tracks() {
    const userId = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[userId.id - 1];
    // console.log('current user', selectedUser);
    const tracksBySelectedUser = selectedUser?.tracks;
    // console.log('tracks', tracksBySelectedUser);

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
    }, [dispatch, userId.id]);

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
                            {track.track_name}
                        </div>
                        <div>
                            By: {selectedUser.display_name}
                        </div>
                        <div className='trackDescription'>
                            {track.description}
                        </div>
                        <div>
                            <audio controls>
                                <source src={track.track_src} type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Tracks;