import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './UserPicture.css';
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';

function UserPicture({ imgSrc, setShowPictureModal, avatar_img, toggle}) {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);

    useEffect(() => {
        if (imgSrc) {
            imgCheck()
        }
    }, [imgSrc])

    const imgCheck = () => {
        if (imgSrc) {
            let image = document.querySelector(".expandedImg")
            image.classList.add("addBorderRadius");
        }
    }

    const handleSubmit = async (e) => {
        console.log('zzzzzzzz', imgSrc)
        e.preventDefault();
        await dispatch(sessionActions.editProfile({
            image: avatar_img,
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))

        // await dispatch(sessionActions.changeAvatarImg({
        //     image: imgSrc,
        //     id: userId.id
        // }))
        dispatch(userActions.getUsers(userId.id))
        setShowPictureModal(false);
        toggle();
        // setToggleDisplay(false);
        // const button = document.querySelector(".updateImage");
        // if (opacity === false) {
        //     button.classList.add("opacity1")
        // }
    };

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
                src={imgSrc || userProfile?.avatar_img}
                alt="profile"
                className='expandedImg'
            />
            {imgSrc && (
                <div className='buttonDiv'>
                    <form onSubmit={handleSubmit}>
                        <button className='cancelButton'>Cancel</button>
                        <button type='submit' onSubmit={handleSubmit} className='saveButton'>Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default UserPicture;