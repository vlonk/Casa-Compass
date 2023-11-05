// src/CreditScoreInput.js
import React, { useState } from 'react';
import './creditScore.css';

function CreditScoreInput() {
  const [creditScore, setCreditScore] = useState('');

  const handleInputChange = (e) => {
    setCreditScore(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Submit Your Credit Score</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Credit Score:
          <input
            type="number"
            value={creditScore}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreditScoreInput;
