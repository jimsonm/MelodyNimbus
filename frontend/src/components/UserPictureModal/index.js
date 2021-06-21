import UserPicture from './UserPicture';
import './UserPicture.css';

function UserPictureModal({imgSrc, setShowPictureModal, avatar_img, toggle}) {
    return (
        <UserPicture imgSrc={imgSrc} setShowPictureModal={setShowPictureModal} avatar_img={avatar_img} toggle={toggle}/>
    );
}

export default UserPictureModal;