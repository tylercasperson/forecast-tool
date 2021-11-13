const express = require('express');
const router = express.Router();
const {
  getDataTypes,
  getOneDataType,
  updateDataType,
  addDataType,
  deleteDataType,
} = require('../controllers/dataTypesController.js');

router.route('/').get(getDataTypes).post(addDataType);
router
  .route('/:id')
  .get(getOneDataType)
  .put(updateDataType)
  .delete(deleteDataType);

module.exports = router;
