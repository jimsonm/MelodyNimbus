import EditTrack from './EditTrack';
import './EditTrack.css';

function EditTrackModal({setShowTrackModal, track}) {
    return (
        <EditTrack setShowTrackModal={setShowTrackModal} track={track}/>
    )
}

export default EditTrackModal;