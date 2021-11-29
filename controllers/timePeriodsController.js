const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.findAll({});
  res.json({ timePeriods });
});

const getOneTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriods });
});

const updateTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriods });
});

const addTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.create({});
  res.json({ timePeriods });
});

const deleteTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ timePeriods });
});

const deleteAllTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.destroy({
    where: {
      id: { [Op.gte]: 0 },
    },
  });
  res.json({ timePeriods });
});

module.exports = {
  getTimePeriods,
  getOneTimePeriods,
  updateTimePeriods,
  addTimePeriods,
  deleteTimePeriods,
  deleteAllTimePeriods,
};
