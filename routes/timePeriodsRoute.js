const express = require('express');
const router = express.Router();
const {
  getTimePeriods,
  getOneTimePeriods,
  updateTimePeriods,
  addTimePeriods,
  deleteTimePeriods,
  deleteAllTimePeriods,
  addAlotOfTimePeriods,
  addOriginalTimePeriods,
} = require('../controllers/timePeriodsController.js');

router.route('/').get(getTimePeriods).post(addTimePeriods);
router.route('/:id').get(getOneTimePeriods).put(updateTimePeriods).delete(deleteTimePeriods);
router.route('/delete/all').delete(deleteAllTimePeriods);
router.route('/bulk/add').post(addAlotOfTimePeriods);
router.route('/reset/original').post(addOriginalTimePeriods);

module.exports = router;
