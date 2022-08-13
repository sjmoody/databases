var db = require('../db');

module.exports = {
  getAll: function () {
    db.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        throw err;
      }
      return results;
    });
  },
  create: function (obj) {
    db.query(`INSERT INTO Users VALUES (${obj.username})`, (err, results) => {
      if (err) {
        throw err;
      }
      return results;
    });
  }
};
