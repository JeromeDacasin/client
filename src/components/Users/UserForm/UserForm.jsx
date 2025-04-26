import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import modalStyles from './../../../styles/Modals/modals.module.css';
import formStyles from './../../../styles/Forms/form.module.css';
import { useLoading } from '../../../hooks/useLoading';
import { createUser, fetchUser, updateUser } from '../../../api/usersApi';
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';

const UserForm = ({closeModal, action, id, onUpdate, title, roleId, userCredentials}) => {

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        email: "",
        contact_number: "",
        student_number: "",
        is_generated_student_number: ''

    });
    const [loading, setLoading] = useLoading();
    const [edit, setEdit] = useState(false);


    const handleSave = async (e) => {
        e.preventDefault();
        const apiCall = action === 'Edit' ? updateUser : createUser;

        try {
            setLoading(true);
            const updatedData = { ...data, role_id: roleId };
            const response = await apiCall(updatedData);
            setData(response);
            onUpdate(data);

            showAlertSuccess(response.message);
            action === 'Edit' ? userCredentials(false) : userCredentials(true, response.data);
            
        } catch(error) {
           
            showAlertError(error.response.data.message)
            return error.response.data.message
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
                
                if (id) {
                    const response = await fetchUser(id);
                    setData(response.data);
                }
            } catch (error) {
                showAlertError(error.data)
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
                                {action} {title} Information
                            </h3>
                        </div>
                        <div className='form-body'>
                            <form onSubmit={handleSave}>
                                <div className={formStyles['sample-grouping']}>
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
                                            type='text'
                                            value={data.last_name}
                                            disabled={edit}

                                        />
                                    </div>
                                </div>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='birth_date'>Birth Date</label>
                                    <input 
                                        type='date'
                                        max={new Date().toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        name='birth_date'
                                        value={data.birth_date}
                                        disabled={edit}

                                    />
                                </div>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='gender'>Gender</label>
                                    <select
                                        onChange={handleChange}
                                        name="gender"
                                        value={data.gender}
                                    >
                                        <option value="" disabled={edit}>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='contact_number'>Contact Number</label>
                                    <input 
                                        onChange={handleChange}
                                        name='contact_number'
                                        value={data.contact_number}
                                        disabled={edit}

                                    />
                                </div>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='email'>Email</label>
                                    <input 
                                        onChange={handleChange}
                                        name='email'
                                        value={data.email}
                                        disabled={edit}

                                    />
                                </div>
                                {title === 'Student' && (
                                    <div>
                                        {action === 'Create' ? (
                                            <div className={formStyles['form-group']}>
                                                <label htmlFor='is_generated_student_number'>Student Number Option</label>
                                                <div className={formStyles.options}>
                                                    <label className={formStyles.radio}>
                                                        <input
                                                            type='radio'
                                                            name='is_generated_student_number'
                                                            value={1}
                                                            checked={data.is_generated_student_number == 1}
                                                            onChange={handleChange}
                                                        />
                                                        Auto-generate
                                                    </label>
                                                    <label className={formStyles.radio}>
                                                        <input
                                                            type='radio'
                                                            name='is_generated_student_number'
                                                            value={0}
                                                            checked={data.is_generated_student_number == 0}
                                                            onChange={handleChange}
                                                        />
                                                        Manual
                                                    </label>
                                                </div>
                                                {data.is_generated_student_number == 0 && (
                                                    <div className={formStyles['form-group']}>
                                                        <label htmlFor='student_number'>Student Number</label>
                                                        <input
                                                            onChange={handleChange}
                                                            name='student_number'
                                                            value={data.student_number}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className={formStyles['form-group']}>
                                                <label htmlFor='student_number'>Student Number</label>
                                                <input
                                                    onChange={handleChange}
                                                    name='student_number'
                                                    value={data.student_number}
                                                    disabled
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
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
    );
;}

export default UserForm;
