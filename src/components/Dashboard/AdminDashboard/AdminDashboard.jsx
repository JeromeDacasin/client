import { useEffect, useState } from 'react';
import './../Dashboard.css';
import { dashboardReport } from '../../../api/dashboardApi';
import { showAlertError } from '../../../utils/toastify';
import Loader from '../../Loader/Loader';

const AdminDashboard = () => {

    const [data, setData] = useState([]);
    const labelColor = {
        pending: 'orange',
        approve: 'green',
        returned: 'blue',
        due_today: 'red',
        due_this_month: 'red'
    }

    const getColorByLabel = label => {
        const normalized = label.toLowerCase();

          const matched = Object.keys(labelColor).find(key => normalized.includes(key));

        return matched ? labelColor[matched] : 'grey';
    }

    const handleCardClick = () => {
        console.log('dsadsa');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardReport();
                
                const transform = Object.entries(response).map(([key, value]) => ({
                    title: key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()).replace('Today', "Today's"),
                    data: Object.entries(value).map(([label, count]) => ({
                        label: label.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                        count,
                        color: getColorByLabel(label)
                    }))
                }));
                
                setData(transform);
            } catch(error) {
                showAlertError('cannot process data right now' + error)
            }
        }
        fetchData();
    }, [])
  

    return (
        <div className="dashboard">
            {data.length === 0 ? (
                <Loader />
            ) : (
                data.map((section, id) => (
                <div key={id} className='report-section'>
                    <h2 className='report-title'>{section.title}</h2>
                    <div className="report-cards">
                    {section.data.map((item, i) => (
                        <div 
                        key={i} 
                        className={`report-card ${item.color}`}
                        onClick={() => handleCardClick(section.title, item)} // Add click handler
                        style={{ cursor: 'pointer' }} // Visual feedback
                        >
                        <div className="report-count">{item.count}</div>
                        <div className="report-label">{item.label}</div>
                        </div>
                    ))}
                    </div>
                </div>
                ))
            )}
        </div>
    )
       
};

export default AdminDashboard;
