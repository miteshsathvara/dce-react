import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Style.css";

const Thankyou = () => {
    const navigate = useNavigate();
    const logout = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('selectedAnswer-')) {

                localStorage.removeItem(key);
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('type_id');
        toast.success("Logout Successfully.", {
            autoClose: 1500,
        });
        navigate('/');
    }
    return (
        <div>
            <main className='thankyou'>
                <div className="table-container">
                    <h1>Thank You.</h1>
                </div>
                <div className="button" >
                    <button style={{'margin': '0 auto','display': 'block'}} onClick={(e) => logout(e)}>LOG OUT</button>
                </div>
            </main>
        </div>
    );
};
export default Thankyou;