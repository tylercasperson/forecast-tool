const express = require('express');
const router = express.Router();
const {
  getForecastData,
  getOneforecastData,
  updateForecastData,
  addForecastData,
  deleteForecastData,
} = require('../controllers/forecastDataController.js');

router.route('/').get(getForecastData).post(addForecastData);
router
  .route('/:id')
  .get(getOneforecastData)
  .put(updateForecastData)
  .delete(deleteForecastData);

module.exports = router;
