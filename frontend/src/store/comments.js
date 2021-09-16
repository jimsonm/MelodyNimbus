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
    const comments = await response.json();
    dispatch(setComments(comments));
}

export const addComment = ({user_id, track_id, comment}) => async (dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({user_id, track_id, comment}),
    });
    const commentsRes = await csrfFetch(`/api/comments/${track_id}`);
    const allComments = await commentsRes.json();
    dispatch(setComments(allComments));
}

export const deleteComment = (trackId, commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${trackId}/${commentId}`, {
        method: 'DELETE',
    });
    const allComments = await response.json();
    dispatch(setComments(allComments));
}

export const editComment = (commentId, edittedComment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({comment: edittedComment}),
    });
    const allComments = await response.json();
    dispatch(setComments(allComments));
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