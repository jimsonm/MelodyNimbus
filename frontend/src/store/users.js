import { csrfFetch } from './csrf';

const SET_USERS = 'users/SET_USERS';
const GET_TRACKS = 'users/GET_TRACKS';
// const GET_UPLOAD = 'users/GET_UPLOAD';

const setUsers = (users) => ({
    type: SET_USERS,
    users,
});

const getTracks = (tracks, userId) => {
    return {
        type: GET_TRACKS,
        payload: {
        tracks,
        userId,
        }
    };
};

// const getUpload = () => {
//     return {
//         type: GET_UPLOAD,
//     }
// }

export const addTrack = (track) => async (dispatch) => {
    const { files, track_name, description, user_id } = track;
    // debugger
    console.log('track', track);
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
    console.log('formdata', formData);
    const res = await csrfFetch(`/api/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    //breaks in the post
    console.log('res', res);
    const data = await res.json();
    console.log('trackData?', data);
}

export const getUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    const users = await res.json();
    dispatch(setUsers(users));
}

export const getTracksFromUser = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${id}/tracks`);
    const tracks = await response.json();
    dispatch(getTracks(tracks, id))
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
            newState = { ...state };
            for (let key in newState) {
                newState[key].tracks = [];
                if (Number(key) === action.payload.userId) {
                    newState[key].tracks = [...action.payload.tracks];
                }
            }
            return newState;
        default:
            return state;
    }
}

export default usersReducer;