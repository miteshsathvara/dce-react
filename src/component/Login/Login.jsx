import React, { useState } from "react";
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import eye from '../../assets/eye.png';
import eye_c from '../../assets/eye_c.png';
import "../../css/Style.css";
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Header/Loader';
const Login = () => {
    //

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eye_c);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // Show/Hide Password Toggle
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eye_c)
            setType('password')
        }
    }
    // Login Submit Event Handle
    const handleSubmit = async (e) => {
        setLoading(true);
        // prevent the form from refreshing the whole page
        e.preventDefault();
        await api.post('/login', {
            username,
            password,
        }).then((result) => {
            console.log(result.data.status);
            if (result.data.status === "Success") {
                localStorage.setItem("token", result.data.token);
                toast.success(result.data.message, {
                    autoClose: 2000,
                });
                navigate('/Dashboard');
            }
        }).catch((error) => {

            if (error.response.data.status === "Failed") {
                toast.error(error.response.data.message, {
                    autoClose: 2000,
                });
            }
            console.log(error);
        });
        setLoading(false);
    }
    const registration = async (e) => {
        navigate('/signup');
    }
    return (
        <div>
            <Loader visible={loading} />
            <div className="blue">
                <div className="login-title">Login to Start Examination</div>
            </div>
            <main>
                <div className="login-tile-container">
                    <div className="login-logo">
                        <img
                            alt="Logo"
                            src={logo}
                        />
                    </div>
                    <div className="login-container">
                        <div className="login-human">
                            <img
                                alt=""
                                src={login}
                            />
                        </div>
                        <form className="login-form" action="#">
                            <label htmlFor="username">
                                USER NAME
                            </label>
                            <input
                                className="input-box"
                                placeholder="Enter UserName"
                                type="text"
                                name="mobile_number"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="password">
                                PASSWORD
                            </label>
                            <div className="password-container">
                                <input
                                    className="input-box"
                                    placeholder="Password"
                                    type={type}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <img
                                    alt="eye-icon"
                                    src={icon}
                                    onClick={handleToggle}
                                // src={values.showPassword ? eye : eye_c}
                                />
                            </div>
                            <br />
                            <div className="button">
                                <button onClick={(e) => handleSubmit(e)}>
                                    SUBMIT
                                </button>
                                
                            </div>
                        </form>
                        <div className="title">
                        <button onClick={(e) => registration(e)}>
                                Signup
                        </button>
                        </div>                     
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Login;