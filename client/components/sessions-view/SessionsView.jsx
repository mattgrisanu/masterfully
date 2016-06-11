import React from 'react';
import SessionEntry from './SessionEntry.jsx';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { calculatePerformance } from './../../lib/helpers';
import Chart from './line.jsx';

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    console.log("SessionsView is rercreating");
    this.state = {
      sessionEntries: [],
      practiceId: this.props.params.practiceId,
      performanceData: null,
      showChart: false
    }
  }

  componentDidMount() {
    
    this._getSessions(function(data) {
      this.setState({ sessionEntries: data });
    }.bind(this));
    // try parallel server requests here

  } 

  _getSessions(callback) {
    const endpoint = '/api/session/' + this.state.practiceId;

    $.ajax({
      method: 'GET',
      url: endpoint,
      success: function(data) {
        console.log('data length is: ',data.length);
        var show = data.length > 1;
        callback(data);
        this._getAllSnapshotInfo(function(data) {
          this.setState({
            performanceData:calculatePerformance(data),
            showChart:show
          });
        }.bind(this));
        
      }.bind(this),
      error: function(error) {
        console.error('_getSessions Error:', error);
      },
      dataType: 'json'
    });
  }

  _getAllSnapshotInfo(callback) {
    // get all data for snapshots for practiceId
    let practiceId = this.state.practiceId;
    let url = '/api/snapshot';
    $.ajax({
      type: 'GET',
      url: url,
      data: {practiceId:practiceId},
      success: function(dataObj) {
        console.log('dataObj: ',dataObj);
        callback(dataObj);

      }.bind(this),
      error: function(error) {
        console.error('error retrieving from /api/snapshot route', error);
      }
    });
  }

  

  render() {
    if (!this.state.performanceData) {
      return <div>Loading...</div>;
    }
    return (
      <div className="view sessions-view">
        {this.state.showChart ? <Chart data={this.state.performanceData}/> : <div className="helpful-info"><p>Hint: Complete at least 2 sessions to see your performance over time!</p></div>}
        <h4 className="sessions-view-title">My Sessions</h4>
        <div className="pure-g">
          {this.state.sessionEntries.map(
            (entry, index) => (
              <div className="pure-u-1-3">
                <SessionEntry entry={entry} sessionId={entry.id} index={index} />
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}