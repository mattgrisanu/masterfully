import React from 'react';
import ReactDom from 'react-dom';


export default (props) => {
  console.log('go so fast')
  return (
  <div className="record-instructions pure-u-1-1">
  <h2> Session Info </h2>
      <p>You are about to record another session in your <span className="emphasis">{'"' + props.practiceName + '"'}</span> series</p>
      <p>This will be your <span className="emphasis">{props.count} session</span> in this series</p>
      

	    <button type='button' onClick={(e) => props.clicked(e)} className="record-form-button pure-button pure-input-1-2 pure-button-primary">Start Recording</button>
		
  </div>
)
};