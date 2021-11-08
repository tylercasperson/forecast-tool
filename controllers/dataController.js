const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getData = asyncHandler(async (req, res) => {
  const data = await db.data.findAll({
    include: [{ model: db.dataTypes }, { model: db.timePeriods }],
  });
  res.json({ data });
});

const getOneData = asyncHandler(async (req, res) => {
  const data = await db.data.findAll({
    include: [{ model: db.dataTypes }, { model: db.timePeriods }],
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ data });
});

const updateData = asyncHandler(async (req, res) => {
  const data = await db.data.update(req.body, {
    include: [{ model: db.dataTypes }, { model: db.timePeriods }],
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ data });
});

const addData = asyncHandler(async (req, res) => {
  const data = await db.data.create({});
  res.json({ data });
});

const deleteData = asyncHandler(async (req, res) => {
  const data = await db.data.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ data });
});

module.exports = {
  getData,
  getOneData,
  updateData,
  addData,
  deleteData,
};
