import style from './../styles/landing.module.css';
import logo from './../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFacebookSquare, faGoogle, faTwitter, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';


const Landing = () => {
    return (
        <div>
            <div className={style.container}>
                <div>
                    <img src={logo} alt="logo" className={logo}/>
                    <h1>Sta. Catalina College</h1>
                    <h2>Library Management System</h2>
                </div>
                <div className={style.navigation}>
                    <Link className={style.btn} to="/Login">Admin</Link>
                    <Link className={style.btn} to="/Login">Faculty</Link>
                    <Link className={style.btn} to="/Login">Student</Link>
                    <Link className={style.btn} to="/Login">Librarian</Link>
                </div>
            <div className={style.contact}>
                <h3 className={style.paragraph}>Visit our Social Media Account!</h3>
                <div className={style.footer}>
                    <a className={style.facebook} href="https://www.facebook.com/sccmanila"> <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon></a>
                    <a className={style.google}href="https://en.wikipedia.org/wiki/Santa_Catalina_College"><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></a>
                    <a className={style.instagram}href="https://en.wikipedia.org/wiki/Santa_Catalina_College"><FontAwesomeIcon icon={faInstagramSquare}></FontAwesomeIcon></a>
                    <a className={style.twitter}href="https://en.wikipedia.org/wiki/Santa_Catalina_College">  <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
                </div>
                <h5 className={style.paragraph}>Capstone Project, Research and Thesis Writing</h5>
            </div>
            </div>
        </div>
      
    )
}

export default Landing;