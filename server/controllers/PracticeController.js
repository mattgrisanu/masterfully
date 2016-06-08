var Practice = require('../models/PracticeModel.js');

module.exports = {
  getSinglePractice: function(req, res) {
    var practice_id = req.params.practiceId;


    return new Practice({id: practice_id})
      .fetch()
      .then(function(practiceObj) {
        // console.log(practiceObj);
        res.status(200).send(practiceObj)
      })
      .catch(function(err) {
       console.error(err);
      });
  }

}