import DeleteTrack from './DeleteTrack';
import './DeleteTrack.css';

function DeleteTrackModal({setShowDeleteModal, trackId, setShowAudioPlayer}) {
    return (
        <DeleteTrack setShowDeleteModal={setShowDeleteModal} trackId={trackId} setShowAudioPlayer={setShowAudioPlayer}/>
    )
}

export default DeleteTrackModal;