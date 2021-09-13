import UsersContainer from "../UsersContainer/UsersContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import * as sessionActions from "../../store/session";
import * as userActions from '../../store/users';
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import Navigation2 from "../Navigation";
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import Carousel from "./Carousel";
import { setCurrentSong } from "../../store/current";


function HomePage({ isLoaded, setShowAudioPlayer, showAudioPlayer }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [currentSongId, setCurrentSongId] = useState();

    useEffect(() => {
        dispatch(setCurrentSong(currentSongId))
    }, [currentSongId])

    useEffect(async () => {
        await dispatch(sessionActions.restoreUser());
        await dispatch(userActions.getUsers());
        await dispatch(userActions.getAllTracks());
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
                                        <NavLink to={`/upload`}>
                                            <button className='saveButton startUploadButton'>Start uploading today</button>
                                        </NavLink>
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
                    <Navigation2 isLoaded={isLoaded} />
                    <div className='carouselDiv'>
                        <div className='carouselTextDiv'>
                            Trending tracks produced by MelodyNimbus users.
                        </div>
                        <Carousel setCurrentSongId={setCurrentSongId} setShowAudioPlayer={setShowAudioPlayer} showAudioPlayer={showAudioPlayer}/>
                    </div>
                    <div className='userDiv'>
                        <div className='userTextDiv'>
                            Check out other artists in the MelodyNimbus community.
                        </div>
                        <UsersContainer />
                    </div>
                </>
            )}
        </div>
    )
}

export default HomePage;