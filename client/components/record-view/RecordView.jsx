import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import FACE from './../../lib/FACE-1.0.js';
import WatsonSpeech from 'watson-speech'; 
import watson from 'watson-developer-cloud'; 

import { ordinal_suffix_of } from './../../lib/helpers';
import env from './../../../env/client-config.js';
import RecordInstructions from './record-instructions.jsx';
import RecordQuestions from './record-questions.jsx';
// import Recorder from './Recorder.jsx'

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceId: this.props.params.practiceId,
      practiceName: null,
      sessionCount: null,
      prompts: null,
      sessionId: null,
      intervalId: null,
      showQuestions: false,
      startTime: undefined,
      transcript: [],
      token: null,
      stream: null
    }
  }

  componentDidMount() {
    FACE.webcam.startPlaying('webcam');
    this._getPracticeInfo();
  }

  _getPracticeInfo() {
    // get the name of the practice and the session count for this session
    let practiceId = this.state.practiceId;
    let url = `/api/singlePractice/${practiceId}`;
    $.ajax({
      type: 'GET',
      url: url,
      success: function(dataObj) {
        this.setState({
          practiceName: dataObj.practiceObj.name,
          prompts: dataObj.quesitonObj
        });
        this._getSessionCount();


      }.bind(this),
      error: function(error) {
        console.error('error retrieving from singlePractice route', error)
      },
      dataType: 'json'
    });
  }

  _getSessionCount() {
    let practiceId = this.state.practiceId;
    let url = `/api/session/${practiceId}`; 
    $.ajax({
      type: 'GET',
      url: url,
      success: function(sessionObj) {
        this.setState({
          sessionCount: sessionObj.length + 1
        });

      }.bind(this),
      error: function(error) {
        console.error('error retrieving from getSessionCount route', error)
      },
      dataType: 'json'
  });
}

  _createNewSession(e) {
    var formData = {
     practiceId: this.state.practiceId
    }

    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: formData,
      success: function(newSession) {
        this.setState({
          sessionId: newSession.id
        });

        this._startRecording()
        this._startTranscription();
        this._loadprompt()
      }.bind(this),
      error: function(error) {
        console.error('startRecording error', error)
      },
      dataType: 'json'
    });
  }

  _loadprompt() {

    $('.record-instructions').remove()
    this.setState({showQuestions: true})

  }

  _startRecording() {
    var intervalId = setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      this._takeSnapshot();
    }.bind(this), 5000);

    this.setState({ intervalId: intervalId, startTime: Date.now() });
  }

  _startTranscription () {
    var self = this;
    // var text = [];
    console.log('called??');
    fetch('/api/speech-to-text/token')
    .then(function(response) {
      return response.text();
    }).then(function (token) {
      
      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        objectMode: true
        // outputElement: '.output' // CSS selector or DOM Element
      }); 
      
      stream.on('data', function (data) {
        console.log(data); 
        if (data.final === true) {
          self.state.transcript[data.index] = data.alternatives[0].transcript;
          // console.log(text); 
        }
      });

      stream.on('error', function(err) {
        console.log(err);
      });

      stream.on('end', function (data) {
        self._endTranscription(stream); 
      }); 

      document.querySelector('.stop-button').onclick = function() {
        // console.log('stream', stream); 
          stream.stop.bind(this);
          stream.stop();
          console.log('ended recording', self.state.transcript);
          // console.log(text); 
          // var string = self.state.transcript.join(' '); 
          // console.log('joined text', string); 
          // Some sort of set time out needs to go here; 
          // self.setState({transcript: string}); 
          // this._endSession.bind(self);
          // console.log('stop button function'); 
          self._endSession(); 
        };
    }).catch(function(error) {
      console.log(error);
    });
  }

  _endTranscription (stream) {
    console.log('my this binding INSIDE end listener=>', self);
    // var stream = this.state.stream;

    stream.stop();
    stream.stop.bind(stream);
    
    // this.setState({stream: stream});
    console.log('ended recording' , this.state.transcript);
    // console.log(text); 
    // var string = this.state.transcript.join(' '); 
    // console.log('joined text', string); 
    // // Some sort of set time out needs to go here; 
    // this.setState({transcript: string}); 
  };

  _takeSnapshot() {
    var snapshot = document.querySelector('#current-snapshot');
    if( snapshot.naturalWidth == 0 ||  snapshot.naturalHeight == 0 ) return;

    // Process snapshot and make API call
    var snapshotBlob = FACE.util.dataURItoBlob(snapshot.src);
    var successCb = function(data) {
      this._createNewSnapshot(data.persons[0])
    }.bind(this);
    var errorCb = function(err) {
      console.error('_sendSnapshot error', err);
    }

    FACE.sendImage(
      snapshotBlob,
      successCb, errorCb,
      env.FACE_APP_KEY, env.FACE_CLIENT_ID
    );
  }

  _createNewSnapshot(snapshotData) {
    let sessionId = this.state.sessionId;
    let practiceId = this.state.practiceId;

    $.ajax({
      method: 'POST',
      url: '/api/snapshot',
      data: {
        sessionId: sessionId,
        snapshotData: snapshotData,
        practiceId: practiceId
      },
      success: function(newSnapshot) {
        console.log('New snapshot created.', newSnapshot);
      },
      error: function(error) {
        console.error('_createNewSnapshot error', error);
      },
      dataType: 'json'
    });
  }

  _endSession() {
    console.log('Session ended.');
    // console.log('stream in state =>', this.state.stream);

    clearInterval(this.state.intervalId);
    this._calcDuration();
    // this._endTranscription();

    // ***************************************
    // posting to server
    var transcript = this.state.transcript.join(' '); 
    var sessionId = this.state.sessionId;
    var practiceId = this.state.practiceId; 
    $.ajax({
      type: 'POST',
      url: '/api/speech',
      data: {
        transcript: transcript,
        sessionId: sessionId,
        practiceId: practiceId
      },
      success: function() {
        console.log('successful speech post');
      },
      error: function (error) {
        console.log('unsuccessful post',error);
      },
      dataType: 'text'
    })
    // ******************************************
    // Wait 2 seconds after stop button is pressed
    setTimeout(function() {
      FACE.webcam.stopPlaying('webcam');
      console.log('fn in set timeout called'); 
      browserHistory.push('/reports/' + this.state.sessionId.toString());
    }.bind(this), 1000)
  }

  _calcDuration () {
    let sessionId = this.state.sessionId;
    let transcript = this.state.transcript; 
    console.log(this, 'cald')
    if (this.state.startTime !== undefined) {
        var endTime = Date.now();
        var difference = endTime - this.state.startTime;
        difference = Math.round(difference/1000)
    }
    console.log(difference, 'this is the difference in seconds')
    //create ajax request to update /api/sessions of sessionId
    $.ajax({
      type: 'POST',
      url: '/api/session/update',
      data: {
        difference: difference,
        sessionId: sessionId,
      },
      success: function(updatedSession) {
        console.log(updatedSession, 'UPDATED DURATION')
      }.bind(this),
      error: function(error) {
        console.error('_calcDuration error', error)
      },
      dataType: 'json'
    });
  }

  render() {
    return (
      <div className="pure-g record-container">
        <div className="pure-u-2-3 record-box">
          <video id='webcam' className="pure-u-1-1 record-webcam" autoplay></video>
          <img id='current-snapshot' src=''/>
        </div>
        <div className="pure-u-1-3 record-form">
          <RecordInstructions 
            clicked={this._createNewSession.bind(this)}
            practiceName={this.state.practiceName}
            count={ordinal_suffix_of(this.state.sessionCount)}
          />
          { this.state.showQuestions ? <RecordQuestions prompts={this.state.prompts} /> : null }
        </div>

      </div>
    )
  }
}

// <div className="pure-u-2-3 record-box">
//           <img className='pure-u-1-2' id='current-snapshot' src=''/>
//         </div>