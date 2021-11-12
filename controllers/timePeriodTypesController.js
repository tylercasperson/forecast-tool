const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getTimePeriodTypes = asyncHandler(async (req, res) => {
  const timePeriodTypes = await db.timePeriodTypes.findAll({});
  res.json({ timePeriodTypes });
});

const getOneTimePeriodTypes = asyncHandler(async (req, res) => {
  const timePeriodTypes = await db.timePeriodTypes.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriodTypes });
});

const updateTimePeriodTypes = asyncHandler(async (req, res) => {
  const timePeriodTypes = await db.timePeriodTypes.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriodTypes });
});

const addTimePeriodTypes = asyncHandler(async (req, res) => {
  const timePeriodTypes = await db.timePeriodTypes.create({});
  res.json({ timePeriodTypes });
});

const deleteTimePeriodTypes = asyncHandler(async (req, res) => {
  const timePeriodTypes = await db.timePeriodTypes.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriodTypes });
});

module.exports = {
  getTimePeriodTypes,
  getOneTimePeriodTypes,
  updateTimePeriodTypes,
  addTimePeriodTypes,
  deleteTimePeriodTypes,
};
