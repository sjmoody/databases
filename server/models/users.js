var db = require('../db');

module.exports = {
  getAll: function (cb) {
    db.db.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        throw err;
      } else {
        cb(null, results);
      }
    });
  },
  create: function (obj, cb) {
    db.db.query(`INSERT INTO Users VALUES (NULL, '${obj.username}')`, (err, results) => {
      if (err) {
        throw err;
      }
      cb(null, results);
    });
  }
};
