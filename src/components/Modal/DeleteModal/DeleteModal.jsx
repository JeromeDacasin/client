
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';
import './DeleteModal.css';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';
import { useState } from 'react';


const DeleteModal = ({closeModal, id, onDelete, onUpdate, action = null}) => {

    const [loading, setLoading] = useLoading();
    const [reason, setReason] = useState('');

    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = action ? await onDelete(id, reason) : await onDelete(id);
            onUpdate(id);
            showAlertSuccess(response.message)
        } catch (error) {
            showAlertError(error.response.data.message)
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
                <h4>Are you sure you want to {action ? 'archive' : 'delete'} this ?</h4>
                {
                    action && (
                         <div>
                            <input
                                type="text"
                                className='deny-reason-input'
                                placeholder="Please state a reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    )
                }
                <div className="delete-button">
                    <button type="submit" className='submit' onClick={() => handleDelete()}>Yes</button>
                    <button type="submit" className='cancel' onClick={() => closeModal()}>No</button>
                </div>
            </div>}
        </div>
    );

};


export default DeleteModal;