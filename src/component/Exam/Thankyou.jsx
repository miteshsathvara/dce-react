import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Style.css";
import NavBar from "../Header/Navbar";

const Thankyou = () => {
    return (
        <div>
            <main className='thankyou'>
                <NavBar />
                <div className="table-container">
                    <h1>Thank You.</h1>
                </div>
            </main>
        </div>
    );
};
export default Thankyou;