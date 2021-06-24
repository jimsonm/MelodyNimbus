import { csrfFetch } from './csrf';

const SET_USERS = 'users/SET_USERS';
const GET_TRACKS = 'users/GET_TRACKS';
const UPDATE_TRACK = 'users/UPDATE_TRACK'

const setUsers = (users) => ({
    type: SET_USERS,
    users,
});

const getTracks = (tracks) => {
    return {
        type: GET_TRACKS,
        tracks,
    };
};

const updateTrack = (track) => {
    return {
        type: UPDATE_TRACK,
        track,
    };
};

export const addTrack = (track) => async (dispatch) => {
    const { files, track_name, description, user_id } = track;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("track_name", track_name);
    formData.append("user_id", user_id);

    // for multiple files
    if (files && files.length !== 0) {
        for (var i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
    }
    const res = await csrfFetch(`/api/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    const data = await res.json();
}

export const editTrack = (track) => async (dispatch) => {
    const { file, track_name, description, user_id, track_src, track_id } = track;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("track_name", track_name);
    formData.append("user_id", user_id);
    formData.append("track_src", track_src);
    console.log(track);
    if (file) formData.append('file', file);
    console.log('step 2');
    const res = await csrfFetch(`/api/users/${user_id}/${track_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    console.log('res', res);
    const data = await res.json();
    console.log('data', data);
    dispatch(getTracks(data))
}

export const getUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    const users = await res.json();
    dispatch(setUsers(users));
}

export const getTracksFromUser = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${id}/tracks`);
    const tracks = await response.json();
    dispatch(getTracks(tracks))
    return tracks;
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USERS:
            newState = { ...state };
            action.users.forEach((user) => {
                newState[user.id] = user;
            });
            return newState;
        case GET_TRACKS:
            // newState = { ...state };
            // newState[tracks] = action.tracks.forEach((track) => {
            //     track.id = track
            // })
            console.log(action.tracks)
            // action.tracks.forEach((track => {
            //     newState[tracks] = { track.id: track}
            // }))
            return { ...state, tracks: action.tracks };
            // return newState;
        case UPDATE_TRACK:
            newState = { ...state };
            // newState[tracks]
            // need to rest the other tracks and get current track to update
            console.log(action.track)
            return newState;
        default:
            return state;
    }
}

export default usersReducer;