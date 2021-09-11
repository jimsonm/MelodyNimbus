import './AudioPlayer.css'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react';

function BottomAudioPlayer({ audioState, setAudioState }) {
    const audioRef = useRef()
    const currentSong = useSelector(state => state.current.song)
    const [currentSongSrc, setCurrentSongSrc] = useState('')

    // const onAudioPlaying = () => {
    //     setAudioState(audioRef.current.audio.current.currentTime)
    //     // console.log(audioRef)
    //     // console.log(audioRef.current.audio.current.currentTime)
    // }

    // const onLoad = () => {
    //     if (audioState > 0) {
    //         console.log(audioState)
    //         audioRef.current.pause();
    //         audioRef.current.load();
    //         audioRef.current.currentTime = audioState;
    //         audioRef.current.play();
    //         // audioRef.currentTime = audioState
    //     }
    //     console.log('works')
    // }

    useEffect(() => {
        setCurrentSongSrc(currentSong?.track_src)
    }, [currentSong])

    return (
        <>
            <AudioPlayer
                ref={audioRef}
                className='fixedBottom'
                autoPlay={false}
                src={currentSongSrc}
                onPlay={e => console.log("onPlay")}
                layout={'horizontal-reverse'}
                // onListen={onAudioPlaying}
                // onCanPlayThrough={onLoad}
            />
        </>
    )
}

export default BottomAudioPlayer;