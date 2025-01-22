import modalStyles from './../../../styles/Modals/modals.module.css';
import formStyles from './../../../styles/Forms/form.module.css';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';
import { showAlertSuccess } from '../../../utils/toastify';
import { useEffect, useState } from 'react';
import { createPublisher, fetchPublisher, updatePublisher } from '../../../api/publisherApi';



const PublisherForm = ({closeModal, action, id, onUpdate}) => {

    const [loading, setLoading] = useLoading();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: ""
    });


    const handleSave = async e => {
        e.preventDefault();
        const apiCall = action === 'Edit' ? updatePublisher : createPublisher;
        
         try {
            setLoading(true);
            const response = await apiCall(data);
            if (response.status === 200) {        
                setLoading(false);
                showAlertSuccess(response.message);
                onUpdate(data);
            }
        } catch (error) {
            setLoading(false);
            return error;
        } finally {
            closeModal();
        }
        
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    useEffect(() => {

        const handleFetchPublisher = async id => {
            try {
                setLoading(true);
                const response = await fetchPublisher(id);
                setData(response.data);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        } 

        handleFetchPublisher(id);

    }, [setLoading, id]);

    useEffect(() => {
        action === 'Show' ? setEdit(true) : setEdit(false)
    }, [action])
    


    return (
        <div className={modalStyles.modals}
            onClick={ e => {
                if(e.target.className === modalStyles.modals) closeModal()  
            }}
        >
             { loading ? (<Loader/>) : 
                (
                    <div className='form'>
                        <div className='form-header'>
                            <h3>
                                {action} Publisher Information
                            </h3>
                        </div>
                        <div className='form-body'>
                            <form onSubmit={handleSave}>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='name'>Name</label>
                                    <input 
                                        onChange={handleChange}
                                        name='name'
                                        value={data.name}
                                        disabled={edit}

                                    />
                                </div>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='description'>Description</label>
                                    <textarea 
                                        onChange={handleChange}
                                        value={data.description}
                                        name='description'
                                        rows={4}
                                        cols={4}
                                        disabled={edit}
                                    />
                                </div>
                                {
                                    action !== 'Show' && 
                                    <div className={formStyles.button}>
                                        <button
                                            className={formStyles.btn}
                                            type='submit'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    
                                }
                            </form>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default PublisherForm;