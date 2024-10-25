import style from './../styles/home.module.css';
import logo from './../assets/logo.png';

const Home = () => {
    return (
        <div >
            <div id={style.container}>
                <div>
                    navbar
                </div>
                <div className={style.card}>
                    <img src={logo} alt="logo" />
                    <h2>ADMIN PORTAL</h2>
                    <h3>ONLINE PUBLIC ACCESS CATALOG</h3>
                </div>
                </div>
        </div>
    )
}


export default Home;