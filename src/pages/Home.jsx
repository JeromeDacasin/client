import style from './../styles/home.module.css';
import logo from './../assets/logo.png';
import { useAuth } from '../context/AuthContext.jsx';



const Home = () => {
    const { user } = useAuth()
    return (
        <div >
            <div id={style.container}>
                <div className={style.card}>
                    <img src={logo} alt="logo" />
                    <h2>{user?.user} Portal</h2>
                    <h3>ONLINE PUBLIC ACCESS CATALOG</h3>
                </div>
                </div>
        </div>
    )
}


export default Home;