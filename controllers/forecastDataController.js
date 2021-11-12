const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getForecastData = asyncHandler(async (req, res) => {
  const forecastData = await db.forecastData.findAll({
    include: [{ model: db.timePeriods }],
  });
  res.json({ forecastData });
});

const getOneForecastData = asyncHandler(async (req, res) => {
  const forecastData = await db.forecastData.findAll({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastData });
});

const updateForecastData = asyncHandler(async (req, res) => {
  const forecastData = await db.forecastData.update(req.body, {
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastData });
});

const addForecastData = asyncHandler(async (req, res) => {
  const forecastData = await db.forecastData.create({});
  res.json({ forecastData });
});

const deleteForecastData = asyncHandler(async (req, res) => {
  dataTypes = await db.forecastData.destroy({
    where: {
      id: { [Op.eq]: req.params.id },
    },
  });
  res.json({ forecastData });
});

module.exports = {
  getForecastData,
  getOneForecastData,
  updateForecastData,
  addForecastData,
  deleteForecastData,
};
