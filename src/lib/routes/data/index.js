const Controller = require('../../controllers/data.controller.js');
const { Router } = require('express');

const router = Router();

router.post('/initialize', Controller.initialize);

module.exports = exports = router;