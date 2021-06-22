import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import { useState } from 'react';

function Upload () {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = sessionUser.id
    const users = useSelector((state) => Object.values(state.user));
    const selectedUser = users[id - 1];
    console.log('test', selectedUser);
    // dispatch(sessionActions.getProfile(sessionUser.id))
    // dispatch(userActions.getTracksFromUser(sessionUser.id));
    const userProfile = useSelector((state) => state.user[id]);
    // console.log(userProfile);
    const [track, setTrack] = useState("");

    // useEffect(() => {
    //     dispatch(userActions.getUsers(id))
    // }, []);
    useEffect(() => {
        // dispatch(userActions.getUsers())
        dispatch(userActions.getTracksFromUser(id))
    }, [selectedUser]);

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