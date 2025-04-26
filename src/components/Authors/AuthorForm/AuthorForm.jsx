import { useEffect, useState } from 'react';
import modalStyles from './../../../styles/Modals/modals.module.css';
import formStyles from './../../../styles/Forms/form.module.css';
import Loader from '../../Loader/Loader';
import { useLoading } from '../../../hooks/useLoading';
import { createAuthor, fetchAuthor, updateAuthor } from '../../../api/authorsApi';
import { showAlertSuccess } from '../../../utils/toastify';

const AuthorForm = ({closeModal, action, id, onUpdate}) => {

    const [data, setData] = useState({
        first_name: "",
        last_name: ""
    });
    const [loading, setLoading] = useLoading();
    const [edit, setEdit] = useState(false);

    

    const handleSave = async (e) => {
        e.preventDefault();
        const apiCall = action === 'Edit' ? updateAuthor : createAuthor;

        try {
            setLoading(true);
            const response = await apiCall(data);
            setData(response);
            onUpdate(data);
            showAlertSuccess(response.message);
        } catch(error) {
            return error
        } finally {
            closeModal();
            setLoading(false);
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
        const handleFetchAuthor = async id => {
            try {
                setLoading(true)
                const response = await fetchAuthor(id);
                setData(response.data);
            } catch (error) {
                return error
            } finally {
                setLoading(false)
            }
        }

        handleFetchAuthor(id);
    }, [id, setLoading])
    
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
                            {action} Author Information
                        </h3>
                    </div>
                    <div className='form-body'>
                        <form onSubmit={handleSave}>
                            <div className={formStyles['form-group']}>
                                <label htmlFor='first_name'>First Name</label>
                                <input 
                                    onChange={handleChange}
                                    name='first_name'
                                    value={data.first_name}
                                    disabled={edit}

                                />
                            </div>
                            <div className={formStyles['form-group']}>
                                <label htmlFor='last_name'>Last Name</label>
                                <input 
                                    onChange={handleChange}
                                    name='last_name'
                                    value={data.last_name}
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
                                    <button type="submit" className={formStyles['cancel-btn']} onClick={() => closeModal()}>Cancel</button>
                                </div>
                                
                            }
                        </form>
                    </div>
                </div>
            )
        }
    </div>
    )
};


export default AuthorForm;