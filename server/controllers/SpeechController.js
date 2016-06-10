var Speech = require('../models/SpeechModel.js');
var watson = require('watson-developer-cloud'); 


module.exports = {
  _analyzeTone: function (speech, callback) {
    var tone_analyzer = watson.tone_analyzer({
      url: "https://gateway.watsonplatform.net/tone-analyzer/api",
      username: '67de49fe-9c37-4cf6-9ebb-f0e5be00533d',
      password: 'mz5qSSNJQupj',
      version: 'v3',
      version_date: '2016-05-19 '
    });

    tone_analyzer.tone({text: req.body.transcript}, function (err, tone) {
      if (err) {
        console.log(err);
        callback(err); 
      } else {
        res = JSON.stringify(tone, null, 2)
        console.log(res); 
        callback(null, res); 
      }
    })
  },
  
  createSpeech: function (req, res) {
    /*** Calls _analyzTone ***/
    console.log('createSpeech'); 
    const speech = req.body.transcript
    this._analyzeTone(speech, function (err, data) {
      if (err) {
        res.statusCode(500).send(); 
      } else {
        var speechObj = {
          practice_id: req.body.practiceId,
          session_id: req.body.sessionId,
          analysis: data
        }
        return new Speech(speechObj).save()
          .then(function(newSpeech) {
            console.log('SUCCESS in DATABASE'); 
            res.status(201).send(newSpeech);
          })
          .catch(function(err) {
            console.log(err); 
          });   
      }
    }); 
  },

  getSpeeches: function (req, res) {

  }
}