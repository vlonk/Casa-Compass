import './Debts.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Debts() {
  const navigate = useNavigate();

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const handleField1Change = (e) => {
    setField1(e.target.value.replace(/e/g, ''));
  };
  const handleField2Change = (e) => {
    setField2(e.target.value.replace(/e/g, ''));
  };
  const handleField3Change = (e) => {
    setField3(e.target.value.replace(/e/g, ''));
  };
  const handleField4Change = (e) => {
    setField4(e.target.value.replace(/e/g, ''));
  };
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Home');
    // if (field1 && field2 && field3 && field4) {
    //   console.log('Submitted:' + field1 + ' ' + field2 + ' ' + field3 + ' ' + field4 );
    //   setError('');
    //   navigate('/Home');
    // } else {
    //   setError('Please fill out all the fields.');
    // }
  };

  return (
    <div>
      <h1>Debts</h1>
      <form onSubmit={handleSubmit}>
        <div className="boxFormat">
        {/* Text input fields */}
        <input type="number" step="0.01" value={field1} onChange={handleField1Change} placeholder="Monthly Car Payment" />
        <input type="number" step="0.01" value={field2} onChange={handleField2Change} placeholder="Student Loan Payment" />
        <input type="number" step="0.01" value={field3} onChange={handleField3Change} placeholder="Monthly Credit Card Payment" />
        <input type="number" step="0.01" value={field4} onChange={handleField4Change} placeholder="Est. Monthly Mortgage Payment" />

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit button */}
        <button className="debtSubmit" type="submit" disabled={!field1 || !field2 || !field3 || !field4}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Debts;
