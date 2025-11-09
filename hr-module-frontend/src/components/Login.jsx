import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true;

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password_hash: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/auth/login', values, {
                headers: { 'Content-Type': 'application/json' }
            });

            const { accessToken } = response.data;

            if (accessToken) {
                localStorage.setItem('token', accessToken);
                navigate('/dashboard');
            } else {
                setError('Login failed. No token received.');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid username or password.');
        }
    };

    return (
    <div className='loginPage d-flex justify-content-center align-items-center vh-100'>
        <div className='loginCard p-4 rounded'>
            <h2 className='text-center mb-2 fw-bold'>Welcome Back</h2>
            <p className="text-center text-light mb-4 small">Log in to continue</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>Username:</label>
                    <input type='text' name='username' autoComplete='off' placeholder='Enter username' 
                    value={values.username}
                    onChange={(e) => setValues({...values, username: e.target.value})} 
                    className='form-control'
                    required/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password_hash' className='form-label'>Password:</label>
                    <input type='password' name='password_hash' autoComplete='off' placeholder='Enter password' 
                    value={values.password_hash}
                    onChange={(e) => setValues({...values, password_hash: e.target.value})} 
                    className='form-control'
                    required/>
                </div>

                {error && <p className='error-text'>{error}</p>}

                <button type='submit' className='btn btn-success w-100 mt-2'>
                    Login
                </button>
            </form>
        </div>
    </div>
    )
}

export default Login