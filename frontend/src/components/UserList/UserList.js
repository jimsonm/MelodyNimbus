import { NavLink } from 'react-router-dom';

const UserList = ({ user }) => {
    return (
        <div>
            <div>
                User {user.id}: {user.display_name}
            </div>
            <div>
            <NavLink to={`/users/${user.id}`}>
              Profile
            </NavLink>
            <img
                style={{ width: "150px" }}
                src={user?.avatar_img}
                alt="profile"
            />
            </div>
        </div>
    )
}

export default UserList;