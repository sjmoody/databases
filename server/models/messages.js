var db = require('../db');
const mysql = require('mysql2');

var Sequelize = require('sequelize');

var dbs = new Sequelize('chat', 'root', '', {
  dialect: 'mysql'
});

var User = dbs.define('User', {
  Name: Sequelize.STRING
}, {timestamps: false});

var Message = dbs.define('Message', {
  user_ID: Sequelize.INTEGER,
  roomname: Sequelize.STRING,
  text: Sequelize.STRING
}, {timestamps: false});

module.exports = {
  getAll: function (cb) {
    Message.sync()
      .then(function() {
        return Message.findAll();
      })
      .then(function(data) {
        cb(null, data);
      })
      .catch(function(err) {
        console.error(err);
        dbs.close();
      });
  },

  create: function(obj, cb) {

    dbs.sync()
      .then(()=>{
        return User.findAll({where: {Name: obj.username}});
      })
      .then((results)=>{
        return Message.create({
          user_ID: results[0].id,
          roomname: obj.roomname,
          text: obj.message
        });
      })
      .then((results) =>{
        cb(null, results);
      })
      .catch((err)=>{
        console.error(err);
        dbs.close();
      });
  }

};
