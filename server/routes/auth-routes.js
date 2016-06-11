var UserController = require('./../controllers/UserController.js');
var SpeechToTextToken = require('../config/stt-token.js');

module.exports = function(app, passport) {

  // Pre-authentication routes
  app.get('/welcome',
  function(req, res) {
    res.render('welcome');
  });

  app.get('/login',
  function(req, res) {
    res.render('login');
  });

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

  app.post('/api/users', UserController.createUser);

  app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/')
  });

  // API call to Watson Speech to Text
  app.get('/api/speech-to-text/token', SpeechToTextToken.getToken)
};