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
       <fieldset id="pure-form-group" className="pure-group">
        {this.state.inputs.map(function(val, key) {
          console.log(val, key); 
        })}
        {this.state.inputs.map(
           (val, index) => <QuestionEntry key={index} id={index} saveQuestions={this.props.saveQuestions}/>
        )} 
        <div className='add-question-container'>
          <button className="add-question" onClick={() => {this.setState({inputs: this.state.inputs.concat([this.state.inputs.length++])})}}> + </button>
        </div>
      </fieldset>
    ); 
  };
}

export default QuestionForm;