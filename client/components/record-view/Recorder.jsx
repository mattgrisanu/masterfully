import React from 'react';
import Recorder from 'recorderjs'; 
import WatsonSpeech from 'watson-speech'; 
import watson from 'watson-developer-cloud'; 

import $ from 'jquery'; 

class AudioCapture extends React.Component {
  constructor (props) {
    super(props); 
    this.state = {
      transcript: 'Start speaking now' 
    }
  }

  componentDidMount() {
  
    document.querySelector('.start').onclick = function () {
      fetch('/api/speech-to-text/token')
      .then(function(response) {
          return response.text();
      }).then(function (token) {
        var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
            token: token,
            objectMode: true,
            // outputElement: '.output' // CSS selector or DOM Element
        });
        
        stream.on('data', function (data) {
          console.log(data); 
          if (data.final === true) {
            text[data.index] = data.alternatives[0].transcript;
            console.log(text); 
          }
        })

        stream.on('error', function(err) {
          console.log(err);
        });

        document.querySelector('.stop').onclick = function() {
          stream.stop();
          stream.stop.bind(this);
                    console.log('ended recording');
          console.log(text); 
          var string = text.join(' '); 
          console.log('joined text', string); 
          // Some sort of set time out needs to go here; 
          self.setState({transcript: string}); 
        };
      }).catch(function(error) {
        console.log(error);
      });
    };
  }

  render () {
    return (
      <div>
        
        <button className="start" >start</button>
        <button className="stop" >end</button>
        <div className="output"><p>{this.state.transcript}</p></div> 
      </div>)
  }
}

export default AudioCapture; 
  