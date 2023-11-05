import './Questionnaire.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Questionnaire() {
  const [creditScore, setCreditScore] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  //const [agentLoaded, setAgentLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Preload both images when the component mounts
    const houseImg = new Image();
    houseImg.src = 'https://www.pngmart.com/files/16/Modern-House-PNG-File.png';

    const agentImg = new Image();
    agentImg.src = 'https://o.remove.bg/downloads/709cab35-5810-4857-b7ce-72170faeaf96/1516734049817326814free-clipart-real-estate-agents.hi-removebg-preview.png';

    // setImageLoaded(true);
    Promise.all([
      new Promise((resolve) => {
        houseImg.onload = resolve;
      }),
      new Promise((resolve) => {
        agentImg.onload = resolve;
      }),
    ]).then(() => {
      // When both images are loaded, set the state to indicate they are ready
      setImageLoaded(true);
    });
  }, []);

  const handleInputChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setCreditScore(e.target.value);
    } else {
      alert('Invalid input. Please enter your Credit Score.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (creditScore.trim() === '') {
      // Input is invalid; you can show an error message or handle it as needed
      alert('Invalid input. Please enter your Credit Score.');
    } else {
      // Input is valid
      console.log('Submitted: ' + creditScore);
      // Navigate to the questionnaire page
      navigate('/Income', { state: { user: { '_id': creditScore } } });
    }
  };

  return (
    <div className="questionnairePage">
      <h2>Submit Your Credit Score</h2>
      {imageLoaded && (
        <div className="questionnaireImages">
            <img className="houseImage"
              src="https://www.pngmart.com/files/16/Modern-House-PNG-File.png"
              alt="House"
            />
            <img className="agentImage"
              src="https://o.remove.bg/downloads/709cab35-5810-4857-b7ce-72170faeaf96/1516734049817326814free-clipart-real-estate-agents.hi-removebg-preview.png"
              alt="Agent"
            />
          </div>

      )}
      <form onSubmit={handleSubmit}>
        <div className="questionnaireContainer">
          <p className="questionnaireStoryline">Let's get started with collecting your information to see if you are approved for a house or not! Please input your credit score. Integer values only!</p>
          <div className="questionnairePrompt">
            <label className="creditInput">
              Credit Score: 
              <input
                type="number"
                placeholder="Ex. 850"
                value={creditScore}
                onChange={handleInputChange}
              />
            </label>
            <button className="questionnaireSubmit" type="submit" disabled={!creditScore}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Questionnaire;
