import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import modalStyles from './../../../../styles/Modals/modals.module.css';
import formStyles from './../../../../styles/Forms/form.module.css';
import Loader from '../../../Loader/Loader';
import { showAlertSuccess } from './../../../../utils/toastify';
import { useLoading } from '../../../../hooks/useLoading';
import { createHoliday, fetchHoliday, updateHoliday } from '../../../../api/holidayApi';

const HolidayForm = ({ closeModal, action, id, onUpdate }) => {

    const [loading, setLoading] = useLoading();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        name: "",
        date: new Date(),
    });

    useEffect(() => {

        const handleFetchPublisher = async id => {
            try {
                setLoading(true);
                const response = await fetchHoliday(id);
                setData(response.data);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        } 

        if (id) { 
            handleFetchPublisher(id);
        }


    }, [setLoading, id]);
    

    const handleSave = async e => {
        e.preventDefault();
       
        const apiCall = action === 'Edit' ? updateHoliday : createHoliday;
        try {
            setLoading(true);
            const formattedDate = {
                ...data,
                date: data.date ? data.date.toISOString().slice(0, 10) : "",
            };
            const response = await apiCall(formattedDate);
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

    const handleDateChange = (date) => {
        setData((prevData) => ({
          ...prevData,
          date: date,
        }));
      };

    useEffect(() => {
        action === 'Show' ? setEdit(true) : setEdit(false)
    }, [action]);

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
                            {action} Holiday Information
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
                            <div className={formStyles["form-group"]}>
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                selected={data.date}
                                onChange={handleDateChange}
                                name="date"
                                className={formStyles["custom-datepicker"]}
                                dateFormat="yyyy-MM-dd"
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

export default HolidayForm;