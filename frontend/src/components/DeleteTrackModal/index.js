import DeleteTrack from './DeleteTrack';
import './DeleteTrack.css';

function DeleteTrackModal({setShowDeleteModal, trackId}) {
    return (
        <DeleteTrack setShowDeleteModal={setShowDeleteModal} trackId={trackId}/>
    )
}

export default DeleteTrackModal;