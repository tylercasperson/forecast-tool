const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');
const { originalTimePeriods } = require('../scripts/originalData.js');

const getTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.findAll({});
  res.json({ timePeriods });
  console.log(timePeriods);
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
  const timePeriods = await db.timePeriods.create({
    timePeriodTypeID: req.body.timePeriodTypeID,
    groupName: req.body.groupName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  res.json({ timePeriods });
});

const addAlotOfTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.bulkCreate(
    req.body.map((i) => {
      return {
        groupName: i.groupName,
        startDate: i.startDate,
        endDate: i.endDate,
        timePeriodTypeID: i.timePeriodTypeID,
      };
    })
  );

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

const addOriginalTimePeriods = asyncHandler(async (req, res) => {
  const timePeriods = await db.timePeriods.bulkCreate(
    originalTimePeriods.map((i) => {
      return {
        groupName: i.groupName,
        startDate: i.startDate,
        endDate: i.endDate,
        timePeriodTypeID: i.timePeriodTypeID,
      };
    })
  );

  res.json({ timePeriods });
});

module.exports = {
  getTimePeriods,
  getOneTimePeriods,
  updateTimePeriods,
  addTimePeriods,
  deleteTimePeriods,
  deleteAllTimePeriods,
  addAlotOfTimePeriods,
  addOriginalTimePeriods,
};
