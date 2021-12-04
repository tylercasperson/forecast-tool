const timePeriodTypes = require('./timePeriodTypes');

module.exports = function (sequelize, DataTypes) {
  const timePeriods = sequelize.define('timePeriods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    groupName: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    timePeriodTypeID: {
      type: DataTypes.INTEGER,
    },
  });

  timePeriods.associate = (models) => {
    timePeriods.belongsTo(models.timePeriodTypes, {
      onDelete: 'cascade',
    }),
      timePeriods.hasMany(models.groupedData, {
        onDelete: 'cascade',
      });
  };

  return timePeriods;
};
