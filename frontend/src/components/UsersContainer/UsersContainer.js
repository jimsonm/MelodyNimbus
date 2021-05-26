import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../store/users';
import './UsersContainer.css';
import UserList from '../UserList/UserList'

const UsersContainer = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => {
        return Object.values(state.user);
    })
    console.log(users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div>
            {users.map((user) => <UserList key={user.id} user={user} />)}
        </div>
    )
}

export default UsersContainer;