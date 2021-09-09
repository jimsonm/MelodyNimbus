import './AudioPlayer.css'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

function BottomAudioPlayer() {
    const currentSong = useSelector(state => state.current.song)
    const [currentSongSrc, setCurrentSongSrc] = useState('')

    useEffect(() => {
        setCurrentSongSrc(currentSong?.track_src)
    }, [currentSong])

    return (
        <>
            <AudioPlayer
                className='fixedBottom'
                autoPlay={false}
                src={currentSongSrc}
                onPlay={e => console.log("onPlay")}
                layout={'horizontal-reverse'}
            />
        </>
    )
}

export default BottomAudioPlayer;