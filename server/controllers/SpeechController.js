var Speech = require('../models/SpeechModel.js');
var watson = require('watson-developer-cloud'); 

var _tone_analyzer = watson.tone_analyzer({
    url: "https://gateway.watsonplatform.net/tone-analyzer/api",
    username: process.env.TA_USER,
    password: process.env.TA_PASSWORD,
    version: 'v3',
    version_date: '2016-05-19 '
});

var _analyzeTone = function (speech, callback) {
  _tone_analyzer.tone({text: speech}, function (err, res) {
    if (err) {
      console.log(err);
      callback(err); 
    } else {
      var resObj = {};
      var array = res.document_tone.tone_categories;
      
      array.forEach(function(tone) {
        // console.log('tone',tone, typeof tone); 
        tone.tones.forEach(function(emotion) {
          // console.log('emotion', emotion); 
          resObj[emotion.tone_id] = emotion.score;
          // console.log(resObj); 
        })
      });
      console.log(JSON.stringify(res, null, 2)); 

      callback(null, resObj); 
    }
  });
}

module.exports = {
  createSpeech: function (req, res) { 
    const speech = req.body.transcript;
    _analyzeTone(speech, function (err, data) {
      if (err) {
        res.status(500).send(); 
      } else {
        var speech = data;
        data.practice_id = req.body.practiceId;
        data.sessionId = req.body.sessionId;
        data.userId = req.user.id;

        // console.log('speechObj', speech)
        return new Speech(speech).save()
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
    var query = {};
    if (req.param('sessionId')) {
      queryObj.sessionId = req.param('sessionId');
    } else if (req.param('practiceId')) {
      queryObj.practice_id = req.param('practiceId');
    }

    Speech.where(query).fetchAll()
      .then(function (speeches) {
        res.status(200).send(speeches);
      })
      .catch(function (err) {
        console.errot('Error: Fail to get speeches', err);
        res.status(500).send(err);
      });
  }
}