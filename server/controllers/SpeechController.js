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
      query.sessionId = req.param('sessionId');
    } else if (req.param('practiceId')) {
      query.practice_id = req.param('practiceId');
    }

    Speech.where(query).fetchAll()
      .then(function (speeches) {
        speeches = speeches.models[0].attributes;
        var data = {
          _data: {
            id          : speeches.id,
            userId      : speeches.userId,
            sessionId   : speeches.sessionId,
            practice_id : speeches.practice_id,
            created_at  : speeches.created_at,
            updated_at  : speeches.updated_at,
          },
          speechData: {
              joy               : speeches.joy,
              fear              : speeches.fear,
              sadness           : speeches.sadness,
              disgust           : speeches.disgust,
              anger             : speeches.anger,
              openess           : speeches.openness_big5,
              conscientiousness : speeches.conscientiousness_big5,
              extraversion      : speeches.extraversion_big5,
              agreeableness     : speeches.agreeableness_big5,
              emotional_range   : speeches.emotional_range_big5,
              analytic          : speeches.analytical,
              confidence        : speeches.confident,
              tentative         : speeches.tentative
          }
        };
        res.status(200).send(data);
      })
      .catch(function (err) {
        console.error('Error: Fail to get speeches', err);
        res.status(500).send(err);
      });
  }
}