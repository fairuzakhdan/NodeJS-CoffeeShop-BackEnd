const jwt = require('jsonwebtoken');
const User = require('../models/users');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 'Fail',
      message: 'Incorrect Credential',
    });
  }
  try {
    // console.log(token);
    const jwtToken = token.split(' ').pop();
    const data = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const [user] = await User.findUser(data.data.id);
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User Not Found',
      });
      return res;
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'Fail',
      message: 'Incorrect Credential',
    });
  }
  return res;
};

module.exports = verifyToken;
