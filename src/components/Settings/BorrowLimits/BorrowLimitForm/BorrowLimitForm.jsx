import { useEffect, useState } from 'react';
import modalStyles from './../../../../styles/Modals/modals.module.css';
import formStyles from './../../../../styles/Forms/form.module.css';
import Loader from '../../../Loader/Loader';
import { showAlertSuccess } from './../../../../utils/toastify';
import { useLoading } from '../../../../hooks/useLoading';
import { createBorrowLimit, fetchBorrowLimit, updateBorrowLimit } from '../../../../api/borrowLimitApi';
import { fetchRoleChecker } from '../../../../api/roleApi';



const BorrowLimitForm = ({closeModal, action, id, onUpdate}) => {

     const [loading, setLoading] = useLoading();
        const [edit, setEdit] = useState(false);
        const [roles, setRoles] = useState("");
        const [data, setData] = useState({
            number: 0,
            role_id: "",
            role: ""
        });
    
    
        const handleSave = async e => {
            e.preventDefault();
            const apiCall = action === 'Edit' ? updateBorrowLimit : createBorrowLimit;
            
             try {
                setLoading(true);
                const response = await apiCall(data);
                if (response.status === 200) {        
                    setLoading(false);
                    showAlertSuccess(response.message);
                    data.role = updateName(data.role_id)
                    onUpdate(data);
                }
            } catch (error) {
                setLoading(false);
                return error;
            } finally {
                closeModal();
            }
            
        }

        const updateName = (roleId) => {    
            const role = roles.find(role => role.id == roleId)
            return role.name;
        }
    
        const handleChange = e => {
            const {name, value} = e.target;
            console.log(name, value)
            setData(prevData => ({
                ...prevData,
                [name]: value
            }))
        }
    
    
        useEffect(() => {
    
            const handleFetchBorrowLimit = async id => {
                try {
                    setLoading(true);
                    if (id) {
                        const response = await fetchBorrowLimit(id);
    
                        setData(response.data);
                    }
                    const roleData = await fetchRoleChecker({model: 'BorrowLimit', paginate: 0});
                    setRoles(roleData);
                } catch (error) {
                    return error;
                } finally {
                    setLoading(false);
                }
            } 
    
            handleFetchBorrowLimit(id);
    
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
                                {action} Borrow Limit Information
                            </h3>
                        </div>
                        <div className='form-body'>
                            <form onSubmit={handleSave}>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='number'>Max Borrowable Books</label>
                                    <input 
                                        onChange={handleChange}
                                        name='number'
                                        value={data.number}
                                        disabled={edit}

                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="role">Role</label>
                                    { roles && 
                                        <select 
                                            onChange={handleChange}
                                            name="role_id" 
                                            id="role_id" 
                                            value={data.role_id || ''}
                                        >
                                            <option value="" disabled>Select a role</option> 
                                            {
                                                roles.map(role => (
                                                    <option 
                                                        value={role.id} 
                                                        key={role.id} 
                                                        disabled={role.disabled}
                                                    >
                                                        {role.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    }
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

export default BorrowLimitForm;