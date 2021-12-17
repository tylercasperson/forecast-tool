const express = require('express');
const router = express.Router();
const {
  getSalesData,
  getOneSalesData,
  getSalesDataRange,
  minMaxDates,
  updateSalesData,
  addSalesData,
  addAlotOfSalesData,
  deleteSalesData,
  deleteAllSalesData,
} = require('../controllers/salesDataController.js');

router.route('/').get(getSalesData).post(addSalesData);
router.route('/:id').get(getOneSalesData).put(updateSalesData).delete(deleteSalesData);
router.route('/dates/minMax').get(minMaxDates);
router.route('/date/range').get(getSalesDataRange);
router.route('/delete/all').delete(deleteAllSalesData);
router.route('/bulk/add').post(addAlotOfSalesData);

module.exports = router;
