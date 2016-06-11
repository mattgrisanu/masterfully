import React from 'react'; 
import QuestionEntry from './Question-Entry.jsx';

class QuestionForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inputs: [1, 2, 3]
    }
  }

  render () {
    return (
      <div clasName="question-form">
        <h3> Add questions </h3>
        <form className="pure-form">
          {this.state.inputs.map(function(val, key) {
            console.log(val, key); 
          })}
          {this.state.inputs.map(
             (val, index) => <QuestionEntry key={index} id={index} saveQuestions={this.props.saveQuestions}/>
          )} 
          <button onClick={() => {this.setState({inputs: this.state.inputs.concat([this.state.inputs.length++])})}}> + </button>
        </form>
      </div>
    ); 
  };
}

export default QuestionForm;