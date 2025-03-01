import { Link } from 'react-router-dom';
import style from './../styles/notfound.module.css';


const NotFound = () => {
    return (
        <div id={style.container} style={{ textAlign: "center", padding: "50px" }}>
            <h1>🚧 Page Under Construction 🚧</h1>
            <p>Oops! The page you’re looking for is not available or still under development.</p>
            <Link to="/login">
                <button style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "20px"
                }}>
                    Go to Login
                </button>
            </Link>
        </div>
    )
}

export default NotFound