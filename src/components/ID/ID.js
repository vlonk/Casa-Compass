import './ID.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ID() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setInputText(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (inputText.trim() === '') {
      // Input is invalid; you can show an error message or handle it as needed
      alert('Invalid input. Please enter your ID.');
    } else {
      console.log('Submitted: ' + inputText);

      try {
        // Send a POST request to the checkID route
        const response = await axios.post('http://127.0.0.1:5000/checkID', { id: inputText });

        // no error means it's ready to send back to the API to calculate approval
        console.log('User: ', response.data);
        
        var approval_response = await axios.post('http://127.0.0.1:5000/evaluate', { user: response.data });
        approval_response = approval_response["data"];
        console.log(approval_response);

        if (approval_response["Result"] === "Approved") {
        // Navigate to the approved page
          navigate('/Approved');
        } else {
          // Navigate to the denied page
          navigate('/NotApproved', { state: { suggestions: approval_response["Suggestions"] } });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            // no user with ID found, go through the questionnaire
            // start building user object to pass to the api at the end
            navigate('/Questionnaire', { state: { user: { '_id': inputText } } });
          } else {
            // unknown error
            console.log('Error: ' + error.response.status);
          }
        } else {
          // pre-flight error???
          console.error('Error: ', error.message);
        }
      }
    }
  };

  return (
  <div className='IDContainer'>  
    <div className='prompt-container-ID'>
      <div className='promptID'>
        <div className='IDQuestion'>
          Please enter your ID
        </div>
        <input
          type="text"
          placeholder="Enter your ID"
          value={inputText}
          onChange={handleInputChange}
        />
        <button className='button' onClick={handleSubmit} disabled={!inputText}>Submit</button>
      </div>
    </div>
  </div>
  );
}

export default ID;