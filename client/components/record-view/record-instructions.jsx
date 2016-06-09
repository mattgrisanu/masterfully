import React from 'react';
import ReactDom from 'react-dom';


export default (props) => (
  <div className="record-instructions pure-u-1-1">
  <h2> Session Info </h2>
      <p>You are about to record another session in your {props.practiceName} series</p>
      <p>This will be your {props.count} session in this series</p>
      

	    <button type='button' onClick={(e) => props.clicked(e)} className="record-form-button pure-button pure-input-1-2 pure-button-primary">Start Recording</button>
		
  </div>
);