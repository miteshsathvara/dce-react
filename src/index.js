import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './component/Login/Login';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./component/Dashboard/Dashboard";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Exam from "./component/Exam/Exam";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   //<Provider>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/exam' element={<Exam/>}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  //  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
