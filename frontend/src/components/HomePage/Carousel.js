import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './Carousel.css';
import { setIsSongPlaying } from '../../store/current';
import { NavLink } from 'react-router-dom';

SwiperCore.use([EffectCoverflow, Navigation, Pagination])

function Carousel({ setCurrentSongId, setShowAudioPlayer, showAudioPlayer, currentSongId }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => (state.user));
    const [showPlay, setShowPlay] = useState(false);
    const [hoverSongId, setHoverSongId] = useState();
    const isSongPlaying = useSelector((state) => (state.current.isPlaying));

    let songs;
    if (users.tracks) {
        songs = Object.values(users.tracks);
    }

    const onArtHover = (songId) => {
        setShowPlay(true);
        setHoverSongId(songId)
    }

    const onArtLeave = () => {
        setShowPlay(false);
        setHoverSongId(null)
    }

    const onCoverArtClick = (songId) => {
        setShowAudioPlayer(true);
        setCurrentSongId(songId);
        dispatch(setIsSongPlaying(true));
    }

    const onCoverArtPause = () => {
        dispatch(setIsSongPlaying(false));
    }

    const slides = [];
    let i = 0;
    if (songs) {
        songs.forEach(song => {
            const art = song.cover_art
            if (art !== null) {
                slides.push(
                    <div key={i}>
                        <SwiperSlide key={i} className='songSlide'>
                            <div className='flexCenter carouselSlideContain'
                                onMouseEnter={() => onArtHover(song.id)}
                                onMouseLeave={() => onArtLeave()}
                            >
                                {showPlay && hoverSongId === song.id && showAudioPlayer === false &&
                                    <div className='carouselPlayButtonContainer' onClick={() => onCoverArtClick(song.id)}>
                                        <div className='carouselPlayButton' />
                                    </div>
                                }
                                {showPlay && hoverSongId === song.id && isSongPlaying === false &&
                                    <div className='carouselPlayButtonContainer' onClick={() => onCoverArtClick(song.id)}>
                                        <div className='carouselPlayButton' />
                                    </div>
                                }
                                {showPlay && hoverSongId === song.id && isSongPlaying === true && hoverSongId !== currentSongId &&
                                    <div className='carouselPlayButtonContainer' onClick={() => onCoverArtClick(song.id)}>
                                        <div className='carouselPlayButton' />
                                    </div>
                                }
                                {showPlay && hoverSongId === song.id && isSongPlaying === true && hoverSongId === currentSongId &&
                                    <div className='carouselPlayButtonContainer' onClick={() => onCoverArtPause()}>
                                        <div className='carouselPauseButton' />
                                    </div>
                                }
                                <NavLink to={`/users/${song.user_id}/${song.id}`}>
                                    <img src={song.cover_art}
                                        className='carouselCoverArt'
                                    />
                                </NavLink>
                            </div>
                            <div className='carouselTrackName'>
                                <NavLink to={`/users/${song.user_id}/${song.id}`}>
                                    {song.track_name}
                                </NavLink>
                            </div>
                        </SwiperSlide>
                    </div>
                )
            }
            i++;
        })
    }

    return (
        <>
            <Swiper id="main"
                effect="coverflow"
                // tag="section"
                // wrapperTag="ul"
                className='swiperContainer'
                navigation
                pagination={{
                    clickable: true,
                    // dynamicBullets: true,
                    // dynamicMainBullets: 1,
                }}
                spaceBetween={0}
                slidesPerView={5}
                loop={true}
                coverflowEffect={{
                    "rotate": 50,
                    "stretch": 0,
                    "depth": 50,
                    "modifier": 1,
                    "slideShadows": false,
                }}
            >
                {slides}
            </Swiper>
        </>
    )
}

export default Carousel;