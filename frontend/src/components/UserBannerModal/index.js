import UserBanner from './UserBanner';
import './UserBanner.css';

function UserBannerModal({setShowBannerModal, bannerSrc, header_img ,toggle3}) {
    return (
        <UserBanner setShowBannerModal={setShowBannerModal} bannerSrc={bannerSrc} header_img={header_img} toggle3={toggle3}/>
    );
}

export default UserBannerModal;