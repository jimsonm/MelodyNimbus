import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './UserBanner.css';
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';

function UserBanner({ setShowBannerModal, bannerSrc, header_img, toggle3 }) {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfile2({
            image: header_img,
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
        setShowBannerModal(false);
        toggle3();
    }

    return (
        <div className='bannerModal'>
            <div className='bannerText'>
                Preview your header image
            </div>
            <div className='previewDiv'>
                <img
                    src={bannerSrc}
                    alt="bannerImg"
                    className='bannerImg'
                />
                <img
                    src={userProfile?.avatar_img}
                    alt='profile'
                    className='avaImg'
                />
                <div className='nameDiv'>
                    <div className='profileDisplayName2'>
                        {userProfile?.display_name}
                    </div>
                    {(userProfile?.first_name || userProfile?.last_name) && (userProfile.first_name !== "null" && userProfile.last_name !== "null")
                        ? <div className='profileName2'>
                            {userProfile?.first_name} {userProfile?.last_name}
                        </div>
                        : null
                    }
                </div>
            </div>
            {bannerSrc && (
                <div className='buttonDiv'>
                <form onSubmit={handleSubmit2}>
                    <button className='cancelButton'>Cancel</button>
                    <button type='submit' onSubmit={handleSubmit2} className='saveButton'>Save</button>
                </form>
            </div>
            )}
        </div>
    )
}

export default UserBanner;