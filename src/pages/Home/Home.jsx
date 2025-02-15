import './Home.css';
import logo from './../../assets/logo.png';
import { useAuth } from '../../context/AuthContext.jsx';



const Home = () => {
    const { user } = useAuth()
    return (
        <div >
            <div className='home'>
                <div className='card-home'>
                    <img src={logo} alt="logo" />
                    <h2>Welcome {user?.fullname} !</h2>
                    <h3>{user?.user} ACCESS CATALOG</h3>
                </div>
                </div>
        </div>
    )
}


export default Home;