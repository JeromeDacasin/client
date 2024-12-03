import { useState } from 'react';
import { deleteBook } from '../../api/booksApi';
import { showAlertSuccess } from '../../utils/toastify';
import './DeleteModal.css';



const DeleteModal = ({closeModal, id}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await deleteBook(id);
            showAlertSuccess(response.data)
        } catch (error) {
            return error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="delete-modal" onClick={(e) => {
            if (e.target.className === 'delete-modal') closeModal()
        }}>
            <div className="delete-section">
                <h4>Are you sure you want to delete this ?</h4>
                <div className="delete-button">
                    <button type="submit" className='submit' onClick={() => handleDelete()}>Submit</button>
                    <button type="submit" className='cancel' onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </div>
    );

};


export default DeleteModal;