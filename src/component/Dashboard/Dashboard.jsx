import React, { useEffect, useState } from 'react';
import HumanStart from '../../assets/human-start.png';
import { useNavigate } from "react-router-dom";
import api from './api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
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
  
  const [apiData, setApiData] = useState([]);
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
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };
  const currentDate = getCurrentDate();

  const startExam = (e, type_id) => {

    localStorage.setItem("type_id", type_id);
    // prevent the form from refreshing the whole page
    e.preventDefault();
    navigate('/exam');
  }
  return (
    <div>
      <main>
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
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>Course Name:</th>
                <td>{apiData?.exam_type}</td>
              </tr>
              <tr>
                <th>Institute Name:</th>
                <td>Dynamic Computer Education</td>
              </tr>
              <tr>
                <th>Exam Center:</th>
                <td>Gozaria</td>
              </tr>
              <tr>
                <th>Batch Time:</th>
                <td>{apiData?.banch_time}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{currentDate}</td>
              </tr>
              <tr>
                <th>Exam Duration:</th>
                <td>1 Hours</td>
              </tr>
            </tbody>
          </table>
          <button onClick={(e) => startExam(e, apiData?.exam_type)}>START EXAM</button>
        </div>
      </main>
      {/* End Main Contents */}
    </div>
  );
};
export default Dashboard;