import React from 'react';
import ReactDom from 'react-dom';

    // <ul>
    //     <li>Introduce yourself within 30 seconds.</li>
    //     <li>Tell us about a challenge you recently faced and how you resolved it.</li>
    //     <li>What are your strengths and weaknesses?</li>
    //  </ul>
var questionButton = {
  'border-radius': '6px',
  'color': 'white',
  'background-color': '#1abc9c',
  'margin': '10px'
};

var stopButton = {
  'background-color':'#c0392b',
  'border-radius': '6px',
  'color': '#ecf0f1',
  'font-weight': 'bold',
  'margin': '10px'

};
export default class RecordsQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions:this.props.prompts,
      currentQ:0
    };
  }

  render() {
  	return (
      <div className="record-questions pure-u-1-1">
    		<h1>Questions</h1>
          <div>
            <p>
              {this.state.currentQ < this.state.questions.length ? <p>{this.state.questions[this.state.currentQ]}</p> : null}
            </p>
          </div>
          <div className="button-bar">
            {this.state.currentQ < this.state.questions.length ? <button className="question-button pure-button pure-button-success" style={questionButton} onClick={(e)=>this.setState({currentQ:(this.state.currentQ + 1)})}>Next Question</button> : null}
            <button style={stopButton}className="stop-button pure-button pure-button-error">Stop</button>
          </div>
    	</div>
    )
  }
}