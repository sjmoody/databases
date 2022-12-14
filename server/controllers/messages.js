var models = require('../models');

module.exports = {
  get: function (req, res) {
    // models.messages.getAll will reference the get function in the model
    // function expects string - need to stringify after getAll returns

    // res.send('Hello World');

    models.messages.getAll((err, data) => {
      if (err) {
        throw new Error('Unable to get messages');
      } else {
        console.log(data);
        res.send(data);
      }
    });

    //res.send(JSON.stringify(models.messages.getAll));
    //console.log('request made to get messages');
  }, // a function which handles a get request for all messages
  // We already know this is for the messages endpoint

  post: function (req, res) {
    models.messages.create(req.body, (err, data)=>{
      if (err) {
        throw new Error ('unable to post message');
      } else {
        res.send(data);
      }
    });


  } // a function which handles posting a message to the database
};
