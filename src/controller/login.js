/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const authLogin = async (req, res) => {
  const { body } = req;
  if (!body.email || !body.password) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
    });
    return res;
  }
  const [user] = await User.isEmailUsed(body);
  const userPassword = user.find((pw) => pw);
  if (user.length === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'Email tidak terdaftar',
    });
    return res;
  }
  const passwordIncorrect = bcrypt.compareSync(body.password, userPassword.password);
  if (!passwordIncorrect) {
    res.status(401).json({
      status: 'fail',
      message: 'Username dan password salah',
    });
    return res;
  }
  const data = {
    id: user[0].id,
    name: user[0].username,
    email: user[0].email,
    role: user[0].role,
  };
  console.log(data);
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  // console.log(req.user);
  res.status(200).json({
    status: 'success',
    message: 'Loggedin',
    token,
  });
  return res;
};

module.exports = { authLogin };
