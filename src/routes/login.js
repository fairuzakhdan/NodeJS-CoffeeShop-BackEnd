const express = require('express');

const router = express.Router();
const loginController = require('../controller/login');

router.post('/', loginController.authLogin);

module.exports = router;
