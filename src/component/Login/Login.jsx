import React, { useState } from "react";
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import eye from '../../assets/eye.png';
import eye_c from '../../assets/eye_c.png';
import axios from "axios";
import "../../css/Style.css";
import HeaderLogo from '../../assets/r_logo.png';
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
const Login = () => {
    //
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [Islogin, setLogin] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    // Default value set
    // const [values, setValues] = React.useState({
    //     password: "",
    //     showPassword: false
    // });
    // On Eye icon Click to set value
    // const handleClickShowPassword = () => {
    //     setValues({
    //         values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    // // On click value change of password
    // const handlePasswordChange = (prop) => (event) => {
    //     setValues({
    //         values,
    //         [prop]: event.target.value,
    //     })
    // }
    const configuration = {
        method: "post",
        url: "http://localhost:3000/login",
        data: {
            username,
            password,
        },
    };
    // const handleClickShowPassword = () => {
    //     setValues({
    //         values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        const response = await api.post('/login', {
            username,
            password,
        }).then((result) => {

            if (result.data.status === "Success") {
                setLogin(true);
                localStorage.setItem("token", result.data.token);
                navigate('/Dashboard');
            } else {
                setLogin(false);
                alert(result.data.message);
            }

        })
            .catch((error) => { console.log(error); })
    }
    return (
        <div>
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
                                    type="password"
                                    // type={values.showPassword ? 'text' : 'password'}
                                    // onChange={handlePasswordChange('password')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <img
                                    alt="eye-icon"
                                    src={eye_c}
                                // src={values.showPassword ? eye : eye_c}
                                // onClick={handleClickShowPassword}
                                />
                            </div>
                            <br />
                            <div className="button">
                                <button onClick={(e) => handleSubmit(e)}>
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>

    );
}
export default Login;