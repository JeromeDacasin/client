import { useState } from 'react';
import { useLoading } from '../../../hooks/useLoading';
import modalStyles from './../../../styles/Modals/modals.module.css';
import './ImportModal.css';
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';
import { importBook } from '../../../api/importApi';
import Loader from '../../Loader/Loader';

const ImportModal = ({ closeModal }) => {

    const [loading, setLoading] = useLoading();
    const [file, setFile] = useState(null);

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        console.log(e)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!file) {
            showAlertError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoading(true)

            const response = await importBook(formData);
            closeModal()
            showAlertSuccess(response.message);

        } catch (error) {
            showAlertError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={modalStyles.modals}
            onClick={ e => {
                if(e.target.className === modalStyles.modals) closeModal()  
            }}
        >   
            {
                loading ? <Loader/> : (
                    <div className='import-modal-content'>
                    <form className='import-form' onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange}/>
                        <button className='import-button'>
                            Upload File
                        </button>
                    </form>
                </div>
                ) 
            }
            
        </div>
    )
}

export default ImportModal;