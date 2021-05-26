const SET_USERS = 'users/SET_USERS';

const setUsers = (users) => ({
    type: SET_USERS,
    users,
});

export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users');
    const users = await res.json();
    dispatch(setUsers(users));
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            const newState = { ...state };
            action.users.forEach( (user) => {
                newState[user.id] = user;
            });
            console.log('23', newState)
            return newState;
        default:
            return state;
    }
}

export default usersReducer;