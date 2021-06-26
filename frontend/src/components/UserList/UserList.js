import { NavLink } from 'react-router-dom';
import './UserList.css';

const UserList = ({ user }) => {
    return (
        <div className='userListDiv'>
            {/* <div>
                User {user.id}: {user.display_name}
            </div> */}
            <div className='userDivs'>
                <div>
                    <div className='userAvatar'>
                        <NavLink to={`/users/${user.id}`}>
                            <img
                                style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                                src={user?.avatar_img || 'https://melody-nimbus.s3.us-west-1.amazonaws.com/default-avatar-image.webp'}
                                alt="profile"
                            />
                        </NavLink>
                    </div>
                </div>
                <div className='profileLink'>
                    <NavLink to={`/users/${user.id}`}>
                        {user.display_name}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default UserList;