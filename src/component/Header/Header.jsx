import React from "react";
import "../../css/Style.css";
import HeaderLogo from '../../assets/r_logo.png';
const Header = () => {
    return (
        <div>
            <header className="header">
  <div className="orange">
    <div className="round-logo-container">
    <img
                            alt="rounded-logo"
                            className="round-logo"
                            src={HeaderLogo}
                        />
    </div>
    <div className="heading-text">
      <h1>Dynamic Computer Education</h1>
      <h3>On-line Examination System</h3>
    </div>
  </div>
</header>

            {/* <main>
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
            </main> */}
        </div>
    );
}
export default Header;