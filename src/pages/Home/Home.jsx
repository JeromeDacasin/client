import './Home.css';
import solution from './../../assets/solution.png';
import globalWarming from './../../assets/global-warming.png';
import borrowingPolicy from './../../assets/borrowing-policy.png';
import policy from './../../assets/policy.png';

import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    const openImage = (src) => {
        window.open(src, '_blank');
    };

    return (
        <div className='home'>
            { !(user.user === 'Librarian' || user.user === 'Admin') ? (
                <>
                <h1 className="welcome-message">Welcome to the Sta. Catalina Library !</h1>
                    <div className="health-advisory-container">
                        <h2 className="health-advisory-title">Health Advisory</h2>
                        <div className="advisory">
                            <div className="advisory-content">
                                <img src={globalWarming} alt="Global Warming" onClick={() => openImage(globalWarming)} />
                                <img src={solution} alt="Solutions" onClick={() => openImage(solution)} />
                            </div>
                        </div>
                    </div>

                    <div className="health-advisory-container">
                        <h2 className="health-advisory-title">Library Policy</h2>
                        <div className="advisory">
                            <div className="advisory-content">
                                <img src={borrowingPolicy} alt="Climate Change" onClick={() => openImage(borrowingPolicy)} />
                                <img src={policy} alt="Eco-Friendly Living" onClick={() => openImage(policy)} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="module-container">
                    <div className="module-cards">
                    <div className="card" onClick={() => handleCardClick('/requests')}>
                        <h3>Requests</h3>
                    </div>
                    <div className="card" onClick={() => handleCardClick('/pendings')}>
                        <h3>Pending</h3>
                    </div>
                    <div className="card" onClick={() => handleCardClick('/histories')}>
                        <h3>History</h3>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
