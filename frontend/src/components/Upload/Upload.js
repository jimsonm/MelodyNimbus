import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

function UploadTrack ({users}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser);
    dispatch(sessionActions.getProfile(sessionUser.id))
    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     if (file) setImage(file);
    // };

    return (
        <div>
            asdsdad
            {/* <input type="file" onChange={updateFile} /> */}
        </div>
        
    )
}

export default UploadTrack;