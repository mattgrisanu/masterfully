import React from 'react';
import ReactDom from 'react-dom';

var inputStyle = {
  margin: 'auto',
  width: '80%'
}

export default (props) => (
  <fieldset id="pure-form-group" className="pure-group">
      <input type="text"  name='title' style={inputStyle} className="setup-title setup-form-input pure-input-1-2" placeholder="Title" required></input>
      <input type="text"  name='subject' style={inputStyle} className="setup-form-input pure-input-1-2" placeholder="Subject"></input>
      <textarea name='description' style={inputStyle} className="setup-description setup-form-input pure-input-1-2" placeholder="Description"></textarea>
  </fieldset>
);