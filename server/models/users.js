var db = require('../db');
var Sequelize = require('sequelize');
var dbs = new Sequelize('chat', 'root', '', {dialect: 'mysql'});

var User = dbs.define('User', {
  Name: Sequelize.STRING
}, {timestamps: false});

module.exports = {
  getAll: function (cb) {
    User.sync()
      .then(function() {
        return User.findAll();
      })
      .then(function(data) {
        cb(null, data);
      })
      .catch(function(err) {
        throw err;
        dbs.close();
      });
  },

  create: function(obj, cb) {
    User.sync()
      .then(()=>{
        return User.create({
          Name: obj.username
        });
      })
      .then((results) => {
        cb(null, results);
      })
      .catch((err) => {
        throw err;
        dbs.close();
      });
  }

};
