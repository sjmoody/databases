var models = require('../models');

module.exports = {
  get: function (req, res) {
    // models.messages.getAll will reference the get function in the model
    res.send('You requested Messages');
    console.log('request made to get messages');
  }, // a function which handles a get request for all messages
  // We already know this is for the messages endpoint

  post: function (req, res) {
    res.send("You posted a message");
        // models.messages.create will create in the db

  } // a function which handles posting a message to the database
};
