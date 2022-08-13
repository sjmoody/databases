var db = require('../db');
const mysql = require('mysql2');


module.exports = {
  getAll: function (callback) {
    // expected db.query to know what it is - maybe another function?

    db.db.query('SELECT * from Messages', (err, results) => {
      if (err) {
        throw err;
      } else {
        // console.log(results);
        // callback(null, JSON.stringify(results));
        // console.log('Results: ', JSON.stringify(results));


        callback(null, results);
      }
    });
  }, // a function which produces all the messages

  // TODO: USE THE PATTERN ABOVE FOR MESSAGES AND USERS MODELS AND UPDATE USERS AND MESSAGE CONTROLLERS FOR SAME PATTERN THEN EXPECT TEST TO PASS!!!
  create: function (obj) {
    db.query(`SELECT id FROM Users WHERE username = ${obj.username} UNION SELECT id FROM Rooms WHERE roomname = ${obj.roomname}`, (err, results) => {
      if (err) {
        throw err;
      }
      db.query(`INSERT INTO Messages VALUES (NULL, ${results[0]}, ${results[1]}, ${obj.text})`, (err, results1) => {
        if (err) {
          throw err;
        }
        return results1;
      });
    });
  } // a function which can be used to insert a message into the database
};
