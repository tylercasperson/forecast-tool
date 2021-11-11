module.exports = function (sequelize, DataTypes) {
  const forecastData = sequelize.define('forecastData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    m3ma: {
      type: DataTypes.INTEGER,
    },
    m3wa: {
      type: DataTypes.INTEGER,
    },
    linearRegression: {
      type: DataTypes.INTEGER,
    },
  });

  forecastData.associate = (models) => {
    forecastData.belongsTo(models.timePeriods, {
      onDelete: 'cascade',
    });
  };

  return forecastData;
};
