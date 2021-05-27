import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const GET_USER = 'session/getUser';
const REMOVE_USER = 'session/removeUser';
// const GET_TRACKS = 'session/getTracks';

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

// const getTracks = (track) => {
//   return {
//     type: GET_TRACKS,
//     payload: track,
//   };
// };

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

// export const getTracksFromUser = (id) => async (dispatch) => {
//   const response = await csrfFetch(`api/${id}/tracks`);
//   const resWithTracks = await response.json();
//   dispatch(getTracks(resWithTracks))
//   return resWithTracks;
// }

export const getProfile = (id) => async (dispatch) => {
  console.log('41 id', id)
  const response = await csrfFetch(`/api/users/${id}`)
  console.log('43 res', response);
  const updatedProfile = await response.json();
  console.log('45 updatedProfile', updatedProfile);
  dispatch(getUser(updatedProfile))
  return updatedProfile;
}

  // export const editAvatar = (payload) => async (dispatch) => {
  //   const {}
  // }

export const editProfile = (payload) => async (dispatch) => {

  const { display_name, image, first_name, last_name, city, country, bio, id } = payload;
  console.log('display_name', display_name)
  const formData = new FormData();
  formData.append("display_name", display_name);
  console.log('64, formData', formData)
  // formData.append("image", image);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("id", id);

  // for single file
  if (image) formData.append("image", image);
  console.log('82, formData', formData);
  console.log('payload.id:', payload.id);
  console.log('payload:', payload);
  const res = await csrfFetch(`/api/users/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  console.log('res', res);
  const data = await res.json();
  console.log('data', data);
  dispatch(setUser(data));

  // console.log('payload', payload);
  // const response = await csrfFetch(`/api/users/${payload.id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(payload),
  // })
  // console.log('response', response);
  // if(response.ok) {
  // const updatedProfile = await response.json();
  // console.log('updatedprofile', updatedProfile);
  // dispatch(setUser(updatedProfile));
  // }
}

export const signup = (user) => async dispatch => {
  const { images, image, display_name, email, password } = user;
  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    body: JSON.stringify({display_name, email, password}),
  });

  const data = await res.json();
  console.log('data', data);
  dispatch(setUser(data.user));
  // return response;
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