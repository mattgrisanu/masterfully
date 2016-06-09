var db = require('../config/db.js');
var User = require('./UserModel.js');
var Session = require('./SessionModel.js');
var Practice = require('./PracticeModel.js');

db.knex.schema.hasTable('speech').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('speech', function(snapshot) {
      snapshot.increments('id').primary();
      snapshot.string('analysis'); 
      snapshot.integer('userId');
      snapshot.integer('sessionId');
      snapshot.integer('practice_id').unsigned().references('practices.id');
      snapshot.timestamps();
    }).then(function(){
      console.log('speech table created')
    })
  }
});

var Speech = db.Model.extend({
  tableName: 'speech',
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

module.exports = Speech;