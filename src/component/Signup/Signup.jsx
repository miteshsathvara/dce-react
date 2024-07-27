import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import "../../css/Style.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
    const [examTypes, setExamTypes] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        mobile_number: '',
        password: '',
        banch_time: '',
        exam_type: ''
    });

    useEffect(() => {
        const fetchExamType = async () => {
            try {
                const response = await api.get('/activityType');
                // Api Response set in examtype
                setExamTypes(response.data.data);

            } catch (error) {
                console.error('Error fetching exam types:', error);
            }
        };

        fetchExamType();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        await api.post('/register', {
            formData
        }).then((result) => {
            console.log(result.data.status);
            if (result.data.status === "Success") {
                toast.success(result.data.message, {
                    autoClose: 2000,
                });
                navigate('/');
            }
        }).catch((error) => {
            if (error.response.data.status === "Failed") {
                toast.error(error.response.data.message, {
                    autoClose: 2000,
                });
            }
            console.log(error);
        })
        console.log('Form submitted:', formData);
        // You can add your form submission logic here, e.g., sending data to the backend.
    };
    const navigate = useNavigate();
    const registration = async (e) => {
        navigate('/');
    }
    return (
        <div>
            <div className="blue">
                <div className="login-title">Registration for Examination</div>
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

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">Middle Name</label>
                                <input
                                    type="text"
                                    id="middle_name"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile_number">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile_number"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="banch_time">Batch Time</label>
                                <select
                                    type="text"
                                    id="banch_time"
                                    name="banch_time"
                                    value={formData.banch_time}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Banch Time</option>
                                    <option value="7 AM - 8 AM">7 AM - 8 AM</option>
                                    <option value="8 AM - 9 AM">8 AM - 9 AM</option>
                                    <option value="9 AM - 10 AM">9 AM - 10 AM</option>
                                    <option value="10 AM - 11 AM">10 AM - 11 AM</option>
                                    <option value="11 AM - 12 PM">11 AM - 12 PM</option>
                                    <option value="12 PM - 1 PM">12 PM - 1 PM</option>
                                    <option value="1 PM - 2 PM">1 PM - 2 PM</option>
                                    <option value="2 PM - 3 PM">2 PM - 3 PM</option>
                                    <option value="3 PM - 4 PM">3 PM - 4 PM</option>
                                    <option value="4 PM - 5 PM">4 PM - 5 PM</option>
                                    <option value="5 PM - 6 PM">5 PM - 6 PM</option>
                                    <option value="6 PM - 7 PM">6 PM - 7 PM</option>
                                    <option value="7 PM - 8 PM">7 PM - 8 PM</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exam_type">Exam Type</label>
                                <select
                                    id="exam_type"
                                    name="exam_type"
                                    value={formData.exam_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Exam Type</option>
                                    {examTypes.map((exam_type) => (
                                        <option key={exam_type.id} value={exam_type.id}>
                                            {exam_type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                        <button style={{ 'margin-top': '5px', backgroundColor: 'rgb(0, 132, 255)' }} onClick={(e) => registration(e)}>
                            Login
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Signup;