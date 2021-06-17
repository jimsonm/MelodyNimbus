import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './UserPicture.css';

function UserPicture() {
    const userId = useParams();
    const userProfile = useSelector((state) => state.user[userId.id]);
    return (
        <div>
            <div className='nameHeaderText'>
                {(userProfile?.first_name || userProfile?.last_name) && (userProfile.first_name !== "null" && userProfile.last_name !== "null")
                    ? <div>
                        {userProfile?.first_name} {userProfile?.last_name}
                    </div>
                    : null
                }
            </div>
            <img
                src={userProfile?.avatar_img}
                alt="profile"
                className='expandedImg'
            />
        </div>
    )
}

export default UserPicture;