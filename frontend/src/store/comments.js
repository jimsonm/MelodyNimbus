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

export const getCommentsByTrack = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${trackId}`);
    console.log(response)
    const comments = await response.json();
    console.log(comments)
    dispatch(setComments(comments));
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMMENTS:
            newState = {};
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;