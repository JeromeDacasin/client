import { useState } from 'react';
import style from './../styles/login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const  submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {username, password});

            if (response.data.status !== 200) {
                return
            }

            navigate('/home');

        } catch (error) {
            setErr(error.response.data.message);
        }

    }

    return (
        <div id={style.container}>
            
            <div className={`${style['form-wrap']}`} onSubmit={submit}>
            <h1>ADMIN LOGIN</h1>
            { err }
            <form>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Please Input Your Username' required
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="Password" placeholder='Please Input Your Password' required
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