import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './Carousel.css';

SwiperCore.use([EffectCoverflow, Navigation, Pagination])

function Carousel({setCurrentSongId}) {
    const users = useSelector((state) => (state.user));

    let songs;
    if (users.tracks) {
        songs = Object.values(users.tracks);
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
                            <img src={song.cover_art} className='carouselCoverArt' onClick={() => setCurrentSongId(song.id)}/>
                            <div className='carouselTrackName'>
                            {song.track_name}
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