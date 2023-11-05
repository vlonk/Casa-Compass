import React, { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Home() {
  // Step 2: Define state for each text input
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  // Step 3: Event handlers for input changes
  const handleField1Change = (e) => {
    setField1(e.target.value);
  };

  const handleField2Change = (e) => {
    setField2(e.target.value);
  };

  // Step 4: Submission handler and validation
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if both fields are filled
    if (field1 && field2) {
      // Handle the successful submission (e.g., navigate to the next page)
      console.log('Submitted Home Appraised Value:', field1);
      console.log('Submitted Down Payment Value:', field2);

      // ADD THESE FIELDS TO THE USER OBJECT
      user["AppraisedValue"] = field1;
      user["DownPayment"] = field2;
      
      setError(''); // Clear any previous errors

      // Save the user to the database
      const user_save = await axios.post('http://127.0.0.1:5000/addUser', { user: user });
      try {
        if (user) {
          var approval_response = await axios.post('http://127.0.0.1:5000/evaluate', { user: user });
          approval_response = approval_response["data"];
          console.log(approval_response);

          if (approval_response["Result"] === "Approved") {
            // Navigate to the approved page
            navigate('/Approved');
          } else {
            // Navigate to the denied page
            navigate('/NotApproved', { state: { suggestions: approval_response["Suggestions"] } });
          }
          
          
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setError('Please fill out both fields.');
    }
  };

  return (
    <div>
      <h1>Home Value and Down Payments</h1>
      <form onSubmit={handleSubmit}>
        {/* Text input fields */}
        <input type="text" value={field1} onChange={handleField1Change} placeholder="Field 1" />
        <input type="text" value={field2} onChange={handleField2Change} placeholder="Field 2" />

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit button */}
        <button className="homesSubmit" type="submit" disabled={!field1 || !field2}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
