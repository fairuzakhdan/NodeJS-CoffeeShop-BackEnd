const express = require('express');

const router = express();
const coffeeController = require('../controller/coffee');
const verifyToken = require('../middleware/verifyToken');
const role = require('../middleware/role');

router.get('/', verifyToken, coffeeController.getAllCoffee);
router.post('/', verifyToken, role, coffeeController.createCoffee);
router.get('/:idCoffee', verifyToken, coffeeController.getCoffeeById);
router.patch('/:idCoffee', verifyToken, role, coffeeController.updateCoffeeById);
router.delete('/:idCoffee', verifyToken, role, coffeeController.deleteCoffeById);

module.exports = router;
