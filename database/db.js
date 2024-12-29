const mysql = require('mysql2');
const crypto = require('crypto');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bleulegs',
  password: 'bleulegs',
  database: 'bleulegs'
});

function createUser(name, email, password, callback) {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.execute(query, [name, email, password], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId);
  });
}

function deleteUser(userId, callback) {
  const query = 'DELETE FROM users WHERE id = ?';
  connection.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return callback(err);
    }

    if (results.affectedRows === 0) {
      console.log('No user found with that ID');
      callback(null, false);
    } else {
      console.log('User deleted successfully');
      callback(null, true);
    }
  });
}

function validateUser(email, password, callback) {
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.execute(query, [email], (err, results) => {
    if (err) {
      console.error('Error validating user:', err);
      return callback(err);
    }

    if (results.length === 0) {
      console.log('User not found');
      return callback(null, false);
    }

    const user = results[0];

    // Compare the provided password with the stored plain password
    if (user.password === password) {
      console.log('User validated');
      callback(null, user); // Return the user if validated
    } else {
      console.log('Invalid password');
      callback(null, false); // Invalid password
    }
  });
}

// Function to create a session token for a user
function createSessionToken(userId, callback) {
  const token = crypto.randomBytes(32).toString('hex'); // Generate a random session token
  
  const query = 'INSERT INTO sessions (user_id, session_id, expires_at) VALUES (?, ?, ?)';
  const expiresAt = new Date(Date.now() + 3600000); // Set expiry to 1 hour from now

  connection.execute(query, [userId, token, expiresAt], (err, results) => {
    if (err) {
      console.error('Error creating session token:', err);
      return callback(err);
    }

    console.log('Session token created for user ID:', userId);
    callback(null, token); // Return the session token
  });
}

// Function to validate a session token
function validateSessionToken(token, callback) {
  const query = 'SELECT * FROM sessions WHERE session_id = ? AND expires_at > NOW()';
  connection.execute(query, [token], (err, results) => {
    if (err) {
      console.error('Error validating session token:', err);
      return callback(err);
    }

    if (results.length === 0) {
      console.log('Invalid or expired session token');
      return callback(null, false); // Token is either invalid or expired
    }

    const session = results[0];

    // Fetch the user associated with the session token
    const userQuery = 'SELECT * FROM users WHERE id = ?';
    connection.execute(userQuery, [session.user_id], (err, userResults) => {
      if (err) {
        console.error('Error fetching user for session:', err);
        return callback(err);
      }

      if (userResults.length === 0) {
        console.log('User not found for session');
        return callback(null, false);
      }

      console.log('Session validated');
      callback(null, userResults[0]); // Return the user associated with the session
    });
  });
}

// Export the functions and the connection
module.exports = {
  connection,
  createUser,
  deleteUser,
  validateUser,
  createSessionToken,
  validateSessionToken
};
