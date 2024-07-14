import React, { useEffect, useState } from 'react';
import HumanStart from '../../assets/human-start.png';
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';


const Exam = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
  }
  const type_id = localStorage.getItem('type_id');

  const [questionData, setquestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/get_questions/' + type_id);
        console.log('response', response);
        setquestionData(response.data.data);
      } catch (error) {
        // Handle error or redirect to login
      }
    };

    fetchQuestions();
  }, []);


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

  const startExam = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    navigate('/');
  }
  //console.log("65", questionData);
  const handleNextQuestion = () => {
    //console.log('currentQuestionIndex', currentQuestionIndex);
    //console.log('length', questionData.length - 1);
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('You have reached the end of the quiz.');
      // Optionally, handle end of quiz (e.g., show results)
    }
  };
  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert('No Any Questions.');
      // Optionally, handle end of quiz (e.g., show results)
    }
  };

  const handleRedirectQuestion = (q) => {
    setCurrentQuestionIndex(q.order_no - 1);
  }

  const currentQuestion = questionData[currentQuestionIndex];

  return (
    <div>
      {/*  Start Main Contents */}
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
      </main>
      <div className="container">
        <div className="question-container">
          <form action="#">
            <p><span>{currentQuestion?.order_no} .</span>{currentQuestion?.question}</p>
            {currentQuestion?.answer?.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    // name={`question-${currentQuestion.i}`}
                    value={option?.options}
                  // checked={selectedAnswers[currentQuestion.id] === option.id}
                  // onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                  />
                  {option?.options}
                </label>
              </div>
            ))}
            <div className="question-button">
              <button onClick={handleBackQuestion} >Back</button>

              <button onClick={handleNextQuestion} style={{ backgroundColor: "rgb(0, 132, 255)" }}>
                SUBMIT &amp; NEXT
              </button>

            </div>
          </form>
        </div>
        <div className="right-panel">
          <div className="question-layout">
            <div className="title">Question-Layout</div>
            <div className="questions">
              {questionData?.map(q => (
                q.order_no === currentQuestion?.order_no ?
                  <div style={{ 'background-color': 'orangered', color: 'white' }} onClick={() => handleRedirectQuestion(q)}>
                    {q.order_no}
                  </div>
                  : <div onClick={() => handleRedirectQuestion(q)}>
                    {q.order_no}
                  </div>
              ))}
            </div>
          </div>
          <div className="summery">
            <div className="indication">
              <div style={{ backgroundColor: "orangered", color: "white" }}></div><p>Current Question</p>
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }} />
              <p>Attempted</p>
              <div />
              <p>Not Attempted</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Main Contents */}
    </div>
  );
};
export default Exam;