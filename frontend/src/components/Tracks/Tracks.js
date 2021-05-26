import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from '../../store/users';

function ShowTracks () {
    const ids = useParams();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user[ids.user_id]);
    const userTracks = useSelector((state) => Object.values(state.user));
    console.log('999999', ids);
    console.log(ids.id)
    console.log(userProfile);
    // const [trackName, setTrackName] = useState('');
    console.log('15', userTracks);

    useEffect( () => {
        dispatch(userActions.getTracksFromUser(ids.id))
    }, [dispatch]);

    return (
        <div>
            {userTracks.map((track) => 
            <div>
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