
import modalStyles from './../../../styles/Modals/modals.module.css';
import confirmationStyles from './../../../styles/Modals/confirmation.module.css';
import { createBorrowedBook, updateBorrowedBook } from '../../../api/borrowedBooksApi';
import Loader from '../../Loader/Loader';
import { useLoading } from '../../../hooks/useLoading';
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';





const ConfirmationModal = ({closeModal, action, id, onUpdate, message}) => {
    
    const [loading, setLoading] = useLoading();
    const actionMap = {
        Request: () => createBorrowedBook({ status: 'requested', book_id: id }),
        Approve: () => updateBorrowedBook({ status: 'borrowed', id }),
        Deny: () => updateBorrowedBook({ status: 'denied', id }),
        Return: () => updateBorrowedBook({ status: 'returned', id }),
    };
    
    const handleSubmit = async () => {
        
        try {

            setLoading(true);

            if (actionMap[action]) {
                await actionMap[action]();
            } 

            // if (action === 'Request') {
            //     await createBorrowedBook({status: 'requested', id});
            // }
            
            // if (action === 'Approve') {
            //     await updateBorrowedBook({status: 'borrowed', id});
            // }
    
            // if (action === 'Deny') {
            //     await updateBorrowedBook({status: 'denied', id});
            // }

            // if (action === 'Return') {
            //     await updateBorrowedBook({status: 'returned', id});

            // }

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
                <div className={confirmationStyles['confirm-button']}>
                    <button 
                        type="submit" 
                        style={{ background: action === 'Deny' ?  '#f44336' : '#4CAF50', color: '#fff' }}
                        onClick={() => handleSubmit()}
                    >
                        {action}
                    </button>
                    <button type="submit" className={confirmationStyles['cancel']} onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>}
        </div>
    );  
};

export default ConfirmationModal;