import React from 'react';
import ReactDom from 'react-dom';

    // <ul>
    //     <li>Introduce yourself within 30 seconds.</li>
    //     <li>Tell us about a challenge you recently faced and how you resolved it.</li>
    //     <li>What are your strengths and weaknesses?</li>
    //  </ul>

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
            <ul>
              {this.state.currentQ < this.state.questions.length ? <li>{this.state.questions[this.state.currentQ]}</li> : null}
            </ul>
          </div>
          <div className="button-bar">
            {this.state.currentQ < this.state.questions.length ? <button className="start-button pure-button pure-button-success" onClick={(e)=>this.setState({currentQ:(this.state.currentQ + 1)})}>Next Question</button> : null}
            <button className="stop-button pure-button pure-button-error">Stop</button>
          </div>
    	</div>
    )
  }
}