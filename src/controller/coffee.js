const coffeeModels = require('../models/coffee');

const getAllCoffee = async (req, res) => {
  try {
    const [data] = await coffeeModels.getAllCoffee();
    res.status(200).json({
      status: 'success',
      message: 'GET Data',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
};

const createCoffee = async (req, res) => {
  try {
    const { body } = req;
    if (!body.namaCoffee || !body.priceCoffee) {
      return res.status(400).json({
        status: 'fail',
        message: 'Input data dengan benar',
      });
    }
    const coffee = await coffeeModels.createCoffee(body);
    console.log(coffee);
    res.status(201).json({
      status: 'success',
      message: 'Coffee berhasil ditambahkan',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
  return res;
};

const getCoffeeById = async (req, res) => {
  try {
    const { idCoffee } = req.params;
    const [data] = await coffeeModels.getCoffeeById(idCoffee);
    if (data.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'Data tidak ditemukan',
      });
      return res;
    }
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
  return res;
};

const updateCoffeeById = async (req, res) => {
  try {
    const { idCoffee } = req.params;
    const { namaCoffee, priceCoffee } = req.body;
    if (!namaCoffee || !priceCoffee) {
      return res.status(400).json({
        status: 'fail',
        message: 'Input data dengan benar',
      });
    }
    const [data] = await coffeeModels.getCoffeeById(idCoffee);
    if (data.length === 0) {
      res.status(404).json({
        status: 'Data tidak ditemukan',
      });
      return res;
    }
    await coffeeModels.updateCoffeeById(namaCoffee, priceCoffee, idCoffee);
    res.status(201).json({
      status: 'success',
      message: 'Coffee berhasil diUpdate',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
  return res;
};

const deleteCoffeById = async (req, res) => {
  const { idCoffee } = req.params;
  const [data] = await coffeeModels.getCoffeeById(idCoffee);
  if (data.length === 0) {
    res.status(404).json({
      status: 'Data tidak ditemukan',
    });
    return res;
  }
  try {
    await coffeeModels.deleteCoffeById(idCoffee);
    res.status(200).json({
      status: 'success',
      message: 'Coffee Berhasil Dihapus',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
  return res;
};
module.exports = {
  getAllCoffee,
  createCoffee,
  getCoffeeById,
  updateCoffeeById,
  deleteCoffeById,
};
