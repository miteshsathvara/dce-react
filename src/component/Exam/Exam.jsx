import React, { useEffect, useState } from 'react';
import HumanStart from '../../assets/human-start.png';
import { useNavigate } from "react-router-dom";
import api from '../Dashboard/api';
import { toast } from "react-toastify";
import ConfirmDialog from './ConfirmDialog';


const Exam = () => {
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
  const type_id = localStorage.getItem('type_id');

  const [questionData, setquestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/get_questions/' + type_id);
        const initialAnswers = {};
        response.data.data.forEach((question) => {
          const savedAnswer = localStorage.getItem(`selectedAnswer-${question.order_no}`);
          const answer = savedAnswer ? savedAnswer : question.attempted_answer;
          initialAnswers[question.order_no] = answer;
          localStorage.setItem(`selectedAnswer-${question.order_no}`, answer);
        });
        
        setAnswers(initialAnswers);
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
        // const initialAnswers = {};
        // response.data.data.forEach((question) => {
        //   const savedAnswer = localStorage.getItem(`selectedAnswer-${question.order_no}`);
        //   const answer = savedAnswer ? savedAnswer : question.attempted_answer;
        //   initialAnswers[question.order_no] = answer;
        //   localStorage.setItem(`selectedAnswer-${question.order_no}`, answer);
        // });
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
  
  const handleNextQuestion = async (e) => {

    e.preventDefault();
    const answer = localStorage.getItem(`selectedAnswer-${currentQuestion?.order_no}`);

    if (currentQuestion.order_no == questionData[questionData.length - 1]?.order_no) {
      setShowConfirmDialog(true);
    } else {
      let question_id = currentQuestion?.id;
      // Attempt Api call
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
  const handleConfirm = () => {
    setShowConfirmDialog(false);
    navigate('/thankyou');
  };

  const handleCancel = () => {
    toast.info('You are still on the current question.');
    setShowConfirmDialog(false);
  };
  const handleOptionChange = (order_no, option) => {
    const newAnswers = { ...answers, [order_no]: option };
    setAnswers(newAnswers);
    localStorage.setItem(`selectedAnswer-${order_no}`, option);
  };
  const handleBackQuestion = (e) => {
    e.preventDefault();
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert('No Any Questions.');
    }
  };

  const handleRedirectQuestion = (q) => {
    setCurrentQuestionIndex(q.order_no - 1);
  }

  const currentQuestion = questionData[currentQuestionIndex];

  // if (questions.length === 0) {
  //   return <div>Loading...</div>;
  // }
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
              <div key={option.options}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.order_no}`}
                    value={option?.options}
                    checked={answers[currentQuestion.order_no] === option.options}
                    // checked={currentQuestion.attempted_answer == option?.options}
                    onChange={() => handleOptionChange(currentQuestion.order_no, option.options)}
                  // onChange={handleOptionChange}

                  />
                  {option?.options}
                </label>
              </div>
            ))}
            <div className="question-button">
              <button onClick={(e) => handleBackQuestion(e)} >Back</button>
              <button onClick={(e) => handleNextQuestion(e)} style={{ 'background-color': "rgb(0, 132, 255)" }}>
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
              {questionData.map(q => {
                let style = {};
                if (q.order_no === currentQuestion?.order_no) {
                  style = { backgroundColor: "orangered", color: "white" };
                } else if (q.attempted) {
                  style = { backgroundColor: 'rgb(0, 132, 255)', color: 'white' };
                }
                return (
                  <div key={q.id} style={style} onClick={() => handleRedirectQuestion(q)}>
                    {q.order_no}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="summery">
            <div className="indication">
              <div style={{ 'background-color': "orangered", color: "white" }}></div><p>Current Question</p>
              <div style={{ 'background-color': "rgb(0, 132, 255)", color: "white" }} />
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