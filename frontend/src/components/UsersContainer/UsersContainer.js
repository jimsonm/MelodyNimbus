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
    const userList = users.filter(users => users.id !== undefined)
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div>
            <div className='container flexCenter'>
                {userList.map((user) => {
                    return <UserList key={user.id} user={user} />
                })}

            </div>
        </div>
    )
}

export default UsersContainer;