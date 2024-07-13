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
  console.log('here');
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/getUserExamDetail');
        console.log('response', response);
        setApiData(response.data.data);
      } catch (error) {
        // Handle error or redirect to login
      }
    };

    fetchProfile();
  }, []);
  console.log('apidata', apiData);
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
            <p>
              <span>•</span>What is Microsoft Excel Extension ?
            </p>
            <input type="radio" id=".docx" name="Extension" defaultValue=".docx" />
            <label htmlFor=".docx">.docx</label>
            <br />
            <input type="radio" id=".xlsx" name="Extension" defaultValue=".xlsx" />
            <label htmlFor=".xlsx">.xlsx</label>
            <br />
            <input type="radio" id=".pptx" name="Extension" defaultValue=".pptx" />
            <label htmlFor=".pptx">.pptx</label>
            <br />
            <input type="radio" id=".pdf" name="Extension" defaultValue=".pdf" />
            <label htmlFor=".pdf">.pdf</label>
            <div className="question-button">
              <button style={{ backgroundColor: "rgb(0, 132, 255)" }}>
                SUBMIT &amp; NEXT
              </button>
              <button>SKIP FOR REVIEW</button>
            </div>
          </form>
        </div>
        <div className="right-panel">
          <div className="question-layout">
            <div className="title">Question-Layout</div>
            <div className="questions">
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }}>
                1
              </div>
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }}>
                2
              </div>
              <div style={{ backgroundColor: "orangered", color: "white" }}>3</div>
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }}>
                4
              </div>
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }}>
                5
              </div>
              <div style={{ backgroundColor: "orangered", color: "white" }}>6</div>
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }}>
                7
              </div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <div>15</div>
              <div>16</div>
              <div>17</div>
              <div>18</div>
              <div>19</div>
              <div>20</div>
              <div>21</div>
              <div>22</div>
              <div>23</div>
              <div>24</div>
              <div>25</div>
              <div>26</div>
              <div>27</div>
              <div>28</div>
              <div>29</div>
              <div>30</div>
              <div>31</div>
              <div>32</div>
              <div>33</div>
              <div>34</div>
              <div>35</div>
              <div>36</div>
              <div>37</div>
              <div>38</div>
              <div>39</div>
              <div>40</div>
              <div>41</div>
              <div>42</div>
              <div>43</div>
              <div>44</div>
              <div>45</div>
              <div>46</div>
              <div>47</div>
              <div>48</div>
              <div>49</div>
              <div>50</div>
            </div>
          </div>
          <div className="summery">
            <div className="indication">
              <div style={{ backgroundColor: "rgb(0, 132, 255)", color: "white" }} />
              <p>Attempted</p>
              <div style={{ backgroundColor: "orangered", color: "white" }} />
              <p>Skipped</p>
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