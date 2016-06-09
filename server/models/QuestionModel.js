var db = require('../config/db.js');
var Practice = require('./PracticeModel.js');

db.knex.schema.hasTable('questions').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('questions', function(question) {
      question.increments('id').primary();
      question.string('question', 255);
      question.integer('practice_id').unsigned().references('practices.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var Question = db.Model.extend({
  tableName: 'questions',
  practice: function() {
    return this.belongsTo(Practice, 'practice_id');
  }
});

module.exports = Question;
