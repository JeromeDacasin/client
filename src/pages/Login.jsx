import { useState } from 'react';
import style from './../styles/login.module.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { showAlertError } from '../utils/toastify';
import logo from './../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { forgotPassword } from '../api/usersApi.js';
import { useLoading } from '../hooks/useLoading.jsx';
import Loader from '../components/Loader/Loader.jsx';
const Login = () => {

    const { login } = useAuth();
    const [loading, setLoading] = useLoading();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState(false);
    const [success, setSuccess]       = useState(false);
    const [loginDisplay, setLoginDisplay] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
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
            setError(true);
            return
        }
        setError(false);
        navigate('/home')
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordDisplay = () => {
        setLoginDisplay(!loginDisplay);
    }

    const handleForgotPassword = async e => {
        e.preventDefault()
        try {
            setLoading(true);
            const response = await forgotPassword({username})
            setError(false)
            setSuccess(response.message);
        } catch (error) {
            setSuccess(false)

            setError(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
   

    return (
        <div className={style.container}>
            <div className={`${style['logo-section']}`}>
                <div className={style.logo}>
                    <img src={logo} alt=""/>
                    <h2>SCC Library Management</h2>
                </div>
            </div>
            <div className={`${style['form-section']}`}>
                <div className={`${style['logo-inside']}`}>
                    <img src={logo} alt=""/>
                    <h2>SCC Library Management</h2>
                </div>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        loginDisplay ?
                        (
                            <div className={`${style['form-wrap']}`}>
                            <h1>LOGIN</h1>
                            <form onSubmit={handleLogin} autoComplete='off'>
                                <div className={`${style['input-container']}`}>
                                    <input type="text" 
                                        placeholder=" " 
                                        required
                                        id='username'
                                        className={error ? `${style['input-error']}` : ''}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className={`${style['input-container']}`}>
                                    <input 
                                        type={ showPassword ? 'text' : 'password'} 
                                        placeholder=" "  
                                        required
                                        id='password'
                                        className={error ? `${style['input-error']}` : ''}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="">Password</label>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={style.passwordToggle}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {!showPassword ?  <FontAwesomeIcon  icon={faEyeSlash} /> :  <FontAwesomeIcon  icon={faEye} />}
                                    </button>
                                </div>
                                <div>
                                { error && <div className={style.credentials}><p>Invalid Credentials</p></div> }
                                <button type="submit" className={`${style['submit-btn']}`}>Submit</button>
                                </div>
                            </form>
                        
                            <div className={style.links}>
                                <a onClick={handlePasswordDisplay}>Forgot Password</a>
                            </div>
                            </div>
                        ) : (
                            
                            <div className={`${style['form-wrap']}`}>
                                <form onSubmit={handleForgotPassword} autoComplete='off'>
                                    <div className={`${style['input-container']}`}>
                                        <input type="text" 
                                            placeholder=" " 
                                            required
                                            id='username'
                                            className={error ? `${style['input-error']}` : ''}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                        <label htmlFor="">Email or Username</label>
                                    </div>
                                    <div>
                                    { error && <div className={style.credentials}><p>{error}</p></div> }
                                    { success && <div className={style['success-email']}><p>{success}</p></div> }
                                    <button type="submit" className={`${style['submit-btn']}`}>Submit</button>
                                    </div>
                                </form>
                            
                                <div className={style.links}>
                                    <a onClick={handlePasswordDisplay}>Login</a>
                                </div>
                            </div>
                            
                        )
                    )
                }
                
            </div>        
        </div>
    )
}

export default Login