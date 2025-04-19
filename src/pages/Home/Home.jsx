import './Home.css';
import { useAuth } from '../../context/AuthContext.jsx';
import AdminDashboard from './../../components/Dashboard/AdminDashboard/AdminDashboard.jsx';
import ClientDashboard from '../../components/Dashboard/ClientDashboard/ClientDashboard.jsx';

const Home = () => {
    const { user } = useAuth();

    const isAdmin = user.user === 'Librarian' || user.user === 'Admin';

    return (
        <div className="home">
            {isAdmin ? <AdminDashboard /> : <ClientDashboard/>}
        </div>
    );
};

export default Home;
