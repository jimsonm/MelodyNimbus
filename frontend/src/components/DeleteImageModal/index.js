import DeleteImage from "./DeleteImage";
import './DeleteImage.css';

function DeleteImageModal({toggle, img, setShowDeleteModal, toggle3}) {
    return (
        <DeleteImage toggle={toggle} img={img} setShowDeleteModal={setShowDeleteModal} toggle3={toggle3}/>
    )
}

export default DeleteImageModal;