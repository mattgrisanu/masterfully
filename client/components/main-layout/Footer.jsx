import React from 'react';
import ReactDom from 'react-dom';

export default class Footer extends React.Component { 
  render() {
    return (
      <div className="footer">
        <a href="https://github.com/formidable-coffee/masterfully" className="footer-link">About</a>
        <a href="https://github.com/formidable-coffee/masterfully" target="_blank" className="footer-link">Github</a>
        <a href="https://github.com/formidable-coffee/masterfully" target="_blank" className="footer-link">License</a>
        <a href="https://github.com/formidable-coffee/masterfully" target="_blank" className="footer-link">Contribute</a>
      </div>
    )
  }
}