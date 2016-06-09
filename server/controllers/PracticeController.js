var Practice = require('../models/PracticeModel.js');
var Question = require('../models/QuestionModel.js');


module.exports = {
  createPractice: function (req, res) {
    console.log(req.body, 'Req Data in createPractice');
    var practiceObj = {
      user_id: req.user.id,
      name: req.body.title,
      description: req.body.description,
      // subject: req.body.subject, // not currently in DB
    }

    return new Practice(practiceObj).save()
      .then(function(newPractice) {
        req.body.questions.map(function(string) {
          var questionObj = {
            question: string,
            practice_id: newPractice.id
          }
          new Question(questionObj).save()
            .then(function(data) {
              console.log('data saved', data); 
            })
            .catch(function(error) {
              console.log('question error', error); 
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
        // console.log('no error', practices); 
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