const Controller = require('../../controllers/recommendation.controller.js');
const { Router } = require('express');

const router = Router();

router.get('/top3Items', Controller.getTopThreeMostOrderItems);

module.exports = exports = router;