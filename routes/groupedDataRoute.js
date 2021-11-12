const express = require('express');
const router = express.Router();
const {
  getGroupedData,
  getOneGroupedData,
  updateGroupedData,
  addGroupedData,
  deleteGroupedData,
} = require('../controllers/groupedDataController.js');

router.route('/').get(getGroupedData).post(addGroupedData);
router
  .route('/:id')
  .get(getOneGroupedData)
  .put(updateGroupedData)
  .delete(deleteGroupedData);

module.exports = router;
