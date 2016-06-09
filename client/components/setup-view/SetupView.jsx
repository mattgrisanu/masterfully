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
      useExisting: false
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

  formSubmit () {
    var self = this;
    if (this.state.useExisting) {
      browserHistory.push('/record/' + this.state.practiceId.toString());
    } else {
      console.log('not using existing'); 
      var formData = {
       title: $('.record-title')[0].value,
       subject: $('.record-subject')[0].value,
       description: $('.record-description')[0].value,
       questions: this.state.allQuestions,
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
        <h2> Use existing practice </h2>
        <select onChange={this.selectPractice.bind(this)}>
          {Object.keys(this.state.allPractices).map(function (key) {
            return (<option value={key}>{this.state.allPractices[key]}</option>)
          }, this)}
        </select>
        <h2> Create new practice </h2>
        <SetupForm formSubmit={this.formSubmit.bind(this)}/>
        <QuestionForm saveQuestions={this.saveQuestions.bind(this)}/>
        <button onClick={this.formSubmit.bind(this)}>Start practicing!</button>
      </div>
    )
  }
}

export default Setup; 
       