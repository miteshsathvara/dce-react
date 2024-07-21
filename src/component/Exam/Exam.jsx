import React, { useEffect, useState } from 'react';
import HumanStart from '../../assets/human-start.png';
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import ConfirmDialog from './ConfirmDialog';


const Exam = () => {

  // Start Header code
  // Use for navigation
  const navigate = useNavigate();
  // Logout Function
  const logout = (e) => {
    e.preventDefault();
    // Clear all localstorage
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
    // redirect to home page
    navigate('/');
  };
   // Get Username on blue header part
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
   // get current date
   const getCurrentDate = () => {
     const today = new Date();
     const dd = String(today.getDate()).padStart(2, '0');
     const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
     const yyyy = today.getFullYear();
 
     return `${dd}/${mm}/${yyyy}`;
   };
   const currentDate = getCurrentDate();
 
  // End Header Code
  // Start Question Logic
  // get Type id from localstorage
  const type_id = localStorage.getItem('type_id');
  // questionData used for all question get from apis
  const [questionData, setquestionData] = useState([]);
  // currentQuestionIndex used for next and back button
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // once user select answer thenset in this state and pass to API
  const [answers, setAnswers] = useState({});
  // Once final question submit display dialog box
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/get_questions/' + type_id);
        const initialAnswers = {};
        response.data.data.forEach((question, index) => {
          // all question selectedAnswer set in localstorage
          const savedAnswer = localStorage.getItem(`selectedAnswer-${question.order_no}`);
          const answer = savedAnswer ? savedAnswer : question.attempted_answer;
          initialAnswers[question.order_no] = answer;
          localStorage.setItem(`selectedAnswer-${question.order_no}`, answer);
          // for shuffled question set index for each question
          question.index = index + 1; 
        });
        // Api Response set in answers state
        setAnswers(initialAnswers);
        // Api Response set in questionData state
        setquestionData(response.data.data);
      } catch (error) {
        // Handle error or redirect to login
      }
    };

    fetchQuestions();
  }, []);
  // Handle Next Question Logic 
  const handleNextQuestion = async (e) => {
    e.preventDefault();
    // get answer from localstorage
    const answer = localStorage.getItem(`selectedAnswer-${currentQuestion?.order_no}`);

    if (currentQuestion.order_no === questionData[questionData.length - 1]?.order_no) {
      // Last Question display show dialog box
      setShowConfirmDialog(true);
    } else {
      // attempt logic
      let question_id = currentQuestion?.id;
      await api.post('/attemptquiz/' + type_id, {
        answer,
        question_id
      }).then((result) => {
        if (result.data.status === "Success") {
          toast.success(result.data.data, {
            autoClose: 2000,
          });
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }).catch((error) => {
        if (error.response.data.status === "Failed") {
          toast.error(error.response.data.message, {
            autoClose: 2000,
          });
        }
      });
    }
  };
  // on dialog confirm action
  const handleConfirm = () => {
    setShowConfirmDialog(false);
    navigate('/thankyou');
  };
  // on dialog cancel action
  const handleCancel = () => {
    toast.info('You are still on the current question.');
    setShowConfirmDialog(false);
  };
  // On change radio button set answer in localstorage
  const handleOptionChange = (order_no, option) => {
    const newAnswers = { ...answers, [order_no]: option };
    setAnswers(newAnswers);
    localStorage.setItem(`selectedAnswer-${order_no}`, option);
  };
  // On click on back question logic
  const handleBackQuestion = (e) => {
    e.preventDefault();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert('No Any Questions.');
    }
  };
  // Click on particular question redirection
  const handleRedirectQuestion = (q) => {
    setCurrentQuestionIndex(q.index - 1);
  }
  // set current question from all question data
  const currentQuestion = questionData[currentQuestionIndex];

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
      </main>
      <div className="container">
        <div className="question-container">
          <form action="#">
            <p><span>{currentQuestion?.index}.</span>{currentQuestion?.question}</p>
            {currentQuestion?.answer?.map(option => (
              <div key={option.options}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.order_no}`}
                    value={option?.options}
                    checked={answers[currentQuestion.order_no] === option.options}
                    onChange={() => handleOptionChange(currentQuestion.order_no, option.options)}
                  />
                  {option?.options}
                </label>
              </div>
            ))}
            <div className="question-button">
              <button onClick={(e) => handleBackQuestion(e)} >Back</button>
              <button onClick={(e) => handleNextQuestion(e)} style={{ backgroundColor: "rgb(0, 132, 255)" }}>
                SUBMIT &amp; NEXT
              </button>
            </div>
            <ConfirmDialog
              isVisible={showConfirmDialog}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </form>
        </div>
        <div className="right-panel">
          <div className="question-layout">
            <div className="title">Question-Layout</div>
            <div className="questions">
              {questionData.map((q, index) => {
                let style = {};
                if (index === currentQuestion?.index - 1) {
                  style = { backgroundColor: "orangered", color: "white" };
                } else if (q.attempted) {
                  style = { backgroundColor: 'rgb(0, 132, 255)', color: 'white' };
                }
                return (
                  <div key={q.id} style={style} onClick={() => handleRedirectQuestion(q)}>
                    {index + 1}
                  </div>
                );
              })}
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
    </div>
  );
};
export default Exam;
