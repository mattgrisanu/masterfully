import React from 'react';
import SessionEntry from './SessionEntry.jsx';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { calculatePerformance } from './../../lib/helpers';;

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionEntries: [],
      practiceId: this.props.params.practiceId,
      performanceData: null
    }
  }

  componentDidMount() {
    this._getSessions(function(data) {
      this.setState({ sessionEntries: data });
    }.bind(this));
    // try parallel server requests here
    this._getAllSnapshotInfo();

  } 

  _getSessions(callback) {
    const endpoint = '/api/session/' + this.state.practiceId;

    $.ajax({
      method: 'GET',
      url: endpoint,
      success: function(data) {
        callback(data);
        
      }.bind(this),
      error: function(error) {
        console.error('_getSessions Error:', error);
      },
      dataType: 'json'
    });
  }

  _getAllSnapshotInfo() {
    // get all data for snapshots for practiceId
    let practiceId = this.state.practiceId;
    let url = '/api/snapshot';
    $.ajax({
      type: 'GET',
      url: url,
      data: {practiceId:practiceId},
      success: function(dataObj) {
        this.setState({
          performanceData:calculatePerformance(dataObj)
        });

      }.bind(this),
      error: function(error) {
        console.error('error retrieving from /api/snapshot route', error);
      }
    });
  }

  render() {
    return (
      <div className="view sessions-view">
        <h4 className="sessions-view-title">My Sessions</h4>
        <div className="pure-g">
          {this.state.sessionEntries.map(
            entry => (
              <div className="pure-u-1-3">
                <SessionEntry entry={entry} sessionId={entry.id} />
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}