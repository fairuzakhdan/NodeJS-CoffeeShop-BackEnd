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
    await coffeeModels.createCoffee(body);
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
};

const getCoffeeById = async (req, res) => {
  try {
    const { idCoffee } = req.params;
    const [data] = await coffeeModels.getCoffeeById(idCoffee);
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
};

const updateCoffeeById = async (req, res) => {
  const { idCoffee } = req.params;
  const { namaCoffee, priceCoffee } = req.body;
  try {
    await coffeeModels.updateCoffeeById(namaCoffee, priceCoffee, idCoffee);
    res.status(201).json({
      status: 'success',
      message: 'Coffee berhasil diUpdate',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      serverMessage: error,
    });
  }
};

const deleteCoffeById = async (req, res) => {
  const { idCoffee } = req.params;
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
};
module.exports = {
  getAllCoffee,
  createCoffee,
  getCoffeeById,
  updateCoffeeById,
  deleteCoffeById,
};
