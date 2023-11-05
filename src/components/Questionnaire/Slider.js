// src/Slider.js
import React from 'react';
import './Slider.js'

function Slider(props) {
  return (
    <div>
      
      <input
        type="range"
        id={props.id}
        name={props.name}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
      <p>Value: {props.value}</p>
    </div>
  );
}

export default Slider;
