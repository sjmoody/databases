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
  // mysql version
  // getAll: function (callback) {
  //   db.db.query('SELECT * from Messages', (err, results) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // },

  getAll: function (cb) {
    Message.sync()
      .then(function() {
        return Message.findAll();
      })
      .then(function(data) {
        // dbs.close();
        cb(null, data);
      })
      .catch(function(err) {
        console.error(err);
        // dbs.close();
      });
  },

  create: function(obj, cb) {
    // Expect obj to be {username, message, roomname}
    // find user_ID for obj.username
    // then create message {
      // user_ID: result of promise
      // roomname : obj.roomname,
      // message : obj.message }

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
        // dbs.close();
        cb(null, results);
      })
      .catch((err)=>{
        console.error(err);
        // dbs.close();
      });
  }

  // create: function (obj, cb) {
  //   db.db.query(`SELECT id FROM Users WHERE name = '${obj.username}'`, (err, results) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       db.db.query(`INSERT INTO Messages VALUES (NULL, ${results[0].id}, '${obj.roomname}', '${obj.message}')`, (err, results1) => {
  //         if (err) {
  //           throw err;
  //         }
  //         cb(null, results1);
  //       });
  //     }
  //   });
  // }
};
