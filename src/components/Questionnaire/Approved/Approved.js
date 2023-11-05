import './Approved.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Approved() {
  return (
    <div>
      <div className='approved-icon'>
        {/* we can replace with icon later */}
        ✅
      </div>
      <div className='approved-message'>
        Approved 
      </div>
      <div className='approved-submessage'>
        Based on your answers, you should be approved for a home loan!
        </div>
    </div>
  );
}

export default Approved;