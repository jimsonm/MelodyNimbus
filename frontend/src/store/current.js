import { csrfFetch } from './csrf';

const SET_SONG = 'current/SET_SONG';

const setSong = (song) => ({
    type: SET_SONG,
    song,
});

export const setCurrentSong = (songId) => async (dispatch) => {
    if(!songId) return;
    const response = await csrfFetch(`/api/users/track/${songId}`)
    const song = await response.json();
    dispatch(setSong(song));
    return song;
}

const initialState = {}

const currentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SONG:
            newState = { ...state }
            newState.song = action.song
            return newState;
        default:
            return state;
    }
}

export default currentReducer;