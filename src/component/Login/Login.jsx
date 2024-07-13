import React from "react";
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import eye from '../../assets/eye.png';
import eye_c from '../../assets/eye_c.png';
const Login = () => {
    // Default value set
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
    });
    // On Eye icon Click to set value
    const handleClickShowPassword = () => {
        setValues({
            values,
            showPassword: !values.showPassword,
        });
    };
    // On click value change of password
    const handlePasswordChange = (prop) => (event) => {
        setValues({
            values,
            [prop]: event.target.value,
        })
    }

    return (
        <div>
            <div class="blue">
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
                                placeholder="User Name"
                                type="text"
                            />
                            <label htmlFor="password">
                                PASSWORD
                            </label>
                            <div className="password-container">
                                <input
                                    className="input-box"
                                    placeholder="Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    onChange={handlePasswordChange('password')}
                                    value={values.password}
                                />
                                <img
                                    alt="eye-icon"
                                    src={values.showPassword ? eye : eye_c}
                                    onClick={handleClickShowPassword}
                                />
                            </div>
                            <br />
                            <div className="button">
                                <button>
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