const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.findAll({});
  res.json({ groupedData });
});

const getOneGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ groupedData });
});

const updateGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ groupedData });
});

const addGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.create({});
  res.json({ groupedData });
});

const deleteGroupedData = asyncHandler(async (req, res) => {
  dataTypes = await db.groupedData.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ groupedData });
});

module.exports = {
  getGroupedData,
  getOneGroupedData,
  updateGroupedData,
  addGroupedData,
  deleteGroupedData,
};
