import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from '../../store/users';
import './Tracks.css';

function ShowTracks() {
    const userId = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => Object.values(state.user));
    // const [trackName, setTrackName] = useState('');
    console.log('15', users);

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(userId.id))
    }, [dispatch]);

    return (
        <div>
            {users.map((track) =>
                <div key={track.id}>
                    <div>
                    </div>
                    <div>
                        {track.track_name}
                    </div>
                    <div>
                        {track.description}
                    </div>
                </div>

            )}
        </div>

    )
}

export default ShowTracks;