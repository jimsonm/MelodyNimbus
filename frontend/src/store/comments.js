import { csrfFetch } from './csrf';

const SET_COMMENTS = 'comments/SET_COMMENTS';

const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});

export const getComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments');
    const comments = await response.json();
    dispatch(setComments(comments));
}

export const getCommemntsByTrack = (track) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${track}`);
    const comments = await response.json();
    dispatch(setComments(comments));
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMMENTS:
            newState = { ...state };
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
        default:
            return state;
    }
}

export default commentsReducer;