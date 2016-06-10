var db = require('../config/db.js');
var User = require('./UserModel.js');
var Session = require('./SessionModel.js');
var Practice = require('./PracticeModel.js');

db.knex.schema.hasTable('speeches').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('speeches', function(speech) {
      speech.increments('id').primary();
      speech.string('analysis'); 
      // speech.string('disgust'); 
      // speech.string('fear'); 
      // speech.string('joy'); 
      // speech.string('sadness'); 
      // speech.string('language-analytical');
      // speech.string('language-confident'); 
      // speech.string('language-tentative'); 
      // speech.string('openness_big5'); 
      // speech.string('onscientiousness_big5'); 
      // speech.string('extraversion_big5'); 
      // speech.string('agreeableness_big5'); 
      // speech.string('emotional_range_big5'); 

      speech.integer('userId').unsigned().references('users.id');;
      speech.integer('sessionId').unsigned().references('sessions.id');;
      speech.integer('practice_id').unsigned().references('practices.id');
      speech.timestamps();
    }).then(function(){
      console.log('speech table created')
    })
  }
});

var Speeches = db.Model.extend({
  tableName: 'speeches',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'userId');
  },
  session: function() {
    return this.belongsTo(Session, 'sessionId');
  },
  practice: function() {
    return this.belongsTo(Practice, 'practice_id');
  }
})

module.exports = Speeches;