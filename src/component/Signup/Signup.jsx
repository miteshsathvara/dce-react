import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import "../../css/Style.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye from '../../assets/eye.png';
import eye_c from '../../assets/eye_c.png';
import Loader from '../Header/Loader';
const Signup = () => {
    const [examTypes, setExamTypes] = useState([]);
    const [password, setPassword] = useState("");
    const [cpassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eye_c);
    const initialFormState = {
        first_name: '',
        last_name: '',
        middle_name: '',
        mobile_number: '',
        banch_time: '',
        exam_type: ''
    };
    const [formData, setFormData] = useState(initialFormState);
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
    const handleCPasswordToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eye_c)
            setType('password')
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchExamType = async () => {
            try {
                const response = await api.get('/activityType');
                // Api Response set in examtype
                setExamTypes(response.data.data);
                setLoading(false);
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
        setLoading(true);
        formData.password = password;
        if (password !== cpassword) {
            alert('Passwords do not match!');
        }
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
        });
        setLoading(false);
        // You can add your form submission logic here, e.g., sending data to the backend.
    };
    const navigate = useNavigate();
    const registration = async (e) => {
        navigate('/');
    }

    const handleReset = () => {
        
        setFormData(initialFormState);
        setPassword('');
        setConfirmPassword('');
    };
    return (
        
        <div>
            <Loader visible={loading} />
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
                        <div class="registration">
                            <form className="registration-form">
                                <div className="div-lable">
                                    <label htmlFor="firstname">Name</label>
                                    <label htmlFor="middlename">Father Name</label>
                                    <label htmlFor="lastname">Surname</label>
                                    <label htmlFor="mobile">Mobile No.</label>
                                    <label htmlFor="password">Password</label>
                                    <label htmlFor="password">Re-Enter P.W.</label>
                                    <label htmlFor="course">Course</label>
                                    <label htmlFor="batchtime">Batch Time</label>
                                </div>
                                <div className="div-column">
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                    <div>:</div>
                                </div>
                                <div className="div-input">
                                    <input className="input-box" name="first_name" type="text" placeholder="First Name" value={formData.first_name}
                                        onChange={handleChange} required />
                                    <input className="input-box" name="middle_name" type="text" placeholder="Father Name" value={formData.middle_name}
                                        onChange={handleChange}
                                        required />
                                    <input className="input-box" name="last_name" type="text" placeholder="Surname" value={formData.last_name}
                                        onChange={handleChange}
                                        required />
                                    <input className="input-box" type="number" name="mobile_number" placeholder="Mobile" value={formData.mobile_number}
                                        onChange={handleChange}
                                        required />
                                    <div className="password-container">
                                        <input className="input-box" name="password" type={type} placeholder="Create Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required />
                                        <img
                                            alt="eye-icon"
                                            src={icon}
                                            onClick={handleToggle}
                                        // src={values.showPassword ? eye : eye_c}
                                        />
                                    </div>
                                    <div className="password-container">
                                        <input className="input-box" type={type} placeholder="Re-Enter Password" value={cpassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                        <img
                                            alt="eye-icon"
                                            src={icon}
                                            onClick={handleCPasswordToggle}
                                        />
                                    </div>
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
                            </form>
                            <div className="button">
                                <button type="button" onClick={(e) => handleSubmit(e)}>CREATE</button>
                                <button type="button" onClick={(e) => handleReset(e)}>RESET</button>
                            </div>
                        </div>
                        {/* <button type="submit">Submit</button> */}
                        {/* <button style={{ 'margin-top': '5px', backgroundColor: 'rgb(0, 132, 255)' }} onClick={(e) => registration(e)}>
                            Login
                        </button> */}
                    </div>
                </div>
            </main >
        </div >
    );
}
export default Signup;