const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getForecastMethods = asyncHandler(async (req, res) => {
  const forecastMethods = await db.forecastMethods.findAll();
  res.json({ forecastMethods });
});

const getOneForecastMethod = asyncHandler(async (req, res) => {
  const forecastMethod = await db.forecastMethods.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastMethod });
});

const updateForecastMethod = asyncHandler(async (req, res) => {
  const forecastMethods = await db.forecastMethods.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastMethods });
});

const addForecastMethod = asyncHandler(async (req, res) => {
  const forecastMethods = await db.forecastMethods.create({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastMethods });
});

const deleteForecastMethod = asyncHandler(async (req, res) => {
  const forecastMethods = await db.forecastMethods.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastMethods });
});

module.exports = {
  getForecastMethods,
  getOneForecastMethod,
  updateForecastMethod,
  addForecastMethod,
  deleteForecastMethod,
};
