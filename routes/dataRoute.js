const express = require('express');
const router = express.Router();
const {
  getData,
  getOneData,
  updateData,
  addData,
  deleteData,
} = require('../controllers/dataController.js');

router.route('/').get(getData).post(addData);
router.route('/:id').get(getOneData).put(updateData).delete(deleteData);

module.exports = router;
