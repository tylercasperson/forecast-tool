const express = require('express');
const router = express.Router();
const {
  getForecastMethods,
  getOneForecastMethod,
  updateForecastMethod,
  addForecastMethod,
  deleteForecastMethod,
} = require('../controllers/forecastMethodsController.js');

router.route('/').get(getForecastMethods);
router
  .route('/:id')
  .get(getOneForecastMethod)
  .put(updateForecastMethod)
  .post(addForecastMethod)
  .delete(deleteForecastMethod);

module.exports = router;
