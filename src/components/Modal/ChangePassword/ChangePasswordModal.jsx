import { useLoading } from '../../../hooks/useLoading';
import Loader from '../../Loader/Loader';
import modalStyles from './../../../styles/Modals/modals.module.css';
import formStyles from './../../../styles/Forms/form.module.css';
import { useState } from 'react';
import { showAlertError, showAlertSuccess } from '../../../utils/toastify';
import { changePassword } from '../../../api/usersApi';


const ChangePasswordModal = ({closeModal}) => {

    const [loading, setLoading] = useLoading();
    const [data, setData] = useState({
        current: "",
        new:    "",
        confirm:  ""
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
       console.log(data)
        if (data.new !== data.confirm) {
            showAlertError("New password and confirm password do not match");
            return;
        }

     
        try {
            setLoading(true);
            const response = await changePassword(data);
            showAlertSuccess(response.message);         
            closeModal();       
        } catch (error) {
            showAlertError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    

        
    } 


    return (
        <div className={modalStyles.modals}
                onClick={ e => {
                    if(e.target.className === modalStyles.modals) closeModal()  
                }}
            >
        { loading ? <Loader/> : (
            <div className='form'>
                                   <div className='form-header'>
                                       <h3>
                                           Change Password
                                       </h3>
                                   </div>
                                   <div className='form-body'>
                                       <form onSubmit={handleSave}>
                                           <div className={formStyles['form-group']}>
                                               <label htmlFor='current'>Current Password</label>
                                               <input 
                                                   onChange={handleChange}
                                                   name='current'
                                                   value={data.name}
                                                  
           
                                               />
                                           </div>
                                           <div className={formStyles['form-group']}>
                                               <label htmlFor='new'>New Password</label>
                                               <input 
                                                   onChange={handleChange}
                                                   type='password'
                                                   value={data.new}
                                                   name='new'     
                                               />
                                           </div>
                                           <div className={formStyles['form-group']}>
                                               <label htmlFor='confirm'>Confirm Password</label>
                                               <input 
                                                   onChange={handleChange}
                                                   type='password'
                                                   value={data.confirm}
                                                   name='confirm'     
                                               />
                                           </div>
                                           <div className={formStyles.button}>
                                                   <button
                                                       className={formStyles.btn}
                                                       type='submit'
                                                   >
                                                       Submit
                                                   </button>
                                                   {/* <button type="button" className={formStyles.btn}  onClick={() => closeModal()}>Cancel</button> */}
                                               </div>
                                       </form>
                                   </div>
                               </div>
        ) }


        </div>
    )
}

export default ChangePasswordModal;