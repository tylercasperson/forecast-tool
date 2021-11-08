const express = require('express');
const router = express.Router();
const {
  getTimePeriods,
  getOneTimePeriods,
  updateTimePeriods,
  addTimePeriods,
  deleteTimePeriods,
} = require('../controllers/timePeriodsController.js');

router.route('/').get(getTimePeriods).post(addTimePeriods);
router
  .route('/:id')
  .get(getOneTimePeriods)
  .put(updateTimePeriods)
  .delete(deleteTimePeriods);

module.exports = router;
