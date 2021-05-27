import { csrfFetch } from './csrf';

const SET_USERS = 'users/SET_USERS';
const GET_TRACKS = 'session/getTracks';

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

export const getUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    const users = await res.json();
    dispatch(setUsers(users));
}

export const getTracksFromUser = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${id}/tracks`);
    const tracks = await response.json();
    dispatch(getTracks(tracks))
    console.log('28 tracks', tracks)
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
            console.log('23', newState)
            return newState;
        case GET_TRACKS:
            newState = { ...state };
            action.tracks.forEach((track) => {
                newState[`track${track.id}`] = track;
            })
            return newState;
        default:
            return state;
    }
}

export default usersReducer;