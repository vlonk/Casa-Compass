import './NotApproved.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NotApproved() {
    const location = useLocation();
    console.log(location.state);
    const getSuggestions = () => {
        return location.state.suggestions ? location.state.suggestions : [];
    }
    
    
    return (
        <div>
            <div className='prompt'>
                <div>
                    You'd likely be denied for a loan. Here's a few things you can do to improve your chances:
                </div>
                <div className='suggestions'>
                    {getSuggestions().map((suggestion, index) => (
                        <div key={index}>{suggestion}</div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default NotApproved;