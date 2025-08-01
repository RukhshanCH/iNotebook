import './Myapp.css'
import '../App.css'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from './Spinner'

const Signup = (props) => {
    const host = process.env.REACT_APP_HOST
    const navigate = useNavigate()
        const [loader, setloader] = useState(false)
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        setloader(true)
        props.setProgress(10)
        
        const {name, email, password} = credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        props.setProgress(30)
        const json = await response.json()
        props.setProgress(100)
        setloader(false)
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showalert("Account created successfully", "Success")
        } else {
            props.showalert("Invalid details", "Danger")
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
                                                <h4 className="text-uppercase mt-0">Register</h4>
                                            </div>

                                            <form action="#" onSubmit={handlesubmit} className="login-form">
                                                <div className="form-group form-focus mb-4">
                                                     <label htmlFor="name" className='text-light'>Name</label>
                                                     <input type="text" className="form-control" placeholder='Enter your name' required id="name" name="name" value={credentials.name} onChange={onChange} />
                                                </div>
                                                <div className="form-group form-focus mb-4">
                                                    <label htmlFor="email" className='text-light'>Email address</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}  required placeholder="Enter your email" />
                                                    <div id="emailHelp" className="form-text mt-2 text-light">We'll never share your email with anyone else.</div>
                                                </div>

                                                <div className="form-group mb-4">
                                                    <label htmlFor="password" className='text-light'>Password</label>
                                                    <input className="form-control" type="password" name="password" value={credentials.password} onChange={onChange} required minLength={5} id="password" placeholder="Enter your password" />
                                                </div>

                                                <div className="form-group mb-4">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="checkbox-signin" />
                                                        <label className="custom-control-label text-light" htmlFor="checkbox-signin">I accept Terms and Conditions</label>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-0 text-center">
                                                    <button className="mod-btn" type="submit"> Sign up </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 text-center link-resize">
                                            <p className="text-white">Already have an account? <Link to="/login" className="text-white m-1"><b>Sign in</b></Link></p>
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

export default Signup
