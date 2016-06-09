var Practice = require('../models/PracticeModel.js');
var Question = require('../models/QuestionModel.js');


module.exports = {
  createPractice: function (req, res) {
    // console.log(req.body, 'Req Data in createPractice');
    const practice = {
      user_id: req.user.id,
      name: req.body.title,
      description: req.body.description,
      // subject: req.body.subject, // not currently in DB
    }

    return new Practice(practice).save()
      .then(function(newPractice) {
        req.body.questions.map(function(questionContent) {
          const questionObj = {
            question: questionContent,
            practice_id: newPractice.id
          }
          new Question(questionObj).save()
            .then(function(newQuestion) {
              console.log('Question saved', newQuestion); 
            })
            .catch(function(error) {
              console.log('Error saving question: ', error); 
            }); 
        })
        return newPractice; 
      })
      .then(function(newPractice) {
        res.status(201).send(newPractice);
      })
      .catch(function(err) {
        console.log(err); //move error handling to front end
        res.status(500).send(err); 
      });
  },

  getPractices: function (req, res) {
    console.log('get practices', req.user.id); 
    var queryObj = {
      user_id: req.user.id,
    }

    Practice.where(queryObj).fetchAll()
      .then(function(practices) {
        console.log('Practices from db, no error', practices); 
        res.status(200).send(practices);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send(error); 
      })
  },

  getSinglePracticeById: function(req, res) {
    var practice_id = req.params.practiceId;
    return new Practice({id: practice_id})
      .fetch()
      .then(function(practiceObj) {
        res.status(200).send(practiceObj)
      })
      .catch(function(err) {
       console.error(err);
      });
  }
}