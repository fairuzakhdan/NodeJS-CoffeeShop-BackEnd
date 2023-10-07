const middlewareLogRequest = (req, res, next) => {
  console.log('Terjadi Request ke Path :', req.path);
  next();
};

module.exports = middlewareLogRequest;
