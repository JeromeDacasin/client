
import modalStyles from './../../../styles/Modals/modals.module.css';
import confirmationStyles from './../../../styles/Modals/confirmation.module.css';
import { createBorrowedBook, updateBorrowedBook } from '../../../api/borrowedBooksApi';
import Loader from '../../Loader/Loader';
import { useLoading } from '../../../hooks/useLoading';
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';
import { useState } from 'react';





const ConfirmationModal = ({closeModal, action, id, onUpdate, message}) => {
    
    const [loading, setLoading] = useLoading();
    const [reason, setReason] = useState('');
    const actionMap = {
        Request: () => createBorrowedBook({ status: 'requested', book_id: id }),
        Approve: () => updateBorrowedBook({ status: 'borrowed', id }),
        Deny: () => updateBorrowedBook({ status: 'denied', reason: reason,  id }),
        Return: () => updateBorrowedBook({ status: 'returned', id }),
    };
    
    const handleSubmit = async () => {
        
        try {

            setLoading(true);

            if (actionMap[action]) {
                await actionMap[action]();
            } 

            onUpdate(action, id);
            showAlertSuccess(`Successfully ${action}`)
        } catch (error) {
            showAlertError(error.response.data.message)
        } finally {
            closeModal()
            setLoading(false)
        }
       
    }
   
    return (
         <div className={modalStyles.modals}
                    onClick={ e => {
                        if(e.target.className === modalStyles.modals) closeModal()  
                    }}
                >
            {loading && <Loader/>}
            { !loading &&
            <div className={confirmationStyles['confirm-section']}>

                <h4>{message}</h4>
                {
                    action === 'Deny' &&
                    <div>
                        <input
                            type="text"
                            className={confirmationStyles['confirm-reason-input']}
                            placeholder="Please state a reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                }
                
                <div className={confirmationStyles['confirm-button']}>
                    <button 
                        type="submit" 
                        style={{ background: action === 'Deny' ?  '#f44336' : '#4CAF50', color: '#fff' }}
                        onClick={() => handleSubmit()}
                    >
                        Yes
                    </button>
                    <button type="submit" className={confirmationStyles['cancel']} onClick={() => closeModal()}>No</button>
                </div>
            </div>}
        </div>
    );  
};

export default ConfirmationModal;