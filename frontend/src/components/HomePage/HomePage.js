import UsersContainer from "../UsersContainer/UsersContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import * as sessionActions from "../../store/session"

const HomePage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect (() => {
        dispatch(sessionActions.restoreUser());
    }, [])

    return (
        <div>
            <div>
                home page sdaadasda
            </div>
            {sessionUser && (
                <UsersContainer />
            )}
        </div>
    )
}

export default HomePage;