const express = require('express');
const router = express.Router();
const { getGdpData } = require('../controllers/gdpController.js');

router.route('/').get(getGdpData);

module.exports = router;
