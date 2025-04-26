import './DepartmentForm.css';
import styles from './../../../styles/Forms/form.module.css';
import { useEffect, useState } from 'react';
import { createDepartment, fetchDepartment, updateDepartment } from '../../../api/departmentsApi';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';
import { showAlertSuccess } from '../../../utils/toastify';


const DepartmentForm = ({closeModal, action, id, onUpdate}) => {

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useLoading();
    const [data, setData] = useState({
        name: "",
        description: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSave = async (e) => {

        e.preventDefault();
        const apiCall = action === 'Edit' ? updateDepartment : createDepartment
        try {
            const response = await apiCall(data);
            if (response.status === 200) {
                onUpdate(data);
                showAlertSuccess(response.message);
            }
        } catch (error) {
            return error;
        } finally {
            closeModal();
        }
    }

    useEffect(() => {

        const handleFetchDepartment = async id => {
            try {
                setLoading(true);
                const response = await fetchDepartment(id);
                setData(response.data);
                
            } catch (error) {
                return error;
            } finally {
                setLoading(false)
            }
        }

        if (id !== undefined) {
            handleFetchDepartment(id);
        }
        
    }, [id, setLoading])

    useEffect(() => {
        action === 'Show' ? setEdit(true) : setEdit(false)
    }, [action])
    
    

    return (
        <div className="department-modal"
            onClick={ e => {
                if(e.target.className === 'department-modal') closeModal()  
            }}
        >
            { loading ? (<Loader/>) : 
                (
                    <div className='form'>
                        <div className='form-header'>
                            <h3>
                                {action} Department Information
                            </h3>
                        </div>
                        <div className='form-body'>
                            <form onSubmit={handleSave}>
                                <div className={styles['form-group']}>
                                    <label htmlFor='name'>Name</label>
                                    <input 
                                        onChange={handleChange}
                                        name='name'
                                        value={data.name}
                                        disabled={edit}

                                    />
                                </div>
                                <div className={styles['form-group']}>
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
                                    <div className={styles.button}>
                                        <button
                                            className={styles.btn}
                                            type='submit'
                                        >
                                            Submit
                                        </button>
                                        <button type="submit" className={styles['cancel-btn']} onClick={() => closeModal()}>Cancel</button>
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

export default DepartmentForm;