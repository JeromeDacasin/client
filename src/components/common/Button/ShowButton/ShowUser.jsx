import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ShowUser.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ShowUser = ({  handleUser, userCredentials }) => {
    return (
        <>
            <div className="user-credentials-overlay" onClick={ () => handleUser(false)}></div>
            <div className="user-credentials">
                <button className="close-btn" onClick={ () => handleUser(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                    <label>Username: {userCredentials.userName}</label>
                    <label>Password: {userCredentials.password}</label>
                    
            </div>
        </>
    );
}

export default ShowUser;
