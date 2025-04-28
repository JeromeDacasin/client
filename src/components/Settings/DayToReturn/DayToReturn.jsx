import { useEffect, useState } from "react";
import './DayToReturn.css';
import { fetchReturnDates, updateReturnDate } from "../../../api/mustReturnDateApi";
import { showAlertError, showAlertSuccess } from "../../../utils/toastify";
import { useLoading } from "../../../hooks/useLoading";
import Loader from "../../Loader/Loader";

const DayToReturn = () => {

    const [loading, setLoading] = useLoading();
    const [dates, setDates] = useState({
        id: '',
        days: 0,
    });

    useEffect(() => {
        const getDays = async () => {
            try {
                setLoading(true)
                const response = await fetchReturnDates();

                setDates(response.data[0]);
            } catch (error) {
                showAlertError(error.response)
            } finally {
                setLoading(false)
            }
        };

        getDays();
    }, [setLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await updateReturnDate(dates);
            showAlertSuccess("Days updated successfully!");
        } catch (error) {
            showAlertError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        setDates({ days: parseInt(e.target.value, 10)  || 0, id: 1 });
    };

    
    return (


        <div className="return-days-container">
            {
                loading ? <Loader/> : (
                    <>
                     <h1>Days To Return</h1>
                    <div className="return-days-card">
                        <input
                            type="number"
                            value={dates.days}
                            onChange={handleChange}
                            placeholder="Enter days"
                            max={15}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    </>
                   
                )
            }
        </div>
    );
};

export default DayToReturn;
