import React from 'react'; 
import ReactDom from 'react-dom';

import { browserHistory } from 'react-router'; 
import $ from 'jquery'; 

import SetupForm from './setup-instructions.jsx';
import QuestionForm from './QuestionForm.jsx'; 

class Setup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      allPractices: {0: ''}, 
      allQuestions: [],
      practiceId: null,
      errorMessage: null,
      useExisting: false,
      title: null,
    }
  }

  componentWillMount () {
    var self = this; 
    this.getAllPractices = $.ajax({
      type: 'GET',
      url: 'api/practice',
      success: function(data) {
        data.map(function(obj) {
          self.state.allPractices[obj.id] = obj.name;
        })
        self.forceUpdate(); //Refactor
      },
      error: function (error) {
        self.setState({errorMessage: error}); 
      },
      dataType: 'json' 
    }); 
  }
  
  //***
  //Indicate to form whether it should use existing or new practice
  //***

  selectPractice (e) {
    if (e.target.value == 0) { 
      this.setState({useExisting: false}); 
    } else {
      this.setState({useExisting: true, practiceId: e.target.value}); 
    }
  }

  saveQuestions (e, index) {
    this.state.allQuestions[index] = e.target.value;
  }

  saveTitle (e) {
    console.log('save title', e.target.value);
    this.setState({title: e.target.value}); 
  } 

  formSubmit (e) {
    e.preventDefault(); 
    var self = this;
    if (this.state.useExisting) {
      browserHistory.push('/record/' + this.state.practiceId.toString());
    } else {
      console.log('not using existing'); 
      var formData = {
       title: this.state.title,
       questions: this.state.allQuestions || [],
      }
      $.ajax({
        type: 'POST',
        url: '/api/practice',
        data: formData,
        success: function(newPractice) {
          console.log('New Practice: ' + newPractice.id);
          browserHistory.push('/record/' + newPractice.id.toString()); 
        },
        error: function(error) {
          self.state.errorMessage = "Unable to submit. Please try again soon"
        },
        dataType: 'json'
      });
    }
  }

  render () {
    return (
      <div className='setup'>
        <h2 className='setup-title'> Use existing practice </h2>
        <div className="pure-form">
          <select className="practice-dropdown" onChange={this.selectPractice.bind(this)}>
            {Object.keys(this.state.allPractices).map(function (key) {
              return (<option value={key}>{this.state.allPractices[key]}</option>)
            }, this)}
          </select>
        </div> 
        <br />
        <h3> or </h3>
        <h2 className='setup-title'> Create new practice </h2>
        <div>
          <form className="pure-form">
            <SetupForm saveTitle={this.saveTitle.bind(this)}/>
            <QuestionForm saveQuestions={this.saveQuestions.bind(this)}/>
            <div>
              <button className="submit-button pure-button" onClick={this.formSubmit.bind(this)}>Start practicing!</button>
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

export default Setup; 
       