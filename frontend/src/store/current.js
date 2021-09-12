import { csrfFetch } from './csrf';

const SET_SONG = 'current/SET_SONG';
const SET_SONG_STATE = 'current/SET_SONG_STATE';
const IS_PLAYING = 'current/IS_PLAYING';

const setSong = (song) => ({
    type: SET_SONG,
    song,
});

const setSongState = (songState) => ({
    type: SET_SONG_STATE,
    songState,
});

const isSongPlaying = (isPlaying) => ({
    type: IS_PLAYING,
    isPlaying,
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

export const setIsSongPlaying = (isPlaying) => async (dispatch) => {
    dispatch(isSongPlaying(isPlaying));
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
        case IS_PLAYING:
            newState = { ...state }
            newState.isPlaying = action.isPlaying
            return newState;
        default:
            return state;
    }
}

export default currentReducer;