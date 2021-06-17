import { csrfFetch } from './csrf';

const GET_UPLOAD = 'users/getUpload'

const getUploadPage = (userId) => ({
    type: GET_UPLOAD,
    userId,
});

export const getPage = () => async (dispatch) => {
    const res = await csrfFetch('/api/upload');
    const page = await res.json();
    dispatch(getUploadPage(page))
    console.loge(page);
}

const initialState = {};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_UPLOAD:
            
        default:
            return state;
    }
}

export default uploadReducer;