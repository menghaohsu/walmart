const Controller = require('../../controllers/order.controller.js');
const { Router } = require('express');

const router = Router();

router.post('/create', Controller.createOrder);
router.delete('/delete', Controller.deleteOrder);
router.put('/update', Controller.updateOrder);

module.exports = exports = router;