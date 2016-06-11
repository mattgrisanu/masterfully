var Speech = require('../models/SpeechModel.js');
var watson = require('watson-developer-cloud'); 

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './env/production.env' });
}

var _analyzeTone = function (speech, callback) {
  var tone_analyzer = watson.tone_analyzer({
    url: "https://gateway.watsonplatform.net/tone-analyzer/api",
    username: process.env.TA_USER,
    password: process.env.TA_PASSWORD,
    version: 'v3',
    version_date: '2016-05-19 '
  });

  tone_analyzer.tone({text: speech}, function (err, res) {
    if (err) {
      console.log(err);
      callback(err); 
    } else {
      var resObj = {};
      var array = res.document_tone.tone_categories;
      array.forEach(function(tone) {
        console.log('tone',tone, typeof tone); 
        tone.tones.forEach(function(emotion) {
          console.log('emotion', emotion); 
          resObj[emotion.tone_id] = emotion.score;
          console.log(resObj); 
        })
      } );
      console.log(JSON.stringify(res, null, 2)); 

      callback(null, resObj); 
    }
  })
}

module.exports = {
  createSpeech: function (req, res) {
    /*** Calls _analyzTone ***/
    console.log('createSpeech'); 
    const speech = req.body.transcript;
    _analyzeTone(speech, function (err, data) {
      if (err) {
        res.status(500).send(); 
      } else {
        var speechObj = data;

        data.practice_id = req.body.practiceId,
        data.sessionId = req.body.sessionId,
        // data.analysis = data
        console.log('speechObj', speechObj)
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