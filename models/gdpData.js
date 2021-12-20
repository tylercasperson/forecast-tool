module.exports = function (sequelize, DataTypes) {
  const gdpData = sequelize.define('gdpData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    value: {
      type: DataTypes.INTEGER,
    },
  });

  return gdpData;
};
