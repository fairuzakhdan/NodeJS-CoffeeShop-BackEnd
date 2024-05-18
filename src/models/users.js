// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const dbPool = require('../config/database');

const register = (body) => {
  const passwordHash = bcrypt.hashSync(body.password, 10);
  const sql = `INSERT INTO users (username,password,email) VALUES ('${body.username}','${passwordHash}','${body.email}')`;
  return dbPool.execute(sql);
};

const isEmailUsed = (body) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [body.email];
  return dbPool.execute(sql, values);
};

const findUser = (user) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const values = [user];
  return dbPool.execute(sql, values);
};

module.exports = { register, isEmailUsed, findUser };
