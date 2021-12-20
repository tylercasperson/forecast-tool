const express = require('express');
const router = express.Router();
const { getGdpData, getStoredGdpData, addGdpData } = require('../controllers/gdpController.js');

router.route('/').get(getGdpData);
router.route('/stored').get(getStoredGdpData).post(addGdpData);

module.exports = router;
