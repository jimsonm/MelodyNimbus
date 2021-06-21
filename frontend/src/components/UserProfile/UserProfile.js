import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import EditUserProfile from './EditUserProfile';
import UserPictureModal from '../UserPictureModal';
import UserBannerModal from "../UserBannerModal";
import DeleteImageModal from "../DeleteImageModal";
import { useParams } from 'react-router-dom';
import Tracks from '../Tracks/Tracks';

function UserProfilePage() {
    const userId = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userProfile = useSelector((state) => state.user[userId.id]);
    const [avatar_img, setAvatar_Img] = useState(userProfile?.avatar_img);
    const [header_img, setHeader_Img] = useState(userProfile?.header_img);
    const [showModal, setShowModal] = useState(false);
    const [showPictureModal, setShowPictureModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteImgType, setDeleteImgType] = useState();
    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [toggleDisplay3, setToggleDisplay3] = useState(false);
    const [opacity, setOpacity] = useState(false);
    const [imgSrc, setImgSrc] = useState();
    const [bannerSrc, setBannerSrc] = useState();

    //avatar linear-gradient(135deg,#e6846e,#846170
    //bg image linear-gradient(315deg, rgb(230, 132, 110) 0%, rgb(132, 97, 112) 100%)

    useEffect(() => {
        dispatch(userActions.getUsers(userId.id))
    }, []);

    const correctUser = (sessionUser?.id === userProfile?.id)

    const deleteAvatar = async (e) => {
        console.log('888888888 test')
        e.preventDefault();
        await dispatch(sessionActions.editProfileAvatar({
            image: "",
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
        toggle();
    };

    const deleteHeader = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.editProfileHeader({
            image: '',
            id: userId.id,
            display_name: sessionUser.display_name,
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            city: sessionUser.city,
            country: sessionUser.country,
            bio: sessionUser.bio,
        }))
        dispatch(userActions.getUsers(userId.id))
        toggle3();
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar_Img(file);
        setImgSrc(window.URL.createObjectURL(file))
        setShowPictureModal(true)
    };
    const updateFile2 = (e) => {
        console.log('testing');
        const file = e.target.files[0];
        if (file) setHeader_Img(file);
        setBannerSrc(window.URL.createObjectURL(file))
        setShowBannerModal(true)
    };

    const expandImage = () => {
        setImgSrc()
        setShowPictureModal(true)
    }

    const showDelete = () => {
        setDeleteImgType('avatar');
        setShowDeleteModal(true);
    }

    const showDelete2 = () => {
        setDeleteImgType('header');
        setShowDeleteModal(true);
    }

    const toggle = () => {
        setToggleDisplay(hidden => !hidden)
        setOpacity(invis => !invis)
        const button = document.querySelector(".updateImage");
        if (opacity === false) {
            button.classList.add("opacity1")
        } else {
            button.classList.remove("opacity1")
        }
    }

    const toggle3 = () => {
        setToggleDisplay3(hidden => !hidden)
        const button = document.querySelector(".updateImage3");
        if (button.classList.contains("opacity1")) {
            button.classList.remove("opacity1")
        } else {
            button.classList.add("opacity1")
        }
    }

    return (
        <div>
            <div className='banner'>
                <img
                    src={userProfile?.header_img}
                    alt='banner'
                    className='bannerImg'
                />
            </div>
            <div className='profileHeader'>
                <div>
                    <div className='profileHeaderImgDiv'>
                        <img
                            src={userProfile?.avatar_img}
                            alt="profile"
                            className="profileHeaderImg"
                            onClick={expandImage}
                        />
                        {correctUser && (
                            <button className='updateImage' onClick={toggle}>Update Image</button>
                        )}
                        {toggleDisplay && (
                            <div className='replaceDiv'>
                                <div>
                                    <input type="file" name="file" id="file" onChange={updateFile} className='imageInputs' />
                                    <label htmlFor='file' className='imageUpload'>Replace Image</label>
                                </div>
                            </div>
                        )}
                        {toggleDisplay && (
                            <div className='deleteDiv' onClick={showDelete}>
                                Delete Image
                            </div>
                        )}
                        {showDeleteModal === true ?
                            <Modal>
                                <DeleteImageModal toggle={toggle} img={deleteImgType} setShowDeleteModal={setShowDeleteModal} toggle3={toggle3} />
                            </Modal> : null
                        }
                    </div>
                    {showPictureModal === true ?
                        <Modal onClose={() => setShowPictureModal(false)}>
                            <UserPictureModal imgSrc={imgSrc} setShowPictureModal={setShowPictureModal} avatar_img={avatar_img} toggle={toggle} />
                        </Modal> : null}
                </div>
                <div className='profileNameContainer'>
                    <div>
                        <div className='profileDisplayName'>
                            {userProfile?.display_name}
                        </div>
                        {(userProfile?.first_name || userProfile?.last_name) && (userProfile.first_name !== "null" && userProfile.last_name !== "null")
                            ? <div className='profileName'>
                                {userProfile?.first_name} {userProfile?.last_name}
                            </div>
                            : null
                        }
                    </div>
                    <div>
                        {correctUser && (
                            <button className='updateImage3' onClick={toggle3}>Update Image</button>
                        )}
                        {toggleDisplay3 && (
                            <div className='replaceDiv3'>
                                <div>
                                    <input type="file" name="file2" id="file2" onChange={updateFile2} className='imageInputs' />
                                    <label htmlFor='file2' className='imageUpload'>Replace Image</label>
                                </div>
                            </div>
                        )}
                        {toggleDisplay3 && (
                            <div className='deleteDiv3' onClick={showDelete2}>
                                Delete Image
                            </div>
                        )}
                        {showBannerModal === true ?
                            <Modal>
                                <UserBannerModal bannerSrc={bannerSrc} setShowBannerModal={setShowBannerModal} header_img={header_img} toggle3={toggle3} />
                            </Modal> : null
                        }
                    </div>
                </div>
            </div>
            <div className='editButtonDiv'>
                {userProfile?.id === sessionUser?.id
                    ? <button onClick={() => setShowModal(true)}>Edit</button>
                    : null
                }
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditUserProfile setShowModal={setShowModal} toggle={toggle} />
                    </Modal>
                )}
            </div>
            <div className='profileBodyContainer'>
                <div className='allTracksDiv'>
                    All Tracks
                    <div>
                        <Tracks />
                    </div>
                </div>
                <div className='aboutMe'>
                    {userProfile?.bio}
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;