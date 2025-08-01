import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Myapp.css'
import '../App.css'
import { Link } from 'react-router-dom'
import Loader from './Spinner'

const Login = (props) => {
    const host = process.env.REACT_APP_HOST;
    const navigate = useNavigate();
    const [loader, setloader] = useState(false)
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        setloader(true)
        props.setProgress(10)
        
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        props.setProgress(30)
        const json = await response.json()
        props.setProgress(100)
        setloader(false)
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showalert("Logged in successfully", "Success")
        } else {
            props.showalert("Invalid credentials", "Danger")
        }
    }

    return (
        <div>
            {loader && <Loader />}
            <div className="account-pages height-100vh">
                <div className="home-center">
                    <div className="home-desc-center">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-6 col-xl-5">
                                    <div className="text-center">
                                        <a href="index.html" className="text-uppercase">
                                            <span>iNotebook</span>
                                        </a>
                                        <p className="text-white mt-2 mb-4">iNotebook - Your notes secured in the cloud</p>
                                    </div>
                                    <div className="mod-card">
                                        <div className="card-body p-4">
                                            <div className="text-center mb-4">
                                                <h4 className="text-uppercase mt-0">Sign In</h4>
                                            </div>

                                            <form action="#" onSubmit={handlesubmit} className="login-form">
                                                <div className="form-group form-focus mb-4">
                                                    <label htmlFor="email" className='text-light'>Email address</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}  required placeholder="Enter your email" />
                                                    <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                                                </div>

                                                <div className="form-group mb-4">
                                                    <label htmlFor="password" className='text-light'>Password</label>
                                                    <input className="form-control" type="password" name="password" value={credentials.password} onChange={onChange} required id="password" placeholder="Enter your password" />
                                                </div>

                                                <div className="form-group mb-4">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="checkbox-signin" />
                                                        <label className="custom-control-label text-light" htmlFor="checkbox-signin">Remember me</label>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-0 text-center">
                                                    <button className="mod-btn" type="submit"> Log In </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 text-center link-resize">
                                            <p> <a href="/" className="text-white"><i className="fa fa-lock m-2"></i>Forgot your password?</a></p>
                                            <p className="text-white">Don't have an account? <Link to="/signup" className="text-white m-1"><b>Sign Up</b></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
