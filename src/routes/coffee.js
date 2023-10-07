const express = require('express');

const router = express.Router();
const coffeeController = require('../controller/coffee');

router.get('/', coffeeController.getAllCoffee);
router.post('/', coffeeController.createCoffee);
router.get('/:idCoffee', coffeeController.getCoffeeById);
router.patch('/:idCoffee', coffeeController.updateCoffeeById);
router.delete('/:idCoffee', coffeeController.deleteCoffeById);

module.exports = router;
