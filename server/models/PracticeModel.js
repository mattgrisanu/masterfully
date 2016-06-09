var db = require('../config/db.js');
var User = require('./UserModel.js');
var Question = require('./QuestionModel.js');
var Session = require('./SessionModel.js');
var Snapshot = require('./SnapshotModel.js');
var Speeches = require('./SpeechModel.js'); 


db.knex.schema.hasTable('practices').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('practices', function(practice) {
      practice.increments('id').primary();
      practice.string('name', 100);
      practice.integer('user_id').unsigned().references('users.id');
      practice.string('description', 255);
      practice.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var Practice = db.Model.extend({
  tableName: 'practices',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  questions: function() {
    return this.hasMany(Question);
  },
  sessions: function() {
    return this.hasMany(Session);
  },
  snapshots: function() {
    return this.hasMany(Snapshot);
  },
  speeches: function () {
    return this.hasMany(Speeches); 
  }
});

module.exports = Practice;