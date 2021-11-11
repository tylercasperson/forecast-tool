const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.findAll({});
  res.json({ salesData });
});

const getOneSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ salesData });
});

const updateSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ salesData });
});

const addSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.create({});
  res.json({ salesData });
});

const deleteSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ salesData });
});

module.exports = {
  getSalesData,
  getOneSalesData,
  updateSalesData,
  addSalesData,
  deleteSalesData,
};
