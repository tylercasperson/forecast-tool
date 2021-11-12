const express = require('express');
const router = express.Router();
const {
  getForecastData,
  getOneForecastData,
  updateForecastData,
  addForecastData,
  deleteForecastData,
} = require('../controllers/forecastDataController.js');

router.route('/').get(getForecastData).post(addForecastData);
router
  .route('/:id')
  .get(getOneForecastData)
  .put(updateForecastData)
  .delete(deleteForecastData);

module.exports = router;
