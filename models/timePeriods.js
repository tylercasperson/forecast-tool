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
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
  });

  timePeriods.associate = (models) => {
    timePeriods.hasMany(models.forecastData, {
      onDelete: 'cascade',
    }),
      timePeriods.hasMany(models.timePeriodTypes, {
        onDelete: 'cascade',
      });
  };

  return timePeriods;
};
