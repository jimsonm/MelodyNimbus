import './DeleteProfile.css';
import { useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import * as userActions from '../../store/users';

function DeleteProfile({ setShowDeleteProfileModal }) {
    let history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const deleteAccount = async () => {
        if (+id === 1) {
            window.alert("You cannot delete the demo user.");
            await setShowDeleteProfileModal(false)
        } else {
            await dispatch(userActions.deleteUser({
                user_id: +id
            }))
            await setShowDeleteProfileModal(false)
            await history.push('/');
        }
    }

    return (
        <div>
            <div className='editProfileBanner'>
                Delete Your Account
            </div>
            <div className='deleteIrreversible'>
                Are you sure you want to delete your account, this action is irreversible.
            </div>
            <div className='editProfileButtonsDiv'>
                <button onClick={() => setShowDeleteProfileModal(false)} className='cancelButton' >Cancel</button>
                <buton onClick={deleteAccount} className='saveButton' >Delete my account</buton>
            </div>
        </div>
    )
}

export default DeleteProfile;