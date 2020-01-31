const router = require('express').Router();
const Users = require('./auth-model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;


  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, token});
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
});

function generateToken(user){
  const payload = {
      subject: user.user_id,
      username: user.username
  };

  const secret = process.env.JWT_SECRET;

  const options = {
      expiresIn: '8h'
  }

  return jwt.sign(payload, secret, options)
};

module.exports = router;
