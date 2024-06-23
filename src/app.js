import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./component/Header/Header";
import Login from './component/Login/Login';

function App() {
  return (
    <Router> 
     <div className="App">
      <Header /> 
      <Login/>
     </div>
    </Router>
   );
}
export default App;
