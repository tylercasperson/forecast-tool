const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');
const { originalGroupedData } = require('../scripts/originalData.js');

const getGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.findAll({
    include: [
      { model: db.timePeriods, include: [{ model: db.timePeriodTypes }] },
      { model: db.dataTypes },
    ],
    where: {
      [Op.and]: [
        {
          '$timePeriod.startDate$': {
            [Op.gte]: [req.query.startDate],
          },
        },
        { '$timePeriod.endDate$': { [Op.lte]: req.query.endDate } },
      ],
    },
    order: [['dataTypeId'], ['timePeriodId']],
  });
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
  const groupedData = await db.groupedData.update(
    { data: req.body.data },
    {
      where: {
        id: { [Op.eq]: req.params.id },
      },
    }
  );

  res.json({ groupedData });
});

const addGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.create({
    timePeriodId: req.body.timePeriodId,
    dataTypeId: req.body.dataTypeId,
    data: req.body.data,
  });
  res.json({ groupedData });
});

const addAlotOfGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.bulkCreate(
    req.body.map((i) => {
      return {
        timePeriodId: i.timePeriodId,
        dataTypeId: i.dataTypeId,
        data: i.data,
      };
    })
  );

  res.json({ groupedData });
});

const deleteGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ groupedData });
});

const deleteAllGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.destroy({
    where: {
      id: { [Op.gte]: 0 },
    },
  });
  res.json({ groupedData });
});

const addOriginalGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.bulkCreate(
    originalGroupedData.map((i) => {
      return {
        timePeriodId: i.timePeriodId,
        dataTypeId: i.dataTypeId,
        data: i.data,
      };
    })
  );

  res.json({ groupedData });
});

module.exports = {
  getGroupedData,
  getOneGroupedData,
  updateGroupedData,
  addGroupedData,
  addAlotOfGroupedData,
  deleteGroupedData,
  deleteAllGroupedData,
  addOriginalGroupedData,
};
