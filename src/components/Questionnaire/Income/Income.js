import './Income.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Income() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setInputText(e.target.value);
    }
  };
;

  const handleSubmit = () => {
    // You can handle form submission here
    console.log('Submitted income: ' + inputText);

    // Navigate to the questionnaire page
    navigate('/Debts', { state: { income: inputText } });
  };

  return (
    <div className='IncomeContainer'>
      <div className='prompt'>
          <div className='IncomeQuestion'>
            Please input your monthly income.
            (Do not include commas or dollar signs)
          </div>
          <input
            type="text"
            placeholder="Ex: 5000"
            value={inputText}
            onChange={handleInputChange}
            />
          <button className="incomeSubmit" onClick={handleSubmit} disabled={!inputText}>Submit</button>
          {/* <div className='suggestions'>
            {getSuggestions().map((suggestion, index) => (
              <div key={index}>{suggestion}</div>
            ))}
          </div> */}
      </div>
    </div>
  );
        }

export default Income;