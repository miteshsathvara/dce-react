import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import Header from "./component/Header/Header";
import Login from './component/Login/Login';
import Footer from './component/Footer/Footer';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
      <Header /> 
      <Login/>
      <Footer/>
      </div>
      </BrowserRouter>
     
    
   );
}
export default App;
