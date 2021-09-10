import { csrfFetch } from './csrf';

const SET_SONG = 'current/SET_SONG';
const SET_SONG_STATE = 'current/SET_SONG_STATE';

const setSong = (song) => ({
    type: SET_SONG,
    song,
});

const setSongState = (songState) => ({
    type: SET_SONG_STATE,
    songState,
});

export const setCurrentSong = (songId) => async (dispatch) => {
    if(!songId) return;
    const response = await csrfFetch(`/api/users/track/${songId}`)
    const song = await response.json();
    dispatch(setSong(song));
    return song;
}

export const setCurrentSongState = (songState) => async (dispatch) => {
    dispatch(setSongState(songState));
}

const initialState = {}

const currentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SONG:
            newState = { ...state }
            newState.song = action.song
            return newState;
        case SET_SONG_STATE:
            newState = { ...state }
            newState.songState = action.songState
            return newState;
        default:
            return state;
    }
}

export default currentReducer;