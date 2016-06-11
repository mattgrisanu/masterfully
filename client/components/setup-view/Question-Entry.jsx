import React from 'react'; 
import QuestionEntry from './Question-Entry.jsx';

var inputStyle = {
  margin: 'auto',
  width: '80%'
}

export default (props) => (
  <div>
    <input id={props.id} className='setup-form-input pure-input-1-2' style={inputStyle} type='text' onBlur={(e) => props.saveQuestions(e, props.id)} placeholder="Question (optional)"></input>
  </div>
)