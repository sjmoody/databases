var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, data)=>{
      if (err) {
        throw new Error('unable to get users');
      } else {
        res.send(data);
      }
    });

  },
  post: function (req, res) {
    models.users.create(req.body, (err, data) => {
      if (err) {
        throw new Error ('unable to create user');
      } else {
        res.send(data);
      }
    });
  }
};
