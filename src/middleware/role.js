const role = (req, res, next) => {
  if (req.user[0].admin !== 1) {
    return res.status(403).json({
      status: 'fail',
      message: 'Not Authorized',
    });
  }
  next();
  return res;
};
module.exports = role;
