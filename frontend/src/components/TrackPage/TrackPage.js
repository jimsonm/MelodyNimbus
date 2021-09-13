import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './TrackPage.css';
import { useEffect, useState } from 'react';
import * as userActions from '../../store/users';
import { Modal } from '../../context/Modal';
import EditTrackModal from '../EditTrackModal';
import DeleteTrackModal from '../DeleteTrackModal';
import { GrPlay, GrPause } from "react-icons/gr";
import { setIsSongPlaying, setCurrentSong } from '../../store/current';
import { FaRegCommentDots, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdSave } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { getCommentsByTrack, addComment, deleteComment, editComment } from '../../store/comments';

function TrackPage({ setShowAudioPlayer }) {
    const { id } = useParams();
    const { track_id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => (state.user));
    const sessionUser = useSelector((state) => state.session.user);
    const userProfile = useSelector((state) => state.user[id]);
    const tracksBySelectedUser = useSelector((state) => state.user.tracks);
    const [showTrackModal, setShowTrackModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const currentIsPlaying = useSelector((state) => state.current.isPlaying);
    const [comment, setComment] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [edittedComment, setEdittedComment] = useState('');
    const [currentComment, setCurrentComment] = useState();
    const commentsObj = useSelector((state) => state.comments);
    const allComments = useSelector((state) => Object.values(state.comment));

    useEffect(() => {
        dispatch(getCommentsByTrack(track_id));
    }, []);

    let selectedTrack;
    if (tracksBySelectedUser) {
        selectedTrack = tracksBySelectedUser[track_id];
    }

    const addAComment = (user_id, track_id, comment) => {
        dispatch(addComment({ user_id, track_id, comment }));
        setComment('');
    }

    const deleteAComment = (commentId) => {
        dispatch(deleteComment(commentId));
    }

    const editAComment = (commentId, edittedComment) => {
        dispatch(editComment(commentId, edittedComment));
        setIsEditable(false);
        setEdittedComment('');
    }

    const onEditClick = (commentId) => {
        setIsEditable(true);
        setCurrentComment(commentId);
    }

    const cancelEdit = () => {
        setIsEditable(false);
        setEdittedComment('');
    }

    const showEditTrack = () => {
        setShowTrackModal(true)
    }

    const showConfirmDelete = () => {
        setShowDeleteModal(true)
    }

    const pauseSong = () => {
        dispatch(setIsSongPlaying(false));
    }

    const updateCurrent = (trackId) => {
        setShowAudioPlayer(true);
        dispatch(setCurrentSong(trackId));
        dispatch(setIsSongPlaying(true));
    }

    useEffect(() => {
        dispatch(userActions.getTracksFromUser(id))
        dispatch(userActions.getUsers())
    }, [dispatch])

    return (
        <div>
            {selectedTrack !== undefined && (
                <div className='flexCenter'>
                    <div className='trackPageContainer'>
                        <div className='flexboxBetween'>
                            <div className='descriptionContainer'>
                                <div className='playContainer'>
                                    <div>
                                        {currentIsPlaying === true
                                            ? <GrPause onClick={pauseSong} className='pauseIcon' />
                                            : <GrPlay onClick={() => updateCurrent(selectedTrack.id)} className='playIcon' />
                                        }
                                        {/* <div ref={waveformRef}></div> */}
                                        {/* <Waveform track={track} /> */}
                                    </div>
                                    <div>
                                        <div className='displayName2'>
                                            {userProfile?.display_name}
                                        </div>
                                        <div className='trackName2'>
                                            {selectedTrack?.track_name}
                                        </div>
                                    </div>

                                </div>
                                <div className='trackDescription2'>
                                    {selectedTrack?.description}
                                </div>
                                <div>
                                    {sessionUser?.id === userProfile?.id ? (
                                        <button onClick={showEditTrack} value={selectedTrack.id} className='editButton2'>
                                            Edit
                                        </button>) : null
                                    }
                                    {sessionUser?.id === userProfile?.id ? (
                                        <button onClick={showConfirmDelete} value={selectedTrack.id} className='deleteButton2'>
                                            Delete Track
                                        </button>) : null
                                    }
                                </div>
                            </div>
                            <div>
                                <img
                                    src={selectedTrack?.cover_art || userProfile?.avatar_img}
                                    alt="coverArt"
                                    className='trackCoverArt2'
                                />
                            </div>
                        </div>
                        <div className='flexbox'>
                            <img
                                src={userProfile?.avatar_img}
                                alt='profileAvatar'
                                className='userProfileTrackPage1'
                            />
                            <input
                                type='text'
                                placeholder='Write a comment'
                                className='writeComment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <FaRegCommentDots className='postComment' onClick={() => addAComment(sessionUser.id, selectedTrack.id, comment)} />
                        </div>
                        <div>
                            {showTrackModal && (
                                <Modal onClose={() => setShowTrackModal(false)}>
                                    <EditTrackModal setShowTrackModal={setShowTrackModal} track={selectedTrack} />
                                </Modal>
                            )}
                            {showDeleteModal && (
                                <Modal onClose={() => setShowDeleteModal(false)}>
                                    <DeleteTrackModal setShowDeleteModal={setShowDeleteModal} trackId={id} />
                                </Modal>
                            )}
                        </div>
                        {allComments && allComments?.map((comment) =>
                            <div key={comment.id} className='trackCommentDiv'>
                                <img
                                    src={users[comment.user_id]?.avatar_img}
                                    alt="coverArt"
                                    className='trackCoverArt'
                                />
                                <div className='trackCommentSection'>
                                    {!isEditable &&
                                        <div>
                                            {comment.response_text}
                                        </div>
                                    }
                                    {isEditable && currentComment !== comment.id &&
                                        <div>
                                            {comment.response_text}
                                        </div>
                                    }
                                    {isEditable && currentComment === comment.id &&
                                        <textarea
                                            value={edittedComment}
                                            onChange={(e) => setEdittedComment(e.target.value)}
                                            className='editCommentTextArea'
                                            placeholder={comment.response_text}
                                        />
                                    }
                                    <div>
                                        {sessionUser?.id === comment?.user_id &&
                                            <div className='flexCenter'>
                                                {isEditable && currentComment === comment.id ? <IoMdSave className='saveIcon' onClick={() => editAComment(comment.id, edittedComment)} />
                                                    : <FiEdit className='editIcon' onClick={() => onEditClick(comment.id)} />}
                                                <FaTrashAlt className='deleteIcon' onClick={() => deleteAComment(comment.id)} />
                                            </div>
                                        }
                                        {isEditable && currentComment === comment.id &&
                                            <div className='flexCenter'>
                                                <ImCancelCircle className='cancelIcon' onClick={cancelEdit}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default TrackPage;