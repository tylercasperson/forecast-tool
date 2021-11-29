const express = require('express');
const router = express.Router();
const {
  getSalesData,
  getSalesDataRange,
  getOneSalesData,
  updateSalesData,
  addSalesData,
  deleteSalesData,
  minMaxDates,
} = require('../controllers/salesDataController.js');

router.route('/').get(getSalesData).post(addSalesData);
router.route('/:id').get(getOneSalesData).put(updateSalesData).delete(deleteSalesData);
router.route('/dates/minMax').get(minMaxDates);
router.route('/date/range').get(getSalesDataRange);

module.exports = router;
