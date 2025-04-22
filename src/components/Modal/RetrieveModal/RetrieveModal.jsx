
import { showAlertSuccess } from '../../../utils/toastify';
import './RetrieveModal.css';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';


const RetrieveModal = ({closeModal, id, onRetrieve, onUpdate}) => {

    const [loading, setLoading] = useLoading();

    const handleRetrieve = async () => {
        try {
            setLoading(true)
            const response = await onRetrieve(id);
            onUpdate(id);
            showAlertSuccess(response.message)
        } catch (error) {
            return error
        } finally {
            closeModal()
            setLoading(false)
        }
    }
    
    

    return (
        <div className="retrieve-modal" onClick={(e) => {
            if (e.target.className === 'retrieve-modal') closeModal()
        }}>
            {loading && <Loader/>}
            { !loading &&
            <div className="retrieve-section">
                <h4>Are you sure you want to retrieve this?</h4>
                <div className="retrieve-button">
                    <button type="submit" className='submit' onClick={() => handleRetrieve()}>Yes</button>
                    <button type="submit" className='cancel' onClick={() => closeModal()}>No</button>
                </div>
            </div>}
        </div>
    );

};


export default RetrieveModal;