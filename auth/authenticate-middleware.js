/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.auth
  const secret = process.env.JWT_SECRET;

  if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
          if(err) {
          res.status(401).json({ message: "Please provide correct credentials" });
          } else {
              next();
          }
      })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
