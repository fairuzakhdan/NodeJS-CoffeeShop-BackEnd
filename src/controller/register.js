const User = require('../models/users');

const register = async (req, res) => {
  const { body } = req;
  if (!body.username || !body.password || !body.email) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
    });
    return res;
  }
  const [isEmail] = await User.isEmailUsed(body);
  if (isEmail.length >= 1) {
    res.status(409).json({
      status: 'fail',
      message: 'Email sudah digunakan',
    });
    return res;
  }
  await User.register(body);
  res.status(201).json({
    status: 'success',
    message: 'Register Success',
  });
  return res;
};

module.exports = { register };
