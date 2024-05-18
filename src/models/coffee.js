const dbPool = require('../config/database');

const getAllCoffee = () => {
  const sql = 'SELECT * FROM coffee';
  return dbPool.execute(sql);
};

const createCoffee = (body) => {
  const sql = `INSERT INTO coffee (namaCoffee,priceCoffee) VALUES ('${body.namaCoffee}',${body.priceCoffee})`;
  return dbPool.execute(sql);
};

const getCoffeeById = (idCoffee) => {
  const sql = `SELECT * FROM coffee WHERE idCoffee = '${idCoffee}'`;
  return dbPool.execute(sql);
};

const updateCoffeeById = (namaCoffee, priceCoffee, idCoffee) => {
  const sql = `UPDATE coffee SET namaCoffee = '${namaCoffee}', priceCoffee = ${priceCoffee} WHERE idCoffee = ${idCoffee}`;
  return dbPool.execute(sql);
};

const deleteCoffeById = (idCoffee) => {
  const sql = `DELETE FROM coffee WHERE idCoffee = ${idCoffee}`;
  return dbPool.execute(sql);
};

module.exports = {
  getAllCoffee,
  createCoffee,
  getCoffeeById,
  updateCoffeeById,
  deleteCoffeById,
};
