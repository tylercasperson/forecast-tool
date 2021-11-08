const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getDataTypes = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.findAll({});
  res.json({ dataTypes });
});

const getOneDataTypes = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

const updateDataTypes = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

const addDataTypes = asyncHandler(async (req, res) => {
  const dataTypes = await db.dataTypes.create({});
  res.json({ dataTypes });
});

const deleteDataTypes = asyncHandler(async (req, res) => {
  dataTypes = await db.dataTypes.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ dataTypes });
});

module.exports = {
  getDataTypes,
  getOneDataTypes,
  updateDataTypes,
  addDataTypes,
  deleteDataTypes,
};
