import React from "react";

const Login = () => {
    return (
        <div>
            <div class="blue">
                Login to Start Examination
            </div>
            <main>
                <div className="login-tile-container">
                    <div className="login-logo">
                        <img
                            alt="Logo"
                            src="../assets/logo.png"
                        />
                    </div>
                    <div className="login-container">
                        <div className="login-human">
                            <img
                                alt=""
                                src="../assets/login.png"
                            />
                        </div>
                        <form action="#">
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
                                    type="password"
                                />
                                <img
                                    alt="eye-icon"
                                    src="../assets/eye.png"
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