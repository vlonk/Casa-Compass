import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ID from './components/ID/ID';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Income from './components/Questionnaire/Income/Income';
import Debts from './components/Questionnaire/Debts/Debts';
import Home from './components/Questionnaire/Home/Home';
// import House from './components/House/House';
import Approved from './components/Questionnaire/Approved/Approved';
import NotApproved from './components/Questionnaire/NotApproved/NotApproved';

function App() {
  return (
    <div className='content'>
      <div className='header'>
          <h1>CasaCompass</h1>
        <div className='line-container'>
          <div className='line'></div>
        </div>
      {/* the router loads everything */}
      <div className="App">
    <Router> 
        <Routes>
          <Route path="/" element={<ID />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/Debts" element={<Debts />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Approved" element={<Approved />} />
          <Route path="/NotApproved" element={<NotApproved />} />
        </Routes>
    </Router>
        {/* <House/> */}
        </div>
      </div>
    </div>
  );
}

export default App;