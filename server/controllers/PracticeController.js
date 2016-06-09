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
    var dataObj = {};
    var practice_id = req.params.practiceId;
    Practice.where({id: practice_id})
      .fetchAll()
      .then(function(practiceObj) {
        dataObj.practiceObj = practiceObj.models[0].attributes;
        Question.where({practice_id: practiceObj.models[0].attributes.id})
          .fetchAll()
          .then(function(questionObj) {
            dataObj.quesitonObj = questionObj.models.map(function(model) {
              return model.attributes.question;
            });
            res.status(200).send(dataObj);
          })
      })
      .catch(function(err) {
       console.error(err);
      });
  }
}