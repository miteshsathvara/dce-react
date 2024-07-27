import React, { useEffect, useState } from 'react';
import "../../css/Style.css";
import HumanStart from '../../assets/human-start.png';
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/getUserExamDetail');

                setApiData(response.data.data);
            } catch (error) {
                // Handle error or redirect to login
            }
        };

        fetchProfile();
    }, []);
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
    const getCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
    
        return `${dd}/${mm}/${yyyy}`;
      };
      const currentDate = getCurrentDate();
    return (
        <div className="blue">
            <div className="human-pic">
                <img src={HumanStart} alt="Human" />
            </div>
            <div className="name-col">NAME: {apiData?.first_name} {apiData?.last_name} </div>
            <div className="date-col">DATE: {currentDate}</div>
            <div className="button">
                <button onClick={(e) => logout(e)}>LOG OUT</button>
            </div>
        </div>
    );
}
export default Navbar;