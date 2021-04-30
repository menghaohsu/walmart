const Controller = require('../../controllers/customer.controller.js');
const { Router } = require('express');

const router = Router();

router.post('/create', Controller.createCustomer);

router.put('/update', Controller.updateCustomer);

module.exports = exports = router;