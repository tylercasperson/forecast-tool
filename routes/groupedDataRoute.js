const express = require('express');
const router = express.Router();
const {
  getGroupedData,
  getOneGroupedData,
  updateGroupedData,
  addGroupedData,
  addAlotOfGroupedData,
  deleteGroupedData,
  deleteAllGroupedData,
} = require('../controllers/groupedDataController.js');

router.route('/').get(getGroupedData).post(addGroupedData);
router.route('/:id').get(getOneGroupedData).put(updateGroupedData).delete(deleteGroupedData);
router.route('/delete/all').delete(deleteAllGroupedData);
router.route('/bulk/add').post(addAlotOfGroupedData);

module.exports = router;
