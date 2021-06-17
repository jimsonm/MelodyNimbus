import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import { useState } from 'react';

function Upload ({users}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser);
    dispatch(sessionActions.getProfile(sessionUser.id))
    console.log('sessionUser', sessionUser);
    dispatch(userActions.getTracksFromUser(sessionUser.id));
    const [track, setTrack] = useState("");


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setTrack(file);
    };

    return (
        <div>
            <h1>test</h1>
            asdsdad
            <div>
            <input type="file" onChange={updateFile} />
            </div>
        </div>
        
    )
}

export default Upload;