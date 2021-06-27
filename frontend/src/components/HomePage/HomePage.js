import UsersContainer from "../UsersContainer/UsersContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import Navigation from "../Navigation";
import './HomePage.css';

function HomePage({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.restoreUser());
    }, [])

    return (

        <div>
            {!sessionUser && (
                <div>
                    <div className='flexJustCenter'>
                        <div className='homeBannerContainer'>
                            <div className='block secondContainer'>
                                <div className='homeBannerLinks'>
                                    <div className='logoText'>
                                            MELODYNIMBUS
                                    </div>
                                    <div>
                                        <div className='flexbox homeButtonContainer'>
                                            <LoginFormModal />
                                            <div className='buttonSpacing' />
                                            <SignupFormModal />
                                        </div>
                                    </div>
                                </div>
                                <div className='textContent'>
                                    <div className='homeText1'>
                                        What's next in music is first on MelodyNimbus
                                    </div>
                                    <div className='homeText2'>
                                        Upload your first track and begin your journey. MelodyNimbus gives you space to create, find your fans, and connect with other artists.
                                    </div>
                                    <div className='homeText3'>
                                        <button className='saveButton startUploadButton'>Start uploading today</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flexJustCenter'>
                        <div className='thirdContainer'>
                            <div className='trendingText'>
                                Hear from some of our trending users for free in the MelodyNimbus community
                            </div>
                            <div>
                                <UsersContainer />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {sessionUser && (
                <>
                    <Navigation isLoaded={isLoaded} />
                    <UsersContainer />
                </>
            )}
        </div>
    )
}

export default HomePage;