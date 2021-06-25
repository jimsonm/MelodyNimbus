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
    await csrfFetch(`/api/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    // const data = await res.json();
    // dispatch(setUsers(data))
}

export const editTrack = (track) => async (dispatch) => {
    const { file, track_name, description, user_id, track_src, track_id } = track;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("track_name", track_name);
    formData.append("user_id", user_id);
    formData.append("track_src", track_src);

    if (file) formData.append('file', file);
    const res = await csrfFetch(`/api/users/${user_id}/${track_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await res.json();
    dispatch(updateTrack(data))
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

export const deleteTrack = (track) => async (dispatch) => {
    const { user_id, track_id } = track;
    const response = await csrfFetch(`/api/users/${user_id}/${track_id}`, {
        method: 'DELETE',
    });
    const allTracks = await response.json();
    dispatch(getTracks(allTracks))
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
            let trackState = { ...state, 'tracks': {}}
            action.tracks.forEach((track) => {
                trackState.tracks[track.id] = track
            })
            return trackState;
        case UPDATE_TRACK:
            newState = { ...state };
            let id = action.track.id
            newState.tracks[id] = action.track
            return newState;
        default:
            return state;
    }
}

export default usersReducer;