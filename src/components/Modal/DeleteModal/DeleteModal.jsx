
import { showAlertSuccess } from '../../../utils/toastify';
import './DeleteModal.css';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';


const DeleteModal = ({closeModal, id, onDelete, onUpdate}) => {

    const [loading, setLoading] = useLoading();

    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await onDelete(id);
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
        <div className="delete-modal" onClick={(e) => {
            if (e.target.className === 'delete-modal') closeModal()
        }}>
            {loading && <Loader/>}
            { !loading &&
            <div className="delete-section">
                <h4>Are you sure you want to Delete / Archive this ?</h4>
                <div className="delete-button">
                    <button type="submit" className='submit' onClick={() => handleDelete()}>Yes</button>
                    <button type="submit" className='cancel' onClick={() => closeModal()}>No</button>
                </div>
            </div>}
        </div>
    );

};


export default DeleteModal;