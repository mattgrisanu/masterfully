var vcapServices = require('vcap_services');
var extend = require('util')._extend;
var watson = require('watson-developer-cloud');

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './env/production.env' });
}

// set up an endpoint to serve speech-to-text auth tokens
// For local development, replace username and password or set env properties
var sttConfig = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  password: process.env.STT_PASSWORD,
  username: process.env.STT_USER
}, vcapServices.getCredentials('speech_to_text'));

var sttAuthService = watson.authorization(sttConfig);

module.exports = {
  getToken: function (req, res) {
    sttAuthService.getToken({url: sttConfig.url}, function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      console.log('token', token); 
      res.send(token);
    });
  }
};
