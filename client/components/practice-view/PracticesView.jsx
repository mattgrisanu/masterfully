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
    this._getPractices(function (data) {
      let [practiceNames, practiceHashTable] = this._organizePractices(data);

      this.setState({ 
        practiceNames: practiceNames,
        practiceHashTable: practiceHashTable
      }); 
    }.bind(this));
  }

  _getPractices(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/practice',
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(error) {
        console.error('_getPractices Error: ', error);
      }
    });
  }

  _organizePractices(data) {
    let practiceNames = [];
    let practiceHashTable = {};

    // loop through the data received from GET request to populate state
    for (let i=0; i<data.length; i++) {
      let practice = data[i];
      practiceNames.push(practice.name);
      practiceHashTable[practice.name] = practice.id;
    }

    return [practiceNames, practiceHashTable];
  }

  _showAllSessions(e) { // potentially will have to bind this on line 40
    console.log("HERE HERE HERE HEAR HERE!", e.target.value);
    browserHistory.push('/practices/sessions/' + this.state.practiceHashTable[e.target.value].toString());
  }


  render() {
    return (
      <div>
        <select id="allPractices" class="pure-input-1-2" onChange={this._showAllSessions.bind(this)}> 
          <option selected disabled>Select a practice...</option>
          {this.state.practiceNames.map(
            practice => (
              <option>{practice}</option>
            )
          )}
        </select>
        {this.props.children}
      </div>
    )
  }
}