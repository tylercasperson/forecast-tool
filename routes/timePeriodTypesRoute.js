const express = require('express');
const router = express.Router();
const {
  getTimePeriodTypes,
  getOneTimePeriodTypes,
  updateTimePeriodTypes,
  addTimePeriodTypes,
  deleteTimePeriodTypes,
} = require('../controllers/timePeriodTypesController.js');

router.route('/').get(getTimePeriodTypes).post(addTimePeriodTypes);
router
  .route('/:id')
  .get(getOneTimePeriodTypes)
  .put(updateTimePeriodTypes)
  .delete(deleteTimePeriodTypes);

module.exports = router;
