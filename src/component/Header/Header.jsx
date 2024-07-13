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
        </div>
    );
}
export default Header;