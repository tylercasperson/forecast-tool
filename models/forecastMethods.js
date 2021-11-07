module.exports = function (sequelize, DataTypes) {
  const forecastedMethods = sequelize.define('forecastedMethods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    calculation: {
      type: DataTypes.INTEGER,
    },
    bestToUseWhen: {
      type: DataTypes.STRING,
    },
  });

  return forecastedMethods;
};
