import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export default class PracticeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceNames: [],
      practiceHashTable: {} // name: id
    }
  }

  componentDidMount() {
    this._getPractices(function(data) {
      // this.setState({ practiceNames: data });/******************* CHECK PracticeController in server and API endpoint ***************************/
    }.bind(this));
  }

  _getPractices(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/practice', /******************* CHECK PracticeController in server and API endpoint ***************************/
      dataType: 'json',
      success: function(data) {
        callback(data); /******************* CHECK PracticeController in server and API endpoint ***************************/
      },
      error: function(error) {
        console.error('_getPractices Error: ', error);
      }
    });
  }

  _showAllSessions(practiceName) { // potentially will have to bind this on line 40
    browserHistory.push('/practices/sessions/' + this.state.practiceHashTable[practiceName].toString());
  }

  render() {
    return (
      <select id="Select a practice..." class="pure-input-1-2" onChange="_showAllSessions(this.value)"> 
        {this.state.practiceNames.map(
          practice => (
            <option>{practice}</option>
          )
        )}
      </select>
      {this.props.children}
    )
  }
}