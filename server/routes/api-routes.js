var UserController = require('./../controllers/UserController.js');
var SessionController = require('./../controllers/SessionController.js');
var SnapshotController = require('./../controllers/SnapshotController.js');
var PracticeController = require('./../controllers/PracticeController.js');
var QuestionController = require('./../controllers/QuestionController.js');
var SpeechController = require('./../controllers/SpeechController.js');

module.exports = function(app) {
  // See auth-routes for POST to /api/users
  app.get('/api/users', UserController.getCurrentUser);
  app.put('/api/users', UserController.updateUser);

  app.get('/api/session/:practiceId',  SessionController.getSessions);
  app.post('/api/session', SessionController.createSession);
  app.post('/api/session/update', SessionController.updateSession);

  app.get('/api/practice',  PracticeController.getPractices);
  app.post('/api/practice', PracticeController.createPractice);
  // app.get('/api/practice/:practiceId', PracticeController.getQuestionsByPractice);
  app.get('/api/singlePractice/:practiceId', PracticeController.getSinglePracticeById);

  // app.get('/api/recording', RecordingController);
  // app.post('/api/recording', RecordingController);

  app.get('/api/snapshot', SnapshotController.getSnapshots);
  app.post('/api/snapshot', SnapshotController.createSnapshot);

  app.get('/api/speech', SpeechController.getSpeeches);
  app.post('/api/speech', SpeechController.createSpeech);
};