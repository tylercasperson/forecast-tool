const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

const getSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.findAll({
    where: {
      [Op.and]: [
        {
          date: {
            [Op.gte]: [req.query.startDate],
          },
        },
        { date: { [Op.lte]: req.query.endDate } },
      ],
    },
  });
  res.json({ salesData });
});

const minMaxDates = asyncHandler(async (req, res) => {
  const maxDate = await db.salesData.max('date');
  const minDate = await db.salesData.min('date');

  res.json({ minDate, maxDate });
});

const getSalesDataRange = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.findAll({
    where: {
      date: {
        [Op.and]: [
          {
            [Op.gte]: req.query.startDate,
            [Op.lte]: req.query.endDate,
          },
        ],
      },
    },
    order: [['date', 'ASC']],
  });

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
  const salesData = await db.salesData.update(
    { data: req.body.data },
    {
      where: {
        id: { [Op.eq]: req.params.id },
      },
    }
  );
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

const deleteAllSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.destroy({
    where: {
      id: { [Op.gte]: 0 },
    },
  });
  res.json({ salesData });
});

const addAlotOfSalesData = asyncHandler(async (req, res) => {
  const salesData = await db.salesData.bulkCreate(
    req.body.map((i) => {
      return {
        date: i.date,
        data: i.data,
      };
    })
  );

  res.json({ salesData });
});

module.exports = {
  getSalesData,
  getOneSalesData,
  getSalesDataRange,
  minMaxDates,
  updateSalesData,
  addSalesData,
  addAlotOfSalesData,
  deleteSalesData,
  deleteAllSalesData,
};
