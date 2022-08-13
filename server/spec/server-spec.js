/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();
    const tablename = 'Messages';
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercys name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.
        // 'INSERT INTO Users VALUES (Valjean)'
        // 'INSERT INTO Users VALUES (NULL, Valjean)'

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM Messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  // it should getAll users
  it('Should output all users from the DB', (done) => {
    const queryString = 'SELECT * FROM Users';
    const queryArgs = [];
    const username = 'Valjean';

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/users`)
        .then((response) => {
          const userLog = response.data;
          expect(userLog[0].Name).toEqual(username);
          done();
        })
        .catch((err) => {
          throw err;
        });

    });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const queryString = 'SELECT * FROM Messages';
    const queryArgs = [];
    const message = 'In mercys name, three days is all I need.';
    const roomname = 'Hello';
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].text).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  // it should have 1 message in table before we insert messages
  it('Should have 1 message in table after the test above', (done) => {
    dbConnection.query('Select * FROM Messages', (err, results) => {
      if (err) {
        throw err;
      }
      expect(results.length).toEqual(1);
      done();
    });
  });

  // it should have 1 user in table before we insert users
  it('Should have 1 user in table after the test above', (done) => {
    dbConnection.query('Select * FROM Users', (err, results) => {
      if (err) {
        throw err;
      }
      expect(results.length).toEqual(1);
      done();

    });
  });

  it('Should insert users with the same name', (done) => {
    const username = 'Valjean';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(()=>{
        dbConnection.query('Select * FROM Users', (err, results) => {
          if (err) {
            throw err;
          }
          expect(results.length).toEqual(2);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });
});
