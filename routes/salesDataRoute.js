const express = require('express');
const router = express.Router();
const {
  getSalesData,
  getOneSalesData,
  updateSalesData,
  addSalesData,
  deleteSalesData,
} = require('../controllers/salesDataController.js');

router.route('/').get(getSalesData).post(addSalesData);
router
  .route('/:id')
  .get(getOneSalesData)
  .put(updateSalesData)
  .delete(deleteSalesData);

module.exports = router;
