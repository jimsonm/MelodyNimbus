import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const GET_USER = 'session/getUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const getProfile = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}`)
  const updatedProfile = await response.json();
  dispatch(getUser(updatedProfile))
  return updatedProfile;
}

export const editProfile = (payload) => async (dispatch) => {

  const { display_name, image, first_name, last_name, city, country, bio, id, avatar_img, header_img } = payload;
  const formData = new FormData();
  formData.append("display_name", display_name);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("id", id);
  if (avatar_img) formData.append('avatar_img', avatar_img);
  if (header_img) formData.append('header_img', header_img);

  // for single file
  if (image) formData.append("image", image);
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await res.json();
  dispatch(setUser(data));
}

export const editProfile2 = (payload) => async (dispatch) => {
  const { display_name, image, first_name, last_name, city, country, bio, id, avatar_img, header_img } = payload;
  const formData = new FormData();
  formData.append("display_name", display_name);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("id", id);
  if (avatar_img) formData.append('avatar_img', avatar_img);
  if (header_img) formData.append('header_img', header_img);

  // for single file
  if (image) formData.append("image", image);
  const res = await csrfFetch(`/api/users/${id}/header`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await res.json();
  dispatch(setUser(data));
}

export const editProfileAvatar = (payload) => async (dispatch) => {
  const { display_name, image, first_name, last_name, city, country, bio, id, avatar_img, header_img } = payload;
  const formData = new FormData();
  formData.append("display_name", display_name);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("id", id);
  if (avatar_img) formData.append('avatar_img', avatar_img);
  if (header_img) formData.append('header_img', header_img);

  // for single file
  if (image) formData.append("image", image);
  const res = await csrfFetch(`/api/users/${id}/defaultAvatar`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await res.json();
  dispatch(setUser(data));
}

export const editProfileHeader = (payload) => async (dispatch) => {
  const { display_name, image, first_name, last_name, city, country, bio, id, avatar_img, header_img } = payload;
  const formData = new FormData();
  formData.append("display_name", display_name);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("id", id);
  if (avatar_img) formData.append('avatar_img', avatar_img);
  if (header_img) formData.append('header_img', header_img);

  // for single file
  if (image) formData.append("image", image);
  const res = await csrfFetch(`/api/users/${id}/defaultHeader`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await res.json();
  dispatch(setUser(data));
}

export const signup = (user) => async dispatch => {
  const { display_name, email, password } = user;
  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    body: JSON.stringify({ display_name, email, password }),
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};



export default sessionReducer;