import { useState } from 'react';
import style from './../styles/login.module.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { showAlertError } from '../utils/toastify';
const Login = () => {

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const payload = {
        username,
        password
    }
    
    const handleLogin = async e => {
        e.preventDefault()
        const response = await login(payload);
        
        if (response.status !== 200) {
            showAlertError(response.data.message)
            return
        }
        navigate('/home')
    }
   

    return (
        <div id={style.container}>
            
            <div className={`${style['form-wrap']}`}>
            <h1>ADMIN LOGIN</h1>
            
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Please Input Your Username' required
                        id='username'
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Please Input Your Password' required
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={style.btn}>Submit</button>
            </form>
        
            <div className={`${style['button-text']}`}>
                <a href="">Forgot Password</a>
                <a href="">New to this website? Sign Up</a>
            </div>

            </div>
            
        </div>
    )
}

export default Login