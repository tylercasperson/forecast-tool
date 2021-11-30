const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getGroupedData = asyncHandler(async (req, res) => {
  const groupedData = await db.groupedData.findAll({
    include: [{ model: db.timePeriods }, { model: db.dataTypes }],
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
  const groupedData = await db.groupedData.create({});
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

module.exports = {
  getGroupedData,
  getOneGroupedData,
  updateGroupedData,
  addGroupedData,
  deleteGroupedData,
  deleteAllGroupedData,
};
