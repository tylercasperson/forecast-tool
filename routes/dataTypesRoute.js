const express = require('express');
const router = express.Router();
const {
  getDataTypes,
  getOneDataTypes,
  updateDataTypes,
  addDataTypes,
  deleteDataTypes,
} = require('../controllers/dataTypesController.js');

router.route('/').get(getDataTypes).post(addDataTypes);
router
  .route('/:id')
  .get(getOneDataTypes)
  .put(updateDataTypes)
  .delete(deleteDataTypes);

module.exports = router;
