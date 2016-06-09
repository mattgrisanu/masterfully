var db = require('../config/db');
var User = require('./UserModel');
var Snapshot = require('./SnapshotModel');
var Practice = require('./PracticeModel');
var Speech = require('./SpeechModel'); 

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function(session) {
      session.increments('id').primary();
      session.integer('userId');
      session.integer('practice_id').unsigned().references('practices.id');
      session.string('title');
      session.string('date');
      session.string('duration');
      session.timestamps();
    }).then(function() {
      console.log('Session Table created');
    })
  }
});

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true,
  user: function() {
    return this.belongTo(User, 'userId');
  },
  snapshots: function() {
    return this.hasMany(Snapshot);
  },
  practice: function() {
    return this.belongTo(Practice, 'practice_id');
  },
  speech: function () {
    return this.hasOne(Speech); 
  }
});

module.exports = Session;