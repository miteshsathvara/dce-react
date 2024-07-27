import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./component/Dashboard/Dashboard";
import Thankyou from "./component/Exam/Thankyou";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Exam from "./component/Exam/Exam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   //<Provider>
    <BrowserRouter>
    <ToastContainer theme='dark'/>
    <Header />
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/exam' element={<Exam/>}></Route>
      <Route path='/thankyou' element={<Thankyou/>}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  //  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
