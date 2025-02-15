import modalStyles from './../../../styles/Modals/modals.module.css';
import formStyles from './../../../styles/Forms/form.module.css';
import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';
import { showAlertSuccess } from '../../../utils/toastify';
import { useEffect, useState } from 'react';
import { updatePenalty, createPenalty, fetchPenalty } from '../../../api/penaltyApi';
import { fetchRoles } from '../../../api/roleApi';




const PenaltyForm = ({closeModal, action, id, onUpdate}) => {

    const [loading, setLoading] = useLoading();
    const [edit, setEdit] = useState(false);
    const [roles, setRoles] = useState("");
    const [data, setData] = useState({
        name: "",
        role_id: ""
    });


    const handleSave = async e => {
        e.preventDefault();
        const apiCall = action === 'Edit' ? updatePenalty : createPenalty;
        
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

        const handleFetchPenalty = async id => {
            try {
                setLoading(true);
                if (id) {
                    const response = await fetchPenalty(id);

                    setData(response.data);
                }
                const roleData = await fetchRoles({paginate: 0});
                setRoles(roleData.data);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        } 

        handleFetchPenalty(id);

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
                                {action} Penalty Information
                            </h3>
                        </div>
                        <div className='form-body'>
                            <form onSubmit={handleSave}>
                                <div className={formStyles['form-group']}>
                                    <label htmlFor='fine'>Fine</label>
                                    <input 
                                        onChange={handleChange}
                                        name='fine'
                                        value={data.fine}
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
                                                roles.map( role => (
                                                    <option value={role.id} key={role.id}>{role.name}</option>
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

export default PenaltyForm;