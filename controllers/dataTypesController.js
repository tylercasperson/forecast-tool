const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getDataTypes = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.findAll();
  res.json({ dataTypes });
});

const getOneDataType = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

const updateDataType = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

const addDataType = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.create({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

const deleteDataType = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

module.exports = {
  getDataTypes,
  getOneDataType,
  updateDataType,
  addDataType,
  deleteDataType,
};
