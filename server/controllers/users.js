var models = require('../models');

module.exports = {
  get: function (req, res) {
    res.send('Retrieving users');
    //res.send(models.users.getAll);
  },
  post: function (req, res) {
    res.send('testing');
    //res.send(models.users.create(req.body));
  }
};
