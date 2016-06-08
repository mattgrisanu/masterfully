var db = require('../config/db.js');
var User = require('./UserModel.js');
var Question = require('./QuestionModel.js');

db.knex.schema.hasTable('practices').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('practices', function(pratice) {
      practice.increment('id').primary();
      practice.string('name', 100);
      practice.string('description', 255);
      practice.integer('user_id').unsigned().references('users.id');
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
  }
  questions: function() {
    return this.hasMany(Question);
  }
});

module.exports = Practice;